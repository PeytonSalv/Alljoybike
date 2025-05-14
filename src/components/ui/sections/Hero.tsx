'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] md:h-[90vh] overflow-hidden" aria-label="Alljoy Bike & Beach Rentals Hero">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-bike-beach.png"
          alt="Beach cruiser bikes for rent on Hilton Head beach"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
        >
          Beach Bike Rentals in Hilton Head & Bluffton
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="text-lg sm:text-xl max-w-md text-white/90"
        >
          Rent premium beach cruisers and gear with hassle-free delivery to Hilton Head, Bluffton, and Palmetto Bluff.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-6"
        >
          <Link
            href="/rentals"
            className="inline-block font-semibold px-6 py-3 rounded-xl shadow-lg transition hover:shadow-xl"
            style={{
              backgroundColor: '#EA903C',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(234, 144, 60, 0.4)',
            }}
          >
            View Rentals
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
