import Image from 'next/image';
import { Sailboat, Anchor, LifeBuoy } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <div className="relative h-64 w-full bg-primary">
        <Image
          src="https://placehold.co/1200x300.png"
          alt="Dubai coastline"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="dubai coastline"
        />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="font-headline text-4xl font-bold text-primary-foreground md:text-5xl">
            About Azure Yachts Dubai
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-semibold text-primary">
              Your Gateway to Unforgettable Marine Adventures
            </h2>
            <p className="text-lg text-muted-foreground">
              Founded on a passion for the sea and a commitment to excellence, Azure Yachts Dubai offers an unparalleled gateway to the majestic waters of the Arabian Gulf. We believe that luxury is not just about opulence, but about creating unforgettable experiences.
            </p>
            <p className="text-muted-foreground">
              From our meticulously maintained fleet of private and sharing yachts to our thrilling selection of water sports, every aspect of our service is tailored to provide you with the ultimate Dubai adventure. Our professional crew and certified instructors are dedicated to ensuring your safety, comfort, and absolute enjoyment.
            </p>
            <p className="text-muted-foreground">
              We are more than just a charter company; we are curators of memories, architects of joy, and your trusted partner in exploring the beauty of Dubai from its most stunning vantage point: the water.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/500x600.png"
              alt="Yacht crew smiling"
              width={500}
              height={600}
              className="rounded-lg object-cover shadow-xl"
              data-ai-hint="yacht crew"
            />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="font-headline text-3xl font-semibold">Our Core Values</h3>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            The principles that guide every voyage we undertake.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Sailboat className="h-8 w-8" />
              </div>
              <h4 className="font-headline text-xl font-semibold">Luxury & Comfort</h4>
              <p className="mt-2 text-muted-foreground">
                Providing the highest standards of quality and comfort in our fleet and services.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <LifeBuoy className="h-8 w-8" />
              </div>
              <h4 className="font-headline text-xl font-semibold">Safety First</h4>
              <p className="mt-2 text-muted-foreground">
                Upholding the strictest safety protocols to ensure a worry-free experience.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Anchor className="h-8 w-8" />
              </div>
              <h4 className="font-headline text-xl font-semibold">Unforgettable Experiences</h4>
              <p className="mt-2 text-muted-foreground">
                Crafting unique and memorable adventures tailored to our clients' desires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
