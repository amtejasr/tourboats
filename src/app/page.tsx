
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sailboat,
  Waves,
  Fish,
  Anchor,
  Sparkles,
  Wind,
  LifeBuoy,
  PersonStanding,
  ChevronDown,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu-custom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import { BookingDialog } from '@/components/BookingDialog';

const YachtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />
    <path d="M4 18l-1 -5h18l-1 5" />
    <path d="M5 13v-6h8l4 6" />
    <path d="M7 7v-4h-1" />
  </svg>
);

const SeagullIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 13c.423 1.29 1.623 2.532 3.123 3.111c1.5 .579 3.235 .579 4.877 0c1.642 -.578 2.863 -1.82 3.28 -3.11" />
        <path d="M14.505 13.003c.51 .822 1.53 1.583 2.564 1.93c1.034 .347 2.266 .274 3.431 -.223" />
        <path d="M8.5 13c.423 1.29 1.623 2.532 3.123 3.111c1.5 .579 3.235 .579 4.877 0c1.642 -.578 2.863 -1.82 3.28 -3.11" />
    </svg>
);


export default function Home() {
  const { waterActivities, yachts, loading, heroImages } = useData();
  const privateYachts = yachts.filter(y => y.category === 'private');
  const sharingYachts = yachts.filter(y => y.category === 'sharing');


  return (
    <div className="flex flex-col">
      {/* New Animated Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] max-h-[1080px] overflow-hidden bg-primary">
        {/* Animated Scene Elements */}
        <div className="absolute inset-0 z-10 opacity-70">
            {/* Shimmering Sun */}
            <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-yellow-200/50 animate-shimmer blur-2xl"></div>

            {/* Floating Yacht */}
            <div className="absolute bottom-1/4 left-0 animate-float">
                <YachtIcon />
            </div>

             {/* Flying Seagulls */}
            <div className="absolute top-[15%] right-0 animate-fly animation-delay-200">
                <SeagullIcon className="w-16 h-16 text-white/80" />
            </div>
             <div className="absolute top-[20%] right-[10%] animate-fly animation-delay-400">
                <SeagullIcon className="w-12 h-12 text-white/70" />
            </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 flex h-[calc(90vh-15vh)] flex-col items-center justify-center p-4 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl drop-shadow-lg animate-fade-in-down">
            Explore Luxury on the Waters
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-white/90 md:text-xl drop-shadow-md animate-fade-in-down animation-delay-200">
            Choose your adventure: thrilling water activities or elegant yacht experiences.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up animation-delay-400">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1">
                <Link href="/#activities">
                  <Waves className="mr-2 h-5 w-5" />
                  Explore Water Activities
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 group">
                    <Sailboat className="mr-2 h-5 w-5" />
                    Explore Yachts
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-white/90 backdrop-blur-md border-white/20 text-primary">
                  <DropdownMenuItem asChild>
                    <Link href="/yachts/private">
                      <Sailboat className="mr-2 h-4 w-4" />
                      <span>Private Yachts</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/yachts/sharing">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Sharing Yachts</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>

        {/* Animated SVG Waves */}
        <div className="absolute bottom-0 left-0 w-full">
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div>
      </section>

      {/* Water Activities Section */}
      <section id="activities" className="bg-background py-20 md:py-28">
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

       {/* Yachts Section */}
      <section id="yachts" className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="font-headline text-4xl font-bold md:text-5xl text-primary">
                Our Luxury Fleet
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose between our exclusive private charters or sociable sharing tours.
                </p>
            </div>

            {/* Private Yachts */}
            <div className="mb-20">
                <div className="flex justify-between items-end mb-8">
                    <h3 className="font-headline text-3xl font-bold text-gray-800">Private Yachts</h3>
                    <Button variant="outline" asChild>
                        <Link href="/yachts/private">View All Private <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {privateYachts.slice(0,3).map((yacht) => (
                        <Card key={yacht.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card group">
                             <Link href={`/yachts/private/${yacht.id}`} className="block overflow-hidden relative">
                                <div className="relative aspect-[4/3] w-full">
                                    <Image
                                    src={yacht.image}
                                    alt={yacht.name}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    data-ai-hint={yacht.aiHint}
                                    />
                                </div>
                            </Link>
                            <div className="flex flex-col flex-grow p-6">
                                <CardTitle className="font-headline text-2xl mb-2">{yacht.name}</CardTitle>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-2">{yacht.description}</p>
                                </CardContent>
                            </div>
                             <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/yachts/private/${yacht.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                 </div>
            </div>
            
            {/* Sharing Yachts */}
            <div>
                 <div className="flex justify-between items-end mb-8">
                    <h3 className="font-headline text-3xl font-bold text-gray-800">Sharing Yachts</h3>
                    <Button variant="outline" asChild>
                        <Link href="/yachts/sharing">View All Sharing <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
                 <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {sharingYachts.slice(0,3).map((yacht) => (
                         <Card key={yacht.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card group">
                             <Link href={`/yachts/sharing/${yacht.id}`} className="block overflow-hidden relative">
                                <div className="relative aspect-[4/3] w-full">
                                    <Image
                                    src={yacht.image}
                                    alt={yacht.name}
                                    fill
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    data-ai-hint={yacht.aiHint}
                                    />
                                </div>
                            </Link>
                            <div className="flex flex-col flex-grow p-6">
                                <CardTitle className="font-headline text-2xl mb-2">{yacht.name}</CardTitle>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-2">{yacht.description}</p>
                                </CardContent>
                            </div>
                             <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/yachts/sharing/${yacht.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                 </div>
            </div>
        </div>
      </section>
    </div>
  );
}

    

    