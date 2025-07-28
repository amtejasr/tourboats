
'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListingForm } from '@/components/admin/ListingForm';
import { useData } from '@/context/DataContext';
import type { Yacht, WaterActivity } from '@/types';
import { useEffect, useState } from 'react';

export default function EditListingPage() {
  const { yachts, waterActivities, updateListing } = useData();
  const router = useRouter();
  const params = useParams();
  const { slug } = params as { slug: string[] };
  const [type, id] = slug;

  const [listing, setListing] = useState<(Yacht | WaterActivity) | null>(null);
  const [listingType, setListingType] = useState<'yacht' | 'waterActivity' | null>(null);

  useEffect(() => {
    if (!type || !id) {
      notFound();
    }

    let foundListing: (Yacht | WaterActivity) | undefined;
    let foundType: 'yacht' | 'waterActivity';

    if (type === 'yacht') {
      foundListing = yachts.find((y) => y.id === id);
      foundType = 'yacht';
    } else if (type === 'activity') {
      foundListing = waterActivities.find((a) => a.id === id);
      foundType = 'waterActivity';
    } else {
      notFound();
    }

    if (!foundListing) {
      notFound();
    }
    
    setListing(foundListing);
    setListingType(foundType);

  }, [type, id, yachts, waterActivities]);

  if (!listing || !listingType) {
    return null; // or a loading spinner
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
  
  const handleUpdate = (data: Omit<Yacht | WaterActivity, 'id'>) => {
    updateListing(listing.id, data);
    router.push('/admin');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Edit Listing</CardTitle>
        <CardDescription>
          Update the details for "{listing.name}". The changes will be saved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ListingForm initialData={initialData} onSave={handleUpdate} isEditing />
      </CardContent>
    </Card>
  );
}
