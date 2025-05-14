import { booqable } from './booqable';

export type Product = {
  id: string;
  type: 'product' | 'product_group' | 'bundle';
  name: string;
  description: string;
  image: string;
  price: string;
  bundleId?: string;
};

// A simple cache: key is `${collectionId}-${start}-${end}`
const productsCache = new Map<string, Product[]>();

/**
 * Clears the entire cache (or you could expose a function to clear just one key)
 */
export function clearProductsCache() {
  productsCache.clear();
}

/**
 * Fetches all pages of collection_items, with caching.
 * @param collectionId The Booqable collection to fetch
 * @param start ISO timestamp string of rental start
 * @param end   ISO timestamp string of rental end
 */
export async function fetchCollectionProducts(
  collectionId: string,
  start: string,
  end: string
): Promise<Product[]> {
  if (!collectionId) return [];

  // build our cache key
  const cacheKey = `${collectionId}-${start}-${end}`;

  // if we’ve already fetched, return cached and log
  if (productsCache.has(cacheKey)) {
    console.log(
      'okay I have fetched all the prices. no need to ask anymore'
    );
    return productsCache.get(cacheKey)!;
  }

  // else, do the real fetch
  const pageSize = 100;
  let page = 1;
  const out: Product[] = [];

  for (;;) {
    const { data } = await booqable.get('/collection_items', {
      params: {
        'filter[collection_id]': collectionId,
        'page[size]': pageSize,
        'page[number]': page,
        include: 'item.photo',
        // optionally pass your date params here if needed by your API,
        // e.g. start_date: start, end_date: end
      },
    });

    const items = data?.data ?? [];
    const included = data?.included ?? [];
    const byId: Record<string, any> = {};
    included.forEach((r: any) => (byId[r.id] = r));

    const photoUrl = (itemRec: any): string => {
      if (itemRec.attributes?.photo_url) return itemRec.attributes.photo_url;
      const img = itemRec.attributes?.images?.[0];
      if (img?.large_url || img?.original_url)
        return img.large_url ?? img.original_url;
      const rel = itemRec.relationships?.photo?.data;
      if (rel) {
        const photo = byId[rel.id];
        if (photo?.attributes?.large_url || photo?.attributes?.original_url)
          return photo.attributes.large_url ?? photo.attributes.original_url;
      }
      return 'https://dummyimage.com/600x400/cccccc/ffffff&text=No+Photo';
    };

    items.forEach((ci: any) => {
      const itemRef = ci.relationships.item.data;
      const itemRec = byId[itemRef.id];
      if (!itemRec) return;
      const attributes = itemRec.attributes;
      const isBundle = attributes?.product_type === 'bundle';

      out.push({
        id: itemRef.id,
        type: isBundle ? 'bundle' : itemRef.type,
        name: attributes.name,
        description: attributes.description,
        image: photoUrl(itemRec),
        price: attributes.price_formatted ?? '$0',
        bundleId: isBundle ? itemRef.id : undefined,
      });
    });

    if (items.length < pageSize) break;
    page += 1;
  }

  // cache it, and log success
  productsCache.set(cacheKey, out);
  console.log(
    'Fetched all prices for',
    cacheKey,
    '-- okay I have fetched all the prices. no need to ask anymore'
  );
  return out;
}
