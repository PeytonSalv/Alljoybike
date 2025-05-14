'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  headline: string;
  subtext: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function LocationHero({ headline, subtext, image, buttonText, buttonLink }: Props) {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden" aria-label="Location Hero">
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={headline}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-3"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-lg max-w-xl mb-6"
        >
          {subtext}
        </motion.p>
        
        {buttonText && buttonLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <Link 
              href={buttonLink} 
              className="px-6 py-3 bg-[#EA903C] text-white font-medium rounded-md hover:bg-[#d8822d] transition-colors duration-300"
            >
              {buttonText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
