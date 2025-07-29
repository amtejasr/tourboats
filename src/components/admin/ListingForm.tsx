

"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from 'lucide-react';
import { handleGenerateDescription } from '@/app/actions';
import { SailingYachtLoader } from './SailingYachtLoader';
import { ImageUpload } from './ImageUpload';
import type { Yacht, WaterActivity } from '@/types';

const formSchema = z.object({
  category: z.enum(['yacht', 'waterActivity'], {
    required_error: "Please select a category.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
  imageUrls: z.string().min(10, { message: "Please provide at least one image URL or upload an image."}),
  features: z.string().min(10, { message: "Please provide at least 10 characters of features."}),
  keyAttributes: z.string().min(10, {
    message: "Please provide at least 10 characters of key attributes for AI generation.",
  }),
  description: z.string().optional(),
});

type ListingFormValues = z.infer<typeof formSchema>;

interface ListingFormProps {
  initialData?: Partial<ListingFormValues>;
  onSave: (data: Omit<Yacht | WaterActivity, 'id'>) => void;
  isEditing?: boolean;
}

function createIdFromString(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function ListingForm({ initialData, onSave, isEditing = false }: ListingFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      category: 'yacht',
      name: "",
      price: 0,
      imageUrls: "",
      features: "",
      keyAttributes: "",
      description: "",
    },
  });
  
  // Reset form when initialData changes for the "add" page
  if (!isEditing && form.formState.isSubmitSuccessful) {
      form.reset(initialData || {
        category: 'yacht',
        name: "",
        price: 0,
        imageUrls: "",
        features: "",
        keyAttributes: "",
        description: "",
      });
  }


  async function onGenerate() {
    const { category, name, keyAttributes } = form.getValues();
    if (!category || !name || !keyAttributes) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in Category, Name, and Key Attributes before generating a description.",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await handleGenerateDescription({
        category,
        name,
        keyAttributes,
      });

      if (result.description) {
        form.setValue('description', result.description);
        toast({
            title: "Description Generated!",
            description: "The AI-generated description has been added below.",
        });
      } else {
        throw new Error("Failed to generate description.");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "An error occurred while generating the description. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function onSubmit(values: ListingFormValues) {
    const id = createIdFromString(values.name);

    let newListing: Omit<Yacht | WaterActivity, 'id'>;

    if (values.category === 'yacht') {
      newListing = {
        name: values.name,
        category: 'private', // Defaulting to private, can be expanded
        image: values.imageUrls,
        aiHint: `${values.name} yacht`,
        images: values.imageUrls.split(',').map(url => url.trim()),
        capacity: 20, // Placeholder
        size: 60, // Placeholder
        description: values.description || '',
        pricePerHour: values.price,
        features: values.features.split(',').map(f => f.trim()),
      };
    } else {
      newListing = {
        name: values.name,
        image: values.imageUrls,
        aiHint: `${values.name} water sport`,
        shortDescription: values.features,
        longDescription: values.description || '',
        price: values.price,
        duration: 30, // Placeholder
      };
    }
    
    onSave(newListing);

    toast({
        title: isEditing ? "Listing Updated!" : "Listing Added!",
        description: `"${values.name}" has been saved successfully.`,
    });
    
    if (!isEditing) {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a listing category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="yacht">Yacht</SelectItem>
                    <SelectItem value="waterActivity">Water Activity</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Listing Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Serenity Cruiser or Jetski Adventure" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price (AED)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 2500" {...field} />
                </FormControl>
                 <FormDescription>
                    Price per hour for yachts, or per person for activities.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />

        <FormField
          control={form.control}
          name="imageUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Upload the main image for the listing. This will be the banner/thumbnail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features / Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="For Yachts: Feature 1, Feature 2... For Activities: A short, catchy description."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                For yachts, add comma-separated features. For activities, write a short description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="border p-4 rounded-md space-y-4 bg-secondary/50">
            <h3 className="font-semibold text-lg">AI Content Generator</h3>
             <FormField
                control={form.control}
                name="keyAttributes"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Key Attributes for AI</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Enter key features, size, capacity, highlights, etc. that make this listing unique."
                        className="resize-none bg-background"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        Provide the core details for the AI to generate a compelling description.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
        
            <Button type="button" variant="outline" onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? (
                <SailingYachtLoader />
            ) : (
                <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate AI Description
            </Button>
        </div>


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generated Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The AI-generated description will appear here."
                  className="resize-y min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Review and edit the generated description before submitting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary hover:bg-primary/90">Save Listing</Button>
      </form>
    </Form>
  );
}
