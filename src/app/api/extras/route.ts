import { NextRequest, NextResponse } from 'next/server';
import { booqable } from '@/lib/booqable';

export async function GET(req: NextRequest) {
  try {
    const bundleId = req.nextUrl.searchParams.get('bundleId');
    if (!bundleId) {
      return NextResponse.json({ error: 'Missing bundleId parameter' }, { status: 400 });
    }

    const { data } = await booqable.get(`/bundles/${bundleId}`, {
      params: {
        include: [
          'bundle_items',
          'bundle_items.product',
          'bundle_items.product_group',
          'bundle_items.product.variations',
        ].join(','),
      },
    });

    const included = data.included || [];
    const includedMap = new Map(included.map((i: any) => [i.id, i]));

    const extras = await Promise.all(
      (data.data.relationships?.bundle_items?.data || []).map(async (rel: any) => {
        const item = includedMap.get(rel.id);
        if (!item) return null;

        const productId = item.relationships?.product?.data?.id;
        const groupId = item.relationships?.product_group?.data?.id;

        const product = productId ? includedMap.get(productId) : null;
        const group = groupId ? includedMap.get(groupId) : null;

        const isSelectable = !product && !!group;

        let variationOptions: string[] = [];
        let variationPriceMap: Record<string, number> = {};
        let defaultVariationId = null;

        // Fetch options + price map if it's a group with variations
        if (isSelectable && group) {
          const groupRes = await booqable.get(`/product_groups/${group.id}`, {
            params: { include: 'products' },
          });

          const products = groupRes.data?.included?.filter((p: any) => p.type === 'products') || [];

          variationOptions = products.map((p: any) => {
            const label = Object.values(p.attributes?.variation_values || {}).join(' ').trim();
            const price = p.attributes?.base_price_in_cents ?? 0;

            variationPriceMap[label] = price;

            if (
              defaultVariationId === null &&
              label.toLowerCase().includes('no')
            ) {
              defaultVariationId = p.id;
            }

            return label;
          });

          if (!defaultVariationId && products[0]) {
            defaultVariationId = products[0].id;
          }
        }

        const base = product || group;
        const name = base?.attributes?.name || '(Unnamed)';
        const baseCents = base?.attributes?.base_price_in_cents || 0;
        const priceFormatted = `$${(baseCents / 100).toFixed(2)}`;

        return {
          id: item.id,
          name,
          price: priceFormatted,
          cents: baseCents,
          selectable: isSelectable,
          variationOptions,
          variationPriceMap,
          variationId: defaultVariationId,
        };
      })
    );

    return NextResponse.json(extras.filter(Boolean));
  } catch (err: any) {
    console.error('[EXTRAS_API_ERROR]', err?.response?.data || err.message || err);
    return NextResponse.json({ error: 'Failed to fetch extras' }, { status: 500 });
  }
}
