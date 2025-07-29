
'use client';

import { yachts as staticYachts } from '@/lib/data';
import type { Yacht } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Scaling, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound, useParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useEffect, useState } from 'react';

export default function YachtCategoryPage() {
  const params = useParams();
  const { category } = params as { category: 'private' | 'sharing' };
  const { yachts } = useData();
  const [filteredYachts, setFilteredYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (category !== 'private' && category !== 'sharing') {
      notFound();
    }
    
    if (yachts.length > 0) {
      const filtered = yachts.filter((yacht) => yacht.category === category);
      setFilteredYachts(filtered);
      setLoading(false);
    }
    // Add a small delay to simulate loading, can be removed
    const timer = setTimeout(() => {
      if (yachts.length === 0) setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category, yachts]);


  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="bg-secondary">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold md:text-6xl text-primary">{categoryTitle} Yachts</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover the perfect {category} vessel for your ultimate Dubai sea experience. Unmatched luxury and service await.
        </p>
      </div>
      
      {loading ? (
        <p>Loading yachts...</p>
      ) : filteredYachts.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredYachts.map((yacht: Yacht) => (
             <Card key={yacht.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card group/card">
                <Link href={`/yachts/${category}/${yacht.id}`} className="block overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={yacht.image}
                      alt={yacht.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                      data-ai-hint={yacht.aiHint}
                    />
                  </div>
                </Link>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{yacht.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3 h-16">{yacht.description}</p>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Up to {yacht.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scaling className="h-4 w-4 text-primary" />
                      <span>{yacht.size} ft</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="font-bold text-xl">
                        AED {yacht.pricePerHour.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">{category === 'private' ? '/hr' : '/person'}</span>
                    </div>
                   <Button asChild>
                      <Link href={`/yachts/${category}/${yacht.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                   </Button>
                </CardFooter>
              </Card>
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Yachts Available</h2>
            <p className="mt-2 text-muted-foreground">There are currently no {category} yachts listed. Please check back later.</p>
            <Button asChild className="mt-6">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
      )}
    </div>
    </div>
  );
}
