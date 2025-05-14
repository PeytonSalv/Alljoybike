// lib/getCalculatedPrice.ts
import { booqable } from './booqable';

export async function getCalculatedPrice(itemId: string, startsAt: string, endsAt: string): Promise<string> {
  const { data } = await booqable.post('/item_prices/calculate', {
    item_id: itemId,
    quantity: 1,
    starts_at: startsAt,
    ends_at: endsAt,
  });

  const price = data?.data?.attributes?.price_formatted ?? '$0.00';
  return price;
}
