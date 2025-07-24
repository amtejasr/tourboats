import Link from 'next/link';
import { Sailboat, Phone, Mail, MapPin } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* About Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold mb-4">
              <Sailboat className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl">Tourboats</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premier choice for luxury yacht charters and thrilling water activities in Dubai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/yachts/private" className="text-sm hover:text-primary transition-colors">Private Yachts</Link></li>
              <li><Link href="/yachts/sharing" className="text-sm hover:text-primary transition-colors">Sharing Yachts</Link></li>
              <li><Link href="/#activities" className="text-sm hover:text-primary transition-colors">Water Activities</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <span>Dubai Marina, Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 shrink-0" />
                <a href="mailto:contact@tourboats.com" className="hover:text-primary transition-colors">contact@tourboats.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 shrink-0" />
                <a href="tel:+971504227715" className="hover:text-primary transition-colors">+971 50 422 7715</a>
              </li>
            </ul>
          </div>
          
          {/* WhatsApp */}
          <div>
             <h3 className="font-headline text-lg font-semibold mb-4">WhatsApp Support</h3>
             <p className="text-sm text-muted-foreground mb-4">Get instant support & booking assistance.</p>
             <WhatsAppButton phoneNumber="+971504227715" message="Hello! I have a question about your services." />
          </div>

        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tourboats. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
