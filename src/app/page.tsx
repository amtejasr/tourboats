

'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sailboat,
  Anchor,
  Waves,
  LifeBuoy,
  Wind,
  Fish,
  Bike,
  ShipWheel,
  Rocket,
  Group,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu-custom';


export default function Home() {
  const { waterActivities } = useData();

  const allActivities = [
    { name: 'Jetski', icon: <Waves className="h-5 w-5" /> },
    { name: 'Parasailing', icon: <Wind className="h-5 w-5" /> },
    { name: 'Banana Ride', icon: <LifeBuoy className="h-5 w-5" /> },
    { name: 'Flyboarding', icon: <Rocket className="h-5 w-5" /> },
    { name: 'Kayaking', icon: <Bike className="h-5 w-5" /> },
    { name: 'Donut Ride', icon: <ShipWheel className="h-5 w-5" /> },
    { name: 'Fishing', icon: <Fish className="h-5 w-5" /> },
    { name: 'Scuba Diving', icon: <Anchor className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col">
      {/* New Minimal Hero Section */}
       <section className="relative flex w-full flex-col items-center justify-center bg-background py-24 md:py-32 lg:py-40">
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl">
            Explore Luxury on the Waters
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-muted-foreground">
            Choose your adventure: thrilling water activities or elegant yacht experiences.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" variant="default" className="text-lg px-8 py-7">
                  Explore Water Activities <Waves className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Choose an Activity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allActivities.map(activity => (
                  <DropdownMenuItem key={activity.name}>
                    {activity.icon}
                    <span>{activity.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button size="lg" variant="outline" className="text-lg px-8 py-7">
                  Explore Yachts <Sailboat className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Choose a Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Sailboat className="h-5 w-5" />
                    <Link href="/yachts/private">Private Yachts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Group className="h-5 w-5" />
                    <Link href="/yachts/sharing">Sharing Yachts</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block h-[80px] w-full"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31.74,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-secondary"
            ></path>
          </svg>
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
