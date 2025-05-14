'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetTitle,
  SheetDescription 
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: 'Hilton Head', href: '/locations/hilton-head' },
  { name: 'Bluffton', href: '/locations/bluffton' },
  { name: 'Palmetto Bluff', href: '/locations/palmetto-bluff' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Donuts', href: '/donuts' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm md:px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Alljoy Bike Logo" width={100} height={100} priority />
      </Link>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="w-6 h-6" style={{ color: '#EA903C' }} />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Browse our locations and services</SheetDescription>
          <nav className="flex flex-col space-y-6 mt-10 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl font-semibold text-gray-800 hover:text-[#EA903C] transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
