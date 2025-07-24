"use client";

import Link from 'next/link';
import { Menu, Sailboat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/yachts/private', label: 'Private Yachts' },
  { href: '/yachts/sharing', label: 'Sharing Yachts' },
  { href: '/#water-activities', label: 'Water Activities' }, // Example of an anchor link
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin Panel' },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Sailboat className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl">Azure Yachts Dubai</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                    <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setSheetOpen(false)}>
                        <Sailboat className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl">Azure Yachts</span>
                    </Link>
                    <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close navigation menu</span>
                        </Button>
                    </SheetClose>
                </div>
                <nav className="mt-6 flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-lg font-medium"
                      onClick={() => setSheetOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
