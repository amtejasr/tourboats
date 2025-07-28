
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

const Logo = () => (
    <svg height="40" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <text x="10" y="30" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="currentColor">
            Tourboats
        </text>
    </svg>
);


export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold mb-4">
               <Logo />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Your premier choice for luxury yacht charters and thrilling water activities in Dubai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/yachts/private" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Private Yachts</Link></li>
              <li><Link href="/yachts/sharing" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Sharing Yachts</Link></li>
              <li><Link href="/#activities" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Water Activities</Link></li>
              <li><Link href="/about" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 shrink-0" />
                <span className="text-primary-foreground/80">Dubai Marina, Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 shrink-0" />
                <a href="mailto:sales@tourdit.com" className="text-primary-foreground/80 hover:text-white transition-colors">sales@tourdit.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 shrink-0" />
                <a href="tel:+971504227715" className="text-primary-foreground/80 hover:text-white transition-colors">+971 50 422 7715</a>
              </li>
            </ul>
          </div>
          
          {/* WhatsApp */}
          <div>
             <h3 className="font-headline text-lg font-semibold mb-4">WhatsApp Support</h3>
             <p className="text-sm text-primary-foreground/80 mb-4">Get instant support & booking assistance.</p>
             <WhatsAppButton 
                phoneNumber="+971504227715" 
                message="Hello! I have a question about your services."
                className="bg-white text-primary hover:bg-white/90"
              />
          </div>

        </div>
        <div className="mt-16 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Tourboats. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
