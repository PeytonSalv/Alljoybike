'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ExtrasModal from './ExtrasModal';

type Props = {
  id: string;
  name: string;
  image: string;
  description?: string;
  price: string;           // e.g. "$123.45"
  quotedPrice?: string;    // optional override
  type: 'product' | 'product_group' | 'bundle';
  bundleId?: string;       // only for bundles
};

export default function ProductCard({
  id,
  name,
  image,
  description,
  price,
  quotedPrice,
  type,
  bundleId,
}: Props) {
  const [showModal, setShowModal]   = useState(false);
  const [extrasCost, setExtrasCost] = useState(0);  // in cents

  // parse the base price (either quotedPrice or price) into cents
  const baseCents = Math.round(
    parseFloat((quotedPrice ?? price).replace(/[^0-9.]/g, '')) * 100
  );

  // display total = base + extras
  const displayPrice = `$${((baseCents + extrasCost) / 100).toFixed(2)}`;

  const handleClick = () => {
    if (type === 'bundle' && bundleId) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex flex-col border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md cursor-pointer bg-white"
      >
        <div className="relative h-48 sm:h-56 w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw"
            className="object-cover"
            unoptimized={image.includes('dummyimage.com')}
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-1 text-gray-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <span className="text-[#EA903C] font-bold">{displayPrice}</span>
            {type === 'bundle' ? (
              <span className="text-sm text-[#29B0C2] underline hover:text-[#218B99]">
                View&nbsp;Options
              </span>
            ) : (
              <span className="text-sm text-gray-400">Standard</span>
            )}
          </div>
        </div>
      </div>

      {showModal && bundleId && (
        <ExtrasModal
          bundleId={bundleId}
          onClose={() => setShowModal(false)}
          onConfirm={(extrasCents: number) => {
            setExtrasCost(extrasCents);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
