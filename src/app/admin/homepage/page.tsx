
'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function HomepageAdminPage() {
  const { heroImages, updateHeroImages } = useData();
  const [currentImages, setCurrentImages] = useState(heroImages);
  const { toast } = useToast();

  const handleImageUpload = (base64: string) => {
    if (base64) {
      setCurrentImages(prev => [...prev, base64]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setCurrentImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSaveChanges = () => {
    updateHeroImages(currentImages);
    toast({
        title: "Homepage Updated!",
        description: "Your new hero images have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Manage Homepage</CardTitle>
        <CardDescription>
          Update the hero carousel images for the main page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hero Carousel Images</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentImages.map((img, index) => (
                    <div key={index} className="relative group">
                        <Image src={img} alt={`Hero Image ${index + 1}`} width={200} height={150} className="rounded-md object-cover w-full aspect-[4/3]" />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
             </div>
        </div>

        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Upload New Image</h3>
            <ImageUpload onChange={handleImageUpload} value="" />
             <p className="text-sm text-muted-foreground">The uploaded image will be added to the end of the carousel.</p>
        </div>
        
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
