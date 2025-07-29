
'use client';

import { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { HomePageYachtCategory } from '@/types';

// Create a new type for local state management that includes optional preview
type EditableHomePageYachtCategory = HomePageYachtCategory & { imagePreview?: string };

export default function HomepageAdminPage() {
  const { heroImages, homePageYachtCategories, updateHeroImages, updateHomePageYachtCategories } = useData();
  const [currentImages, setCurrentImages] = useState(heroImages);
  
  const [yachtCategories, setYachtCategories] = useState<EditableHomePageYachtCategory[]>(
      homePageYachtCategories.map(c => ({...c, imagePreview: c.image}))
  );

  const { toast } = useToast();

  const handleHeroImageUpload = (base64: string) => {
    if (base64) {
      setCurrentImages(prev => [...prev, base64]);
    }
  };

  const handleRemoveHeroImage = (index: number) => {
    setCurrentImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleCategoryChange = (index: number, field: keyof HomePageYachtCategory, value: string) => {
    setYachtCategories(prev => {
        const newCategories = [...prev];
        const updatedCategory = { ...newCategories[index], [field]: value };
        
        if (field === 'image') {
          updatedCategory.imagePreview = value;
        }

        newCategories[index] = updatedCategory;
        return newCategories;
    })
  }

  const handleSaveChanges = () => {
    updateHeroImages(currentImages);

    // Prepare data for saving, excluding the large image strings
    const categoriesToSave = yachtCategories.map(({ image, ...rest }) => ({
        ...rest,
        image: homePageYachtCategories.find(c => c.type === rest.type)?.image || image // Keep original image if no new one
    }));
    
    updateHomePageYachtCategories(categoriesToSave);
    
    toast({
        title: "Homepage Updated!",
        description: "Your changes have been saved successfully. Note: Uploaded images are for preview and won't be persisted.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Manage Homepage</CardTitle>
        <CardDescription>
          Update the content for the main page, including the hero carousel and yacht category cards.
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
                            onClick={() => handleRemoveHeroImage(index)}
                        >
                           <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
             </div>
        </div>

        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Upload New Hero Image</h3>
            <ImageUpload onChange={handleHeroImageUpload} value="" />
             <p className="text-sm text-muted-foreground">The uploaded image will be added to the end of the carousel.</p>
        </div>
        
        <Separator />
        
        <div className="space-y-6">
            <h3 className="font-semibold text-lg">Yacht Category Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {yachtCategories.map((category, index) => (
                    <div key={category.type} className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-semibold text-md capitalize">{category.type} Yachts Card</h4>
                        <div className="space-y-2">
                           <Label htmlFor={`title-${category.type}`}>Title</Label>
                           <Input 
                                id={`title-${category.type}`}
                                value={category.title}
                                onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
                           />
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor={`description-${category.type}`}>Description</Label>
                           <Input 
                                id={`description-${category.type}`}
                                value={category.description}
                                onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                           />
                        </div>
                        <div className="space-y-2">
                            <Label>Image (for preview only)</Label>
                            <ImageUpload 
                                value={category.imagePreview || ''}
                                onChange={(base64) => handleCategoryChange(index, 'image', base64)}
                            />
                             <p className="text-xs text-muted-foreground">Image uploads are for preview and will not be saved.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
