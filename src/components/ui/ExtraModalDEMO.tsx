'use client';

import { useEffect, useState } from 'react';

type Extra = {
  id: string;
  name: string;
  type: 'product' | 'product_group';
  image?: string;
  price?: string;
};

type Props = {
  bundleId: string;
  onClose: () => void;
};

export default function ExtrasModal({ bundleId, onClose }: Props) {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const res = await fetch(`/api/extras?bundleId=${bundleId}`);
        const json = await res.json();

        const includedMap = new Map(
          (json.included || []).map((i: any) => [i.id, i])
        );

        const extrasParsed = (json.data.relationships?.bundle_items?.data || [])
          .map((rel: any) => includedMap.get(rel.id))
          .filter(Boolean)
          .map((item: any) => {
            const attr = item.attributes;
            const relProduct = item.relationships?.product?.data;
            const relGroup = item.relationships?.product_group?.data;

            const target = relProduct ?? relGroup;
            const entity = target ? includedMap.get(target.id) : null;

            return {
              id: target?.id ?? item.id,
              type: target?.type ?? 'unknown',
              name: (entity as any)?.attributes?.name ?? '(Unnamed)',
              price: (entity as any)?.attributes?.price_formatted ?? '',
              image: (entity as any)?.attributes?.photo_url ?? '',
            };
          });

        setExtras(extrasParsed);
      } catch (e) {
        console.error('Failed to fetch extras:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchExtras();
  }, [bundleId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Extras Included</h2>

        {loading ? (
          <p>Loading...</p>
        ) : extras.length === 0 ? (
          <p>No extras found for this bundle.</p>
        ) : (
          <ul className="space-y-3">
            {extras.map((extra) => (
              <li key={extra.id} className="flex items-center justify-between gap-4 border p-3 rounded-md">
                <span className="font-medium">{extra.name}</span>
                <span className="text-[#EA903C] font-semibold">{extra.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
