'use client';

import { useState } from 'react';
import { useQuote } from '@/hooks/useQuote';
import RentalDatePicker from '@/components/ui/RentalDatePicker';
import ProductCard from '@/components/ui/ProductCard';

type Product = {
  id: string;
  type: 'product' | 'product_group' | 'bundle';
  name: string;
  description: string;
  image: string;
  price: string;
  bundleId?: string;
};

export default function BikeRental({ products }: { products: Product[] }) {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const { prices, loading } = useQuote(
    range.start,
    range.end,
    products.map((p) => ({ id: p.id, quantity: 1 }))
  );

  return (
    <>
      <RentalDatePicker
        start={range.start}
        end={range.end}
        onChange={setRange}
      />

      {loading && (
        <p className="text-sm text-gray-500 mb-4 text-center">
          Updating prices…
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            description={p.description}
            price={prices[p.id] ?? p.price}
            quotedPrice={prices[p.id]}
            type={p.type}
            bundleId={p.bundleId} // <-- ✅ MUST be passed manually
          />
        ))}
      </div>
    </>
  );
}
