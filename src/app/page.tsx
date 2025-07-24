import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sailboat,
  Anchor,
  Waves,
  LifeBuoy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { waterActivities } from '@/lib/data';
import { BookingDialog } from '@/components/BookingDialog';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-cover bg-center">
        <Image
          src="https://picsum.photos/seed/hero/1920/1080"
          alt="Luxury yacht on the waters of Dubai"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="yacht sea"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl">
            Tourboats
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Experience Unforgettable Luxury on the Waters of Dubai
          </p>
          <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            <Link href="#yachts">
              Explore Fleet <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Yacht Categories Section */}
      <section id="yachts" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold md:text-4xl text-primary">
              Our Exclusive Fleet
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated selection of private and shared yachts for the perfect sea adventure.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link href="/yachts/private">
              <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <Image
                  src="https://picsum.photos/seed/private/600/400"
                  alt="Private luxury yacht"
                  width={600}
                  height={400}
                  className="w-full object-cover transition-opacity group-hover:opacity-90"
                  data-ai-hint="private yacht"
                />
                <div className="absolute inset-0 bg-black/30" />
                <CardHeader className="absolute bottom-0 left-0 p-6 text-white">
                  <Sailboat className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle className="font-headline text-3xl font-bold">
                    Private Yachts
                  </CardTitle>
                  <p className="flex items-center">
                    Book Your Exclusive Charter{' '}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/yachts/sharing">
              <Card className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <Image
                  src="https://picsum.photos/seed/sharing/600/400"
                  alt="Sharing yacht experience"
                  width={600}
                  height={400}
                  className="w-full object-cover transition-opacity group-hover:opacity-90"
                  data-ai-hint="group yacht"
                />
                <div className="absolute inset-0 bg-black/30" />
                <CardHeader className="absolute bottom-0 left-0 p-6 text-white">
                  <Anchor className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle className="font-headline text-3xl font-bold">
                    Sharing Yachts
                  </CardTitle>
                  <p className="flex items-center">
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
      <section id="activities" className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold md:text-4xl text-primary">
              Thrilling Water Activities
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Dive into excitement with our wide range of water sports, perfect for adrenaline junkies and families alike.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {waterActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl flex flex-col">
                <Link href={`/activities/${activity.id}`}>
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    data-ai-hint={activity.aiHint}
                  />
                </Link>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="font-headline text-xl font-semibold mb-2">{activity.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{activity.shortDescription}</p>
                   <BookingDialog 
                    bookingType="activity"
                    itemName={activity.name}
                    className="w-full mt-auto"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
