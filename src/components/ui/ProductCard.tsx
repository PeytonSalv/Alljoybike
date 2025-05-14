'use client';

import { useState } from 'react';
import Image from 'next/image';
import ExtrasModal from './ExtrasModal'; // ✅ ensure this path is correct

type Props = {
  id: string;
  name: string;
  image: string;
  description?: string;
  price: string;
  quotedPrice?: string;
  type: 'product' | 'product_group' | 'bundle';
  bundleId?: string; // Only needed for bundle types
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
  const [showModal, setShowModal] = useState(false);
  const isDummy = image.includes('dummyimage.com');

  const handleClick = () => {
    console.log('[ProductCard Clicked]', { id, type, bundleId }); // ✅ Debug
    if (type === 'bundle' && bundleId) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="flex flex-col border border-gray-200 rounded-xl shadow-sm overflow-hidden transition hover:shadow-md bg-white cursor-pointer"
      >
        <div className="relative h-48 sm:h-56 w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw"
            className="object-cover"
            unoptimized={isDummy}
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          {description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
          )}

          <div className="mt-auto flex items-center justify-between">
            <span className="text-[#EA903C] font-bold">
              {quotedPrice ?? `From ${price}`}
            </span>
            {type === 'bundle' ? (
              <span className="text-sm text-[#29B0C2] underline hover:text-[#218b99]">
                View&nbsp;Options
              </span>
            ) : (
              <span className="text-sm text-gray-400">Standard</span>
            )}
          </div>
        </div>
      </div>

      {/* Modal logic */}
      {showModal && bundleId && (
        <ExtrasModal bundleId={bundleId} onClose={() => setShowModal(false)} />
      )}
    </>

  );
   
}
