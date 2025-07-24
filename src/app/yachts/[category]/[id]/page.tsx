import { yachts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Users, Scaling, Tag, CheckCircle } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const yacht = yachts.find((p) => p.id === params.id);
  if (!yacht) {
    return {
      title: 'Yacht Not Found',
    };
  }
  return {
    title: `${yacht.name} | Azure Yachts Dubai`,
    description: yacht.description.substring(0, 160),
  };
}

export default function YachtDetailPage({ params }: { params: { id: string, category: string } }) {
  const yacht = yachts.find((p) => p.id === params.id && p.category === params.category);

  if (!yacht) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Carousel className="w-full rounded-lg overflow-hidden shadow-lg">
            <CarouselContent>
              {yacht.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full">
                    <Image src={img} alt={`${yacht.name} view ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint={yacht.aiHint} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          <div className="mt-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{yacht.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{yacht.description}</p>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {yacht.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24 shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="h-6 w-6 text-primary" />
                  <span className="font-medium">Price</span>
                </div>
                <span className="font-semibold text-lg">
                  AED {yacht.pricePerHour.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">
                    {yacht.category === 'private' ? '/hour' : '/person'}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="font-medium">Capacity</span>
                </div>
                <span className="font-semibold text-lg">Up to {yacht.capacity} guests</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Scaling className="h-6 w-6 text-primary" />
                  <span className="font-medium">Size</span>
                </div>
                <span className="font-semibold text-lg">{yacht.size} feet</span>
              </div>
              
              <div className="pt-4">
                <WhatsAppButton 
                    phoneNumber="+971501234567" 
                    message={`I would like to inquire about booking the ${yacht.name}.`} 
                    className="w-full text-lg py-6"
                />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Contact us on WhatsApp for instant booking & custom packages.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
