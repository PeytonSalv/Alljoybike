'use client';

import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { name: 'Hilton Head', href: '/hilton-head' },
  { name: 'Bluffton', href: '/bluffton' },
  { name: 'Palmetto Bluff', href: '/palmetto-bluff' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Donuts', href: '/donuts' },
];

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center gap-8">
        {/* Logo + brand */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Alljoy Bike Logo" width={100} height={100} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#29B0C2] transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-100">
        &copy; {new Date().getFullYear()} Alljoy Bike & Beach Rentals. All rights reserved.
      </div>
    </footer>
  );
}
