// app/api/bike-price/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BOOQABLE_API_URL = 'https://alljoy-bike-and-beach-rental.booqable.com/api/4';
const BOOQABLE_API_KEY = process.env.BOOQABLE_API_KEY as string;

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get('from');
  const till = req.nextUrl.searchParams.get('till');
  const itemIds = req.nextUrl.searchParams.getAll('item_id[]');

  if (!from || !till || itemIds.length === 0) {
    console.error('[BAD_REQUEST]', { from, till, itemIds });
    return NextResponse.json({ error: 'Missing from, till, or item_id[]' }, { status: 400 });
  }

  const searchParams = new URLSearchParams();
  searchParams.append('filter[from]', from);
  searchParams.append('filter[till]', till);
  itemIds.forEach(id => searchParams.append('filter[item_id][]', id));
  searchParams.append('include', 'item');

  try {
    const response = await axios.get(`${BOOQABLE_API_URL}/item_prices?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${BOOQABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (err: any) {
    console.error('[BIKE_PRICE_ERROR]', err?.response?.data || err.message);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}
