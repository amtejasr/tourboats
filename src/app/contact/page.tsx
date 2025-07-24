import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ContactPage() {
  return (
    <>
      <div className="relative h-80 w-full">
        <Image
          src="https://picsum.photos/seed/contact-banner/1600/400"
          alt="Ocean waves from a yacht"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          data-ai-hint="ocean waves"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-5xl font-bold md:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">We're here to help you plan the perfect marine adventure.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-4xl font-bold text-primary">Contact Information</h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Reach out to us via phone, email, or WhatsApp for any inquiries or booking requests. Our team is ready to assist you.
              </p>
            </div>
            <Card className="border-2 border-accent/20">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-8 w-8 mr-5 mt-1 text-accent shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Our Location</h3>
                    <p className="text-muted-foreground">Dubai Marina, Dubai, United Arab Emirates</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <Mail className="h-8 w-8 mr-5 mt-1 text-accent shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Email Us</h3>
                    <a href="mailto:contact@tourboats.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@tourboats.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-8 w-8 mr-5 mt-1 text-accent shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Call Us</h3>
                    <a href="tel:+971504227715" className="text-muted-foreground hover:text-primary transition-colors">
                      +971 50 422 7715
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-2xl">Instant Support</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-primary-foreground/90">For immediate assistance with bookings or questions, connect with us on WhatsApp.</p>
                    <WhatsAppButton phoneNumber="+971504227715" message="Hello! I'm on your contact page and have a question." className="bg-white text-primary hover:bg-white/90"/>
                </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="flex flex-col">
            <h2 className="font-headline text-4xl font-bold text-primary mb-6">Find Us Here</h2>
             <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-lg shadow-2xl flex-grow">
                 <Image src="https://picsum.photos/seed/map/800/600" alt="Map to Dubai Marina" layout="fill" objectFit="cover" data-ai-hint="dubai map"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
