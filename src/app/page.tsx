

'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sailboat,
  Waves,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingDialog } from '@/components/BookingDialog';
import { useData } from '@/context/DataContext';
import Image from 'next/image';

export default function Home() {
  const { waterActivities, heroImages } = useData();

  if (!heroImages.length) {
    return null; // or a loading component
  }

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[80vh] bg-blue-50 overflow-hidden flex items-center justify-center">
        <div className="relative z-20 flex flex-col items-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-blue-900 animate-fade-in-down">
            Explore Luxury on the Waters
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-blue-800/80 animate-fade-in-down animation-delay-200">
            Choose your adventure: thrilling water activities or elegant yacht experiences.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <Button size="lg" asChild className="shadow-lg">
              <Link href="#activities">
                <Waves className="mr-2 h-5 w-5" /> Explore Water Activities
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/80 backdrop-blur-sm shadow-lg border-primary/50 hover:bg-white">
              <Link href="/yachts/private">
                <Sailboat className="mr-2 h-5 w-5" /> Explore Yachts
              </Link>
            </Button>
          </div>
        </div>
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </section>

      {/* Water Activities Section */}
      <section id="activities" className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
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
              <Card key={activity.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up bg-card" style={{ animationDelay: `${index * 150}ms` }}>
                <Link href={`/activities/${activity.id}`} className="block overflow-hidden relative group">
                   <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint={activity.aiHint}
                    />
                  </div>
                </Link>
                 <div className="flex flex-col flex-grow p-6">
                  <CardTitle className="font-headline text-2xl mb-2">{activity.name}</CardTitle>
                  <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">{activity.shortDescription}</p>
                  </CardContent>
                  <div className="pt-4">
                    <p className="text-xl font-bold text-primary">From AED {activity.price}</p>
                  </div>
                </div>
                <CardFooter>
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
