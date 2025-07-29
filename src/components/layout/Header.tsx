
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';

const navLinks = [
  { href: '/#activities', label: 'Water Activities' },
  { href: '/yachts/private', label: 'Private Yachts' },
  { href: '/yachts/sharing', label: 'Sharing Yachts' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const TextLogo = () => (
    <svg height="40" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="30" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="hsl(var(--primary))">
            Tourboats
        </text>
    </svg>
);

export function Header({ setIsLoading }: { setIsLoading: (isLoading: boolean) => void }) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { logo } = useData();

  const handleLinkClick = (href: string) => {
    // Only show loader for different pages
    if (href !== pathname) {
        setIsLoading(true);
    }
    setSheetOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  }
  
  const dashboardLink = user?.role === 'admin' ? '/admin' : '/dashboard';

  if (loading) return null; // Or a loading skeleton for header

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" onClick={() => handleLinkClick('/')} className="flex items-center gap-2 font-bold">
          {logo ? (
            <Image src={logo} alt="Tourboats Logo" width={150} height={40} className="object-contain" />
          ) : (
            <TextLogo />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map(({ href, label }) => (
             <Link
              key={href}
              href={href}
              onClick={() => handleLinkClick(href)}
              className={cn(
                "text-base font-medium text-muted-foreground transition-colors hover:text-primary",
                (pathname === href || (href.includes('#') && pathname === '/')) && "text-primary font-semibold"
              )}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                 <Button variant="ghost" asChild>
                    <Link href={dashboardLink} onClick={() => handleLinkClick(dashboardLink)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/login" onClick={() => handleLinkClick('/login')}>
                  Login
                </Link>
              </Button>
            )}
          </div>
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
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                    <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => handleLinkClick('/')}>
                        {logo ? (
                          <Image src={logo} alt="Tourboats Logo" width={150} height={40} className="object-contain" />
                        ) : (
                          <TextLogo />
                        )}
                    </Link>
                    <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close navigation menu</span>
                        </Button>
                    </SheetClose>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-xl font-semibold"
                      onClick={() => handleLinkClick(href)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                 <div className="mt-auto flex flex-col gap-4 pt-6 border-t">
                    {user ? (
                        <>
                            <Link href={dashboardLink} onClick={() => handleLinkClick(dashboardLink)} className='text-xl font-semibold flex items-center'>
                               <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                            </Link>
                            <Button variant="outline" onClick={handleLogout} className="text-xl h-12">
                                <LogOut className="mr-2 h-5 w-5" /> Logout
                            </Button>
                        </>
                    ) : (
                        <Button asChild className="text-xl h-12">
                            <Link href="/login" onClick={() => handleLinkClick('/login')}>Login</Link>
                        </Button>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
