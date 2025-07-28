import { yachts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Users, Scaling, Tag, CheckCircle, Ship } from 'lucide-react';
import { BookingDialog } from '@/components/BookingDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const yacht = yachts.find((p) => p.id === params.id);
  if (!yacht) {
    return {
      title: 'Yacht Not Found',
    };
  }
  return {
    title: `${yacht.name} | Tourboats`,
    description: yacht.description.substring(0, 160),
  };
}

export default function YachtDetailPage({ params }: { params: { id: string, category: string } }) {
  const yacht = yachts.find((p) => p.id === params.id && p.category === params.category);

  if (!yacht) {
    notFound();
  }

  const categoryTitle = yacht.category.charAt(0).toUpperCase() + yacht.category.slice(1);

  return (
    <div className="bg-secondary">
    <div className="container mx-auto px-4 py-16 md:py-24">
       <div className="mb-8">
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">{yacht.name}</h1>
            <Badge variant="outline" className="mt-4 text-lg border-accent text-accent">{categoryTitle} Charter</Badge>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Carousel className="w-full rounded-xl overflow-hidden shadow-2xl">
            <CarouselContent>
              {yacht.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full">
                    <Image src={img} alt={`${yacht.name} view ${index + 1}`} fill className="object-cover" data-ai-hint={yacht.aiHint} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          <div className="mt-12">
             <h2 className="font-headline text-3xl font-bold mb-4">About this Yacht</h2>
            <p className="text-lg text-muted-foreground">{yacht.description}</p>
          </div>

          <Card className="mt-10 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-3xl">
                <Ship className="h-8 w-8 text-accent" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                {yacht.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Request Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Tag className="h-7 w-7 text-primary" />
                  <span className="font-medium text-lg">Price</span>
                </div>
                <span className="font-bold text-2xl">
                  AED {yacht.pricePerHour.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {yacht.category === 'private' ? '/hour' : '/person'}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Users className="h-7 w-7 text-primary" />
                  <span className="font-medium text-lg">Capacity</span>
                </div>
                <span className="font-bold text-2xl">Up to {yacht.capacity} guests</span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Scaling className="h-7 w-7 text-primary" />
                  <span className="font-medium text-lg">Size</span>
                </div>
                <span className="font-bold text-2xl">{yacht.size} feet</span>
              </div>
              
              <div className="pt-4">
                <BookingDialog 
                  bookingType={yacht.category === 'private' ? 'Yacht' : 'Shared Yacht'}
                  itemName={yacht.name}
                  className="w-full text-lg py-7"
                />
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Final price will be confirmed via WhatsApp.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}
