
'use client';

import { Sailboat, Anchor, LifeBuoy } from 'lucide-react';

// SVG Wave Component
const AnimatedWaves = () => (
    <div className="absolute bottom-0 left-0 w-full">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="hsla(215, 28%, 96%, 0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="hsla(215, 28%, 96%, 0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="hsla(215, 28%, 96%, 0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="hsl(var(--secondary))" />
            </g>
        </svg>
    </div>
);

export default function AboutPage() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <div className="relative flex h-[50vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-blue-800 text-center text-white">
        <h1
          className="font-headline text-5xl font-bold tracking-tight md:text-7xl"
        >
          About Us
        </h1>
         <div
          className="mt-4 h-1.5 w-32 bg-yellow-400 rounded-full"
        />
        <AnimatedWaves />
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <div
          className="rounded-xl bg-card p-8 md:p-12 shadow-2xl text-center"
        >
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">
            A New Wave in Luxury
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Founded by Tejas R, <span className="font-semibold text-primary">Tourboats</span> is a modern, digital-first yacht experience platform. We aim to provide hassle-free and highly affordable yacht rentals, setting us apart from traditional providers. With seamless online booking and direct access to a wide fleet, our mission is to make luxury water adventures easy and accessible for everyone.
          </p>
        </div>

        {/* Core Values Section */}
        <div
          className="mt-24 text-center"
        >
          <h3 className="font-headline text-4xl font-bold">Our Core Values</h3>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            The principles that guide every voyage we undertake.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sailboat className="h-10 w-10" />
              </div>
              <h4 className="font-headline text-2xl font-bold">Luxury & Comfort</h4>
              <p className="mt-3 text-muted-foreground">
                Providing the highest standards of quality and comfort in our fleet and services.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LifeBuoy className="h-10 w-10" />
              </div>
              <h4 className="font-headline text-2xl font-bold">Safety First</h4>
              <p className="mt-3 text-muted-foreground">
                Upholding the strictest safety protocols to ensure a worry-free experience.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
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
    </div>
  );
}
