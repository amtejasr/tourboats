
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

type EditableHomePageYachtCategory = HomePageYachtCategory;

export default function HomepageAdminPage() {
  const { heroImages, homePageYachtCategories, updateHeroImages, updateHomePageYachtCategories } = useData();
  const [currentImages, setCurrentImages] = useState(heroImages);
  
  const [yachtCategories, setYachtCategories] = useState<EditableHomePageYachtCategory[]>([]);

  const { toast } = useToast();

  // Sync with context if it changes
  useEffect(() => {
    // Deep copy to prevent direct mutation of context state
    setYachtCategories(JSON.parse(JSON.stringify(homePageYachtCategories)));
  }, [homePageYachtCategories]);


  const handleHeroImageUpload = (base64: string) => {
    if (base64) {
      setCurrentImages(prev => [...prev, base64]);
    }
  };

  const handleRemoveHeroImage = (index: number) => {
    setCurrentImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleCategoryChange = (index: number, field: keyof Omit<EditableHomePageYachtCategory, 'image' | 'type' | 'link' | 'aiHint'>, value: string) => {
    setYachtCategories(prev => {
        const newCategories = [...prev];
        const updatedCategory = { ...newCategories[index], [field]: value };
        newCategories[index] = updatedCategory;
        return newCategories;
    })
  }
  
  const handleCategoryImageChange = (index: number, base64: string) => {
      setYachtCategories(prev => {
        const newCategories = [...prev];
        newCategories[index].image = base64; // Store base64 string directly
        return newCategories;
      })
  }

  const handleSaveChanges = () => {
    updateHeroImages(currentImages);
    updateHomePageYachtCategories(yachtCategories);
    
    toast({
        title: "Homepage Updated!",
        description: "Your changes have been saved. Uploaded images will persist for your current session.",
    });
  };
  
  if (!yachtCategories.length) {
      return null; // or a loading skeleton
  }

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
                            <Label>Image</Label>
                            <ImageUpload 
                                value={category.image}
                                onChange={(base64) => handleCategoryImageChange(index, base64)}
                            />
                             <p className="text-xs text-muted-foreground">Image will be shown for the current session only.</p>
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
