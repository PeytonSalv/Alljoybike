// lib/fetchPriceTiles.ts
import { booqable } from './booqable';

export async function fetchPriceTiles(priceStructureId: string) {
  const { data } = await booqable.get('/price_tiles', {
    params: {
      'filter[price_structure_id]': priceStructureId,
      'sort': 'length', // optional: shortest to longest
    },
  });

  return (data?.data ?? []).map((tile: any) => ({
    id: tile.id,
    quantity: tile.attributes.quantity,
    period: tile.attributes.period,
    multiplier: tile.attributes.multiplier,
    name: tile.attributes.name,
    length: tile.attributes.length,
  }));
}
