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
    <div className="bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
            <h1 className="font-headline text-5xl font-bold md:text-6xl text-primary">
                Get In Touch
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We're here to help you plan the perfect marine adventure.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Information Cards */}
          <div className="space-y-8">
             <Card className="shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-8 w-8 mr-5 mt-1 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Our Location</h3>
                    <p className="text-muted-foreground">Dubai Marina, Dubai, United Arab Emirates</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <Mail className="h-8 w-8 mr-5 mt-1 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Email Us</h3>
                    <a href="mailto:contact@tourboats.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@tourboats.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-8 w-8 mr-5 mt-1 text-primary shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Call Us</h3>
                    <a href="tel:+971504227715" className="text-muted-foreground hover:text-primary transition-colors">
                      +971 50 422 7715
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary text-primary-foreground shadow-lg">
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
             <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl shadow-2xl flex-grow">
                 <Image src="https://picsum.photos/seed/map-contact/800/800" alt="Map to Dubai Marina" layout="fill" objectFit="cover" data-ai-hint="dubai map"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
