'use client';

import { motion } from 'framer-motion';
import {
  Bike,
  Package,
  MapPinned,
  Star,
} from 'lucide-react';

const features = [
  {
    title: 'Wide Selection of Bikes & Beach Gear',
    icon: <Bike className="h-8 w-8 text-[#EA903C]" />,
    description:
      'Explore Hilton Head and Palmetto Bluff on comfortable cruisers or alley-cats—plus all the gear you need for a perfect beach day.',
  },
  {
    title: 'Hassle-Free Delivery & Pickup',
    icon: <Package className="h-8 w-8 text-[#29B0C2]" />,
    description:
      'Rentals delivered right to your hotel or Airbnb—picked up with no fuss—so you can focus on enjoying the Lowcountry.',
  },
  {
    title: 'Local Knowledge & Scenic Routes',
    icon: <MapPinned className="h-8 w-8 text-[#EA903C]" />,
    description:
      'Must-see local spots, scenic trails, and pristine beaches—complete with insider tips and special routes.',
  },
  {
    title: 'Customer-Centric Service',
    icon: <Star className="h-8 w-8 text-[#29B0C2]" />,
    description:
      'Friendly staff, fast response times, and a smooth, memorable rental experience—earning trust with every ride.',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: 'easeOut',
    },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        WHY CHOOSE OUR BIKE & BEACH RENTALS?
      </motion.h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="text-center px-4 py-6 bg-white rounded-xl shadow hover:shadow-md transition hover:scale-[1.03] group"
            custom={index}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4 transition-transform group-hover:scale-110">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
