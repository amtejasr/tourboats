
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sailboat,
  Waves,
  ChevronDown,
  Fish,
  Anchor,
  Sparkles,
  Wind,
  LifeBuoy,
  PersonStanding,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingDialog } from '@/components/BookingDialog';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu-custom';

const waterActivityItems = [
  { name: 'Jet Ski', id: 'jetski-thrills', icon: Waves },
  { name: 'Parasailing', id: 'parasailing-heights', icon: Wind },
  { name: 'Banana Ride', id: 'banana-boat-fun', icon: PersonStanding },
  { name: 'Flyboarding', id: 'flyboard-flight', icon: Sparkles },
  { name: 'Donut Ride', id: 'donut-ride-whirl', icon: LifeBuoy },
  { name: 'Fishing', id: 'fishing-trip-dubai', icon: Fish },
];

export default function Home() {
  const { waterActivities } = useData();

  return (
    <div className="flex flex-col">
      {/* New Hero Section */}
      <section className="relative w-full h-[80vh] bg-black">
         <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Luxury yacht on the waters of Dubai"
              fill
              className="object-cover brightness-50"
              data-ai-hint="luxury yacht sea"
            />
          </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white animate-fade-in-down">
            Explore Luxury on the Waters
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-white/90 animate-fade-in-down animation-delay-200">
            Choose your adventure: thrilling water activities or elegant yacht experiences.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            {/* Water Activities Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="shadow-lg">
                  <Waves className="mr-2 h-5 w-5" /> Explore Water Activities <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {waterActivityItems.map((item) => (
                    <DropdownMenuItem key={item.id} asChild>
                        <Link href={`/activities/${item.id}`}>
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.name}</span>
                        </Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Yachts Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" variant="outline" className="bg-white/20 border-white text-white backdrop-blur-sm shadow-lg hover:bg-white/30">
                  <Sailboat className="mr-2 h-5 w-5" /> Explore Yachts <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/yachts/private">
                    <Sailboat className="mr-2 h-4 w-4" />
                    <span>Private Yachts</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/yachts/sharing">
                    <Anchor className="mr-2 h-4 w-4" />
                    <span>Sharing Yachts</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
