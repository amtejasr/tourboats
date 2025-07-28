import { waterActivities } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Tag, Clock, Users } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl mb-10">
            <Image src={activity.image} alt={activity.name} fill className="object-cover" data-ai-hint={activity.aiHint} />
          </div>
          
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">{activity.name}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{activity.longDescription}</p>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24 shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Book This Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Tag className="h-7 w-7 text-primary" />
                  <span className="font-medium text-lg">Price</span>
                </div>
                <span className="font-bold text-2xl">
                  AED {activity.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/person</span>
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Clock className="h-7 w-7 text-primary" />
                  <span className="font-medium text-lg">Duration</span>
                </div>
                <span className="font-bold text-2xl">{activity.duration} minutes</span>
              </div>
              
              <div className="pt-4">
                 <BookingDialog 
                  bookingType="activity"
                  itemName={activity.name}
                  className="w-full text-lg py-7"
                />
                <p className="text-sm text-muted-foreground text-center mt-3">
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
