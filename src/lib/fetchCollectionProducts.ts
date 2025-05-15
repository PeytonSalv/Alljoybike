// src/lib/fetchCollectionProducts.ts
import { booqable } from './booqable';

export type Product = {
  id: string;
  type: 'product' | 'product_group' | 'bundle';
  name: string;
  description: string;
  image: string;
  price: string;          // will be overwritten for bundles if dynamic price succeeds
  bundleId?: string;
};

// simple in-memory cache keyed by `${collectionId}-${start}-${end}`
const cache = new Map<string, Product[]>();

export function clearProductsCache() {
  cache.clear();
}

// Booqable wants dates like "YYYY-MM-DD HH:MM:SS UTC"
function formatDateForBooqable(iso: string): string {
  const d = new Date(iso);
  const Y = d.getUTCFullYear();
  const M = String(d.getUTCMonth() + 1).padStart(2, '0');
  const D = String(d.getUTCDate()).padStart(2, '0');
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  const s = String(d.getUTCSeconds()).padStart(2, '0');
  return `${Y}-${M}-${D} ${h}:${m}:${s} UTC`;
}

// If no dates provided, default to tomorrow → day after
function getDefaultRange() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  return {
    start: new Date(now + oneDay).toISOString(),
    end:   new Date(now + 2 * oneDay).toISOString(),
  };
}

export async function fetchCollectionProducts(
  collectionId: string,
  start?: string,
  end?: string
): Promise<Product[]> {
  if (!collectionId) return [];

  // 1) resolve or default dates
  const { start: ds, end: de } = getDefaultRange();
  const startIso = start ?? ds;
  const endIso   = end   ?? de;
  const key      = `${collectionId}-${startIso}-${endIso}`;
  if (cache.has(key)) return cache.get(key)!;

  // 2) paginate collection_items
  const out: Product[] = [];
  let page = 1;
  const pageSize = 100;
  while (true) {
    const resp = await booqable.get('/collection_items', {
      params: {
        'filter[collection_id]': collectionId,
        'page[size]': pageSize,
        'page[number]': page,
        include: 'item.photo',
      },
    });
    const items    = resp.data.data    || [];
    const included = resp.data.included || [];
    const byId     = Object.fromEntries(included.map((i: any) => [i.id, i]));

    const photoUrl = (rec: any) => {
      if (rec.attributes.photo_url) return rec.attributes.photo_url;
      const img = rec.attributes.images?.[0];
      if (img?.large_url || img?.original_url) return img.large_url ?? img.original_url;
      const rel = rec.relationships?.photo?.data;
      if (rel) {
        const p = byId[rel.id];
        return p?.attributes?.large_url ?? p?.attributes?.original_url ?? '';
      }
      return '';
    };

    for (const ci of items) {
      const { id, type } = ci.relationships.item.data;
      const rec = byId[id];
      if (!rec) continue;
      const attrs    = rec.attributes;
      const isBundle = attrs.product_type === 'bundle';

      out.push({
        id,
        type:        isBundle ? 'bundle' : type,
        name:        attrs.name,
        description: attrs.description,
        image:       photoUrl(rec),
        price:       attrs.price_formatted ?? '$0', // default
        bundleId:    isBundle ? id : undefined,
      });
    }

    if (items.length < pageSize) break;
    page++;
  }

  // 3) collect bundle IDs
  const bundleIds = out.filter((p) => p.type === 'bundle').map((b) => b.id);
  if (bundleIds.length > 0) {
    // map to hold any successful dynamic prices
    const priceMap: Record<string, string> = {};
    const chunkSize = 5;

    for (let i = 0; i < bundleIds.length; i += chunkSize) {
      const chunk = bundleIds.slice(i, i + chunkSize);
      const params = new URLSearchParams();
      params.append('filter[from]', formatDateForBooqable(startIso));
      params.append('filter[till]', formatDateForBooqable(endIso));
      chunk.forEach((id) => params.append('filter[item_id][]', id));
      params.append('include', 'item');

      try {
        const pr = await booqable.get(`/item_prices?${params.toString()}`);
        for (const ip of pr.data.data) {
          const id = ip.attributes.item_id;
          const c  = ip.attributes.price_each_in_cents;
          priceMap[id] = `$${(c / 100).toFixed(2)}`;
        }
      } catch (err: any) {
        console.error('[ITEM_PRICES_CHUNK_ERROR]', chunk, err.response?.data || err.message);
        // continue to next chunk, leave these bundles at default price
      }
    }

    // overwrite any that succeeded
    out.forEach((p) => {
      if (p.bundleId && priceMap[p.bundleId]) {
        p.price = priceMap[p.bundleId];
      }
    });
  }

  cache.set(key, out);
  return out;
}
