import { waterActivities } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Tag, Clock } from 'lucide-react';
import { BookingDialog } from '@/components/BookingDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const activity = waterActivities.find((p) => p.id === params.id);
  if (!activity) {
    return {
      title: 'Activity Not Found',
    };
  }
  return {
    title: `${activity.name} | Tourboats`,
    description: activity.longDescription.substring(0, 160),
  };
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const activity = waterActivities.find((p) => p.id === params.id);

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
            <Image src={activity.image} alt={activity.name} layout="fill" objectFit="cover" data-ai-hint={activity.aiHint} />
          </div>
          
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{activity.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{activity.longDescription}</p>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24 shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Activity Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="h-6 w-6 text-primary" />
                  <span className="font-medium">Price</span>
                </div>
                <span className="font-semibold text-lg">
                  AED {activity.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/person</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <span className="font-medium">Duration</span>
                </div>
                <span className="font-semibold text-lg">{activity.duration} minutes</span>
              </div>
              
              <div className="pt-4">
                 <BookingDialog 
                  bookingType="activity"
                  itemName={activity.name}
                  className="w-full text-lg py-6"
                />
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Contact us on WhatsApp for instant booking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
