import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListingForm } from '@/components/admin/ListingForm';
import { yachts, waterActivities } from '@/lib/data';
import type { Yacht, WaterActivity } from '@/types';

export default function EditListingPage({ params }: { params: { slug: string[] } }) {
  const [type, id] = params.slug;

  if (!type || !id) {
    notFound();
  }

  let listing: (Yacht | WaterActivity) | undefined;
  let listingType: 'yacht' | 'waterActivity';

  if (type === 'yacht') {
    listing = yachts.find((y) => y.id === id);
    listingType = 'yacht';
  } else if (type === 'activity') {
    listing = waterActivities.find((a) => a.id === id);
    listingType = 'waterActivity';
  } else {
    notFound();
  }

  if (!listing) {
    notFound();
  }
  
  // Prepare initial data for the form
  let initialData;
  if (listingType === 'yacht') {
    const yacht = listing as Yacht;
    initialData = {
      category: 'yacht',
      name: yacht.name,
      price: yacht.pricePerHour,
      imageUrls: yacht.images.join(', '),
      features: yacht.features.join(', '),
      keyAttributes: `Type: ${yacht.name}, Size: ${yacht.size}ft, Capacity: ${yacht.capacity} guests`,
      description: yacht.description,
    };
  } else {
    const activity = listing as WaterActivity;
     initialData = {
      category: 'waterActivity',
      name: activity.name,
      price: activity.price,
      imageUrls: activity.image,
      features: `Duration: ${activity.duration} minutes`,
      keyAttributes: `Type: ${activity.name}, Highlights: ${activity.shortDescription}`,
      description: activity.longDescription,
    };
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Edit Listing</CardTitle>
        <CardDescription>
          Update the details for "{listing.name}". The changes won't be saved in this demo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ListingForm initialData={initialData} />
      </CardContent>
    </Card>
  );
}
