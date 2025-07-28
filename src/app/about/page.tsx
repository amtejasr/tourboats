
import Image from 'next/image';
import { Sailboat, Anchor, LifeBuoy } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <div className="relative h-80 w-full">
        <Image
          src="https://placehold.co/1920x320.png"
          alt="Dubai coastline with yachts"
          fill
          className="object-cover brightness-50"
          data-ai-hint="dubai coastline"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-5xl font-bold md:text-6xl">
            About Tourboats
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">Your Gateway to Unforgettable Marine Adventures</p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-4xl font-bold text-primary">
              Crafting Memories on the Water
            </h2>
            <p className="text-lg text-muted-foreground">
              Founded on a passion for the sea and a commitment to excellence, Tourboats offers an unparalleled gateway to the majestic waters of the Arabian Gulf. We believe that luxury is not just about opulence, but about creating unforgettable experiences.
            </p>
            <p className="text-muted-foreground">
              From our meticulously maintained fleet of private and sharing yachts to our thrilling selection of water sports, every aspect of our service is tailored to provide you with the ultimate Dubai adventure. Our professional crew and certified instructors are dedicated to ensuring your safety, comfort, and absolute enjoyment.
            </p>
            <p className="text-muted-foreground">
              We are more than just a charter company; we are curators of memories, architects of joy, and your trusted partner in exploring the beauty of Dubai from its most stunning vantage point.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl relative w-full h-[600px]">
            <Image
              src="https://placehold.co/500x600.png"
              alt="Yacht crew smiling"
              fill
              className="object-cover"
              data-ai-hint="yacht crew"
            />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="font-headline text-4xl font-bold">Our Core Values</h3>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide every voyage we undertake.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Sailboat className="h-10 w-10" />
              </div>
              <h4 className="font-headline text-2xl font-bold">Luxury & Comfort</h4>
              <p className="mt-3 text-muted-foreground">
                Providing the highest standards of quality and comfort in our fleet and services.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <LifeBuoy className="h-10 w-10" />
              </div>
              <h4 className="font-headline text-2xl font-bold">Safety First</h4>
              <p className="mt-3 text-muted-foreground">
                Upholding the strictest safety protocols to ensure a worry-free experience.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Anchor className="h-10 w-10" />
              </div>
              <h4 className="font-headline text-2xl font-bold">Unforgettable Experiences</h4>
              <p className="mt-3 text-muted-foreground">
                Crafting unique and memorable adventures tailored to our clients' desires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
