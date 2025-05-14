'use client';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';

const locations = [
  {
    name: 'Hilton Head',
    description: 'Bike & beach gear rentals delivered across Hilton Head Island.',
    href: '/hilton-head',
    bgColor: '#EA903C',
  },
  {
    name: 'Bluffton',
    description: 'Reserve bikes for pick-up or local delivery in Bluffton.',
    href: '/bluffton',
    bgColor: '#29B0C2',
  },
  {
    name: 'Palmetto Bluff',
    description: 'Service tailored for Palmetto Bluff guests and residents.',
    href: '/palmetto-bluff',
    bgColor: '#EA903C',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Locations() {
  return (
    <section className="px-6 py-12 bg-white">
      <motion.h2 
        className="text-2xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Choose Your Location
      </motion.h2>

      <motion.div 
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {locations.map((loc) => (
          <motion.div 
            key={loc.name}
            variants={item}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="flex flex-col justify-between h-full border shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{loc.name}</h3>
                <p className="text-gray-600 mb-4 flex-1">{loc.description}</p>
                <Link
                  href={loc.href}
                  className="mt-auto inline-block px-4 py-2 text-white font-medium rounded-md transition-all duration-300 hover:brightness-110"
                  style={{
                    backgroundColor: loc.bgColor,
                  }}
                >
                  View Rentals
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
