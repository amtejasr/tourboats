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
import { Sparkles, Loader2 } from 'lucide-react';
import { handleGenerateDescription } from '@/app/actions';

const formSchema = z.object({
  category: z.enum(['yacht', 'waterActivity'], {
    required_error: "Please select a category.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  keyAttributes: z.string().min(10, {
    message: "Please provide at least 10 characters of key attributes.",
  }),
  description: z.string().optional(),
});

export function ListingForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      keyAttributes: "",
      description: "",
    },
  });

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save this data to your database.
    console.log(values);
    toast({
        title: "Listing Submitted!",
        description: "Your new listing has been saved (check the console for data).",
    });
    form.reset();
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
          name="keyAttributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Attributes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter key features, size, capacity, highlights, etc. Separate with commas."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide the core details for the AI to generate a description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="button" variant="outline" onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate AI Description
        </Button>

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
