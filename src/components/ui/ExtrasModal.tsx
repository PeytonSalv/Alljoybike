'use client';

import { useEffect, useState } from 'react';
import { FiBox, FiCheckCircle } from 'react-icons/fi';

type Extra = {
  id: string;
  name: string;
  price: string;
  cents: number;
  variationOptions?: string[];
  variationPriceMap?: Record<string, number>;
  selectedOption?: string;
  selected?: boolean;
  selectable?: boolean;
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
        if (!res.ok) throw new Error(json.error || 'Unknown error');

        const initialized = json.map((e: Extra) => {
          let selectedOption = e.variationOptions?.[0] ?? '';

          if (e.name.toLowerCase().includes('helmet')) {
            selectedOption = e.variationOptions?.find((v) => v.toLowerCase().includes('no')) ?? selectedOption;
          }

          if (e.name.toLowerCase().includes('sea pines')) {
            selectedOption = e.variationOptions?.find((v) => v.toLowerCase().includes('no')) ?? selectedOption;
          }

          return {
            ...e,
            selected: true,
            selectedOption,
          };
        });

        setExtras(initialized);
      } catch (e) {
        console.error('Failed to fetch extras:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchExtras();
  }, [bundleId]);

  const handleOptionChange = (id: string, option: string) => {
    setExtras((prev) =>
      prev.map((e) => (e.id === id ? { ...e, selectedOption: option } : e))
    );
  };

  const getDynamicPrice = (e: Extra): string => {
    if (e.variationPriceMap && e.selectedOption && e.variationPriceMap[e.selectedOption] !== undefined) {
      return `$${(e.variationPriceMap[e.selectedOption] / 100).toFixed(2)}`;
    }
    return e.price || `$${(e.cents / 100).toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FiBox className="text-[#EA903C]" /> Package Details
        </h2>

        {loading ? (
          <p>Loading package details...</p>
        ) : extras.length === 0 ? (
          <p>No details available for this package.</p>
        ) : (
          <ul className="space-y-4">
            {extras.map((extra) => (
              <li
                key={extra.id}
                className="border border-[#EA903C] bg-orange-50 p-4 rounded-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    {extra.name} <FiCheckCircle className="text-green-500" />
                  </span>
                  <span className="font-semibold text-[#EA903C]">
                    {getDynamicPrice(extra)}
                  </span>
                </div>

                {extra.variationOptions?.length > 0 && (
                  <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1">Choose an option:</label>
                    <select
                      value={extra.selectedOption}
                      onChange={(e) => handleOptionChange(extra.id, e.target.value)}
                      className="w-full border rounded-md px-3 py-2"
                    >
                      {extra.variationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
