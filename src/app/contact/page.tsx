import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ContactPage() {
  return (
    <>
      <div className="relative h-64 w-full bg-primary">
        <Image
          src="https://picsum.photos/seed/contact-banner/1200/300"
          alt="Ocean waves"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="ocean waves"
        />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h1 className="font-headline text-4xl font-bold text-primary-foreground md:text-5xl">
            Get In Touch
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-3xl font-semibold text-primary">Contact Information</h2>
              <p className="mt-2 text-muted-foreground">
                We're here to help! Reach out to us via phone, email, or WhatsApp for any inquiries or booking requests.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Location</h3>
                    <p className="text-muted-foreground">Dubai Marina, Dubai, United Arab Emirates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a href="mailto:contact@azureyachtsdubai.com" className="text-muted-foreground hover:text-primary">
                      contact@azureyachtsdubai.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <a href="tel:+971504227715" className="text-muted-foreground hover:text-primary">
                      +971 50 422 7715
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Instant Support</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">For immediate assistance with bookings or questions, connect with us on WhatsApp.</p>
                    <WhatsAppButton phoneNumber="+971504227715" message="Hello! I'm on your contact page and have a question." />
                </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div>
            <h2 className="font-headline text-3xl font-semibold text-primary mb-4">Find Us Here</h2>
             <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg shadow-xl">
                 <Image src="https://picsum.photos/seed/map/600/450" alt="Map to Dubai Marina" layout="fill" objectFit="cover" data-ai-hint="dubai map"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
