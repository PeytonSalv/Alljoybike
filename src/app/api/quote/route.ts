import { NextRequest, NextResponse } from 'next/server';
import { booqable } from '@/lib/booqable'; // adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const { startAt, endAt, items } = await req.json();

    // ✅ log incoming values
    console.log('[QUOTE_PAYLOAD]', { startAt, endAt, items });

    const { data } = await booqable.post('/quote_requests', {
      data: {
        type: 'quote_requests',
        attributes: {
          start_at: startAt,
          end_at: endAt,
          line_items: items.map((i: any) => ({
            item_id: i.id,
            quantity: i.quantity,
          })),
        },
      },
    });

    return NextResponse.json(
      data.attributes.line_items.map((li: any) => ({
        id: li.item_id,
        price: li.price_formatted,
        cents: li.price_in_cents,
      }))
    );
  } catch (err: any) {
    console.error('[QUOTE_API_ERROR]', err?.response?.data || err.message || err);
    return NextResponse.json({ error: 'Quote failed' }, { status: 400 });
  }
}
