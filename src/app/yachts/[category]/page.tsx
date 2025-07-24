import { yachts } from '@/lib/data';
import type { Yacht } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Scaling, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BookingDialog } from '@/components/BookingDialog';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { category: string } }) {
  const categoryTitle = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `${categoryTitle} Yachts | Tourboats`,
    description: `Explore our collection of ${params.category} yachts available for charter in Dubai.`,
  };
}

export default function YachtCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  if (category !== 'private' && category !== 'sharing') {
    notFound();
  }

  const filteredYachts = yachts.filter((yacht) => yacht.category === category);
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl text-primary">{categoryTitle} Yachts</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Discover the perfect {category} vessel for your ultimate Dubai sea experience.
        </p>
      </div>
      
      {filteredYachts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredYachts.map((yacht: Yacht) => (
            <div key={yacht.id} className="group [perspective:1000px]">
              <Card className="flex flex-col overflow-hidden shadow-lg h-full transition-all duration-300 group-hover:shadow-xl group-hover:[transform:rotateY(5deg)]">
                <Link href={`/yachts/${category}/${yacht.id}`}>
                  <div className="relative h-56 w-full">
                    <Image
                      src={yacht.image}
                      alt={yacht.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={yacht.aiHint}
                    />
                  </div>
                </Link>
                <CardHeader>
                  <CardTitle className="font-headline">{yacht.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{yacht.description}</p>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Up to {yacht.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scaling className="h-4 w-4 text-primary" />
                      <span>{yacht.size} ft</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4 text-primary" />
                      <span>AED {yacht.pricePerHour.toLocaleString()}{category === 'private' ? ' / hour' : ' / person'}</span>
                  </div>
                </CardContent>
                <CardFooter>
                   <BookingDialog 
                      bookingType={yacht.category === 'private' ? 'Yacht' : 'Shared Yacht'}
                      itemName={yacht.name}
                      className="w-full"
                    />
                </CardFooter>
              </Card>
            </div>
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
  );
}
