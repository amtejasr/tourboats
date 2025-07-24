// The directive tells Next.js it's a server-side module.
'use server';

/**
 * @fileOverview AI-powered content generation for yacht and water activity listings.
 *
 * - generateListingDescription - A function that generates unique, SEO-friendly descriptions.
 * - GenerateListingDescriptionInput - The input type for the generateListingDescription function.
 * - GenerateListingDescriptionOutput - The return type for the generateListingDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingDescriptionInputSchema = z.object({
  category: z
    .enum(['yacht', 'waterActivity'])
    .describe('The category of the listing: yacht or waterActivity.'),
  name: z.string().describe('The name of the yacht or water activity.'),
  keyAttributes: z
    .string()
    .describe(
      'Key attributes of the listing, such as size, capacity, special features, etc.'
    ),
});
export type GenerateListingDescriptionInput = z.infer<
  typeof GenerateListingDescriptionInputSchema
>;

const GenerateListingDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A unique and SEO-friendly description for the listing.'),
});
export type GenerateListingDescriptionOutput = z.infer<
  typeof GenerateListingDescriptionOutputSchema
>;

export async function generateListingDescription(
  input: GenerateListingDescriptionInput
): Promise<GenerateListingDescriptionOutput> {
  return generateListingDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateListingDescriptionPrompt',
  input: {schema: GenerateListingDescriptionInputSchema},
  output: {schema: GenerateListingDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling and SEO-friendly descriptions for luxury experiences in Dubai.

  Your goal is to generate a unique description for a {{category}} listing based on the provided key attributes. The description should be engaging, informative, and optimized for search engines to attract potential customers.

  Listing Name: {{name}}
  Key Attributes: {{keyAttributes}}

  Write a description that highlights the key features and benefits of the {{category}}, while also capturing the excitement and luxury of the Dubai experience. The description should be approximately 150-200 words.
  `,
});

const generateListingDescriptionFlow = ai.defineFlow(
  {
    name: 'generateListingDescriptionFlow',
    inputSchema: GenerateListingDescriptionInputSchema,
    outputSchema: GenerateListingDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
