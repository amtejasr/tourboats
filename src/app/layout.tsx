
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import Loading from './loading';
import { AuthProvider } from '@/context/AuthContext';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Since the layout is now a client component, we can't export metadata from it.
// We'll rely on the metadata from individual pages or a root metadata file if needed.
// export const metadata: Metadata = {
//   title: 'Tourboats | Luxury Yachts and Water Activities in Dubai',
//   description: 'Luxury Yachts and Water Activities in Dubai',
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide loader when navigation is complete
    if (isLoading) {
      setIsLoading(false);
    }
  }, [pathname, isLoading]);

  return (
    <html lang="en">
      <head>
        <title>Tourboats | Luxury Yachts and Water Activities in Dubai</title>
        <meta name="description" content="Luxury Yachts and Water Activities in Dubai" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', inter.variable)}>
        <AuthProvider>
          {isLoading && <Loading />}
          <div className="flex min-h-screen flex-col">
            <Header setIsLoading={setIsLoading} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
