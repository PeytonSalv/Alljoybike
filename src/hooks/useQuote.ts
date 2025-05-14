import { useEffect, useState } from 'react';

type UseQuoteResult = {
  prices: Record<string, number>;
  total: number;
  loading: boolean;
};

export function useQuote(start: Date | null, end: Date | null, productIds: string[]): UseQuoteResult {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!start || !end || productIds.length === 0) return;

    const fetchPrices = async () => {
      setLoading(true);

      const from = encodeURIComponent(start.toISOString());
      const till = encodeURIComponent(end.toISOString());
      const itemParams = productIds.map(id => `item_id[]=${id}`).join('&');
      const url = `/api/bike-price?from=${from}&till=${till}&${itemParams}`;

      console.log('Fetching prices from:', url);

      try {
        const res = await fetch(url);
        const json = await res.json();

        if (!json?.data || !Array.isArray(json.data)) {
          console.error('useQuote error: Invalid API response', json);
          return;
        }

        const priceMap: Record<string, number> = {};
        let sum = 0;

        for (const item of json.data) {
          const id = item.attributes.item_id;
          const priceCents = item.attributes.price_each_in_cents;
          priceMap[id] = priceCents / 100;
          sum += priceCents / 100;
        }

        setPrices(priceMap);
        setTotal(sum);
      } catch (err) {
        console.error('useQuote error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [start, end, productIds]);

  return { prices, total, loading };
}
