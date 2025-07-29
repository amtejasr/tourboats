
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

// Re-using the WhatsApp icon from WhatsAppButton.tsx
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function WhatsAppPopup() {
  const phoneNumber = "+971504227715";
  const message = "Hello! I'm visiting your website and have a question.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:scale-110 active:scale-95 animate-tada group"
      )}
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon />
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-max bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us!
      </div>
    </Link>
  );
}
