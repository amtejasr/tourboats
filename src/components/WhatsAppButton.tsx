import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Simple SVG for WhatsApp icon
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 16.95A8.91 8.91 0 0 1 12.03 16a1 1 0 0 0-1.1.34l-1 1.59a1 1 0 0 1-1.5-.23 11.23 11.23 0 0 1-3.82-5.05 1 1 0 0 1 .3-1.23l1.39-1.15a1 1 0 0 0 .4-1.28 9.22 9.22 0 0 1-.63-3.69 1 1 0 0 0-.9-1.13h-1.6a1 1 0 0 0-1 .76 13.56 13.56 0 0 0 3.39 9.54 13.59 13.59 0 0 0 9.53 3.39 1 1 0 0 0 .76-1v-1.6a1 1 0 0 0-1.13-1.07z" />
  </svg>
);


interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string;
  children?: React.ReactNode;
}

const WhatsAppButton: FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
  className,
  children = 'Book via WhatsApp',
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      asChild
      className={cn('bg-green-500 text-white hover:bg-green-600', className)}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        <span className="ml-2">{children}</span>
      </a>
    </Button>
  );
};

export default WhatsAppButton;
