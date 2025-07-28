
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sailboat,
  Anchor,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingDialog } from '@/components/BookingDialog';
import { useData } from '@/context/DataContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
  const { waterActivities, heroImages } = useData();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full">
         <Carousel className="w-full h-full" opts={{ loop: true }}>
            <CarouselContent>
              {heroImages.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[85vh] min-h-[600px]">
                    <Image
                      src={src}
                      alt="Luxury yacht on the waters of Dubai"
                      fill
                      className="z-0 object-cover brightness-50"
                      priority={index === 0}
                      data-ai-hint="yacht sea"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-8" />
            <CarouselNext className="absolute right-8" />
          </Carousel>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl animate-fade-in-down">
            Experience Dubai's Majesty
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-white/90 animate-fade-in-up animation-delay-200">
            Discover unparalleled luxury and thrilling adventures on the pristine waters of the Arabian Gulf. Your unforgettable journey begins here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/yachts/private">
                Explore The Fleet <Sailboat className="ml-2" />
              </Link>
            </Button>
             <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/#activities">
                View Activities <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Yacht Categories Section */}
      <section id="yachts" className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold md:text-5xl text-primary">
              Our Exclusive Fleet
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from our curated selection of private and shared yachts for the perfect sea adventure, each offering a unique taste of luxury.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <Link href="/yachts/private">
              <Card className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative w-full h-[400px]">
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Private luxury yacht"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="private yacht"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <CardHeader className="absolute bottom-0 left-0 p-8 text-white">
                   <div className="bg-accent p-3 rounded-full w-fit mb-4">
                    <Sailboat className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="font-headline text-4xl font-bold">
                    Private Yachts
                  </CardTitle>
                  <p className="flex items-center text-lg mt-2">
                    Book Your Exclusive Charter{' '}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/yachts/sharing">
              <Card className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                 <div className="relative w-full h-[400px]">
                    <Image
                      src="https://placehold.co/600x400.png"
                      alt="Sharing yacht experience"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint="group yacht"
                    />
                 </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <CardHeader className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="bg-accent p-3 rounded-full w-fit mb-4">
                    <Anchor className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="font-headline text-4xl font-bold">
                    Sharing Yachts
                  </CardTitle>
                  <p className="flex items-center text-lg mt-2">
                    Join a Shared Luxury Experience{' '}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Water Activities Section */}
      <section id="activities" className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold md:text-5xl text-primary">
              Thrilling Water Activities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Dive into excitement with our wide range of water sports, perfect for adrenaline junkies and families alike.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {waterActivities.map((activity, index) => (
              <Card key={activity.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                 <Link href={`/activities/${activity.id}`} className="block overflow-hidden relative h-56 w-full group">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={activity.aiHint}
                  />
                </Link>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <CardTitle className="font-headline text-2xl mb-2">{activity.name}</CardTitle>
                  <p className="text-muted-foreground text-sm flex-grow h-12">{activity.shortDescription}</p>
                   <p className="text-xl font-bold text-primary mt-4">From AED {activity.price}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <BookingDialog 
                    bookingType="activity"
                    itemName={activity.name}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
