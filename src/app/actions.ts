"use server";

import { generateListingDescription, GenerateListingDescriptionInput } from '@/ai/flows/generate-listing-description';

export async function handleGenerateDescription(input: GenerateListingDescriptionInput) {
    try {
        const output = await generateListingDescription(input);
        return { description: output.description };
    } catch (error) {
        console.error("Error generating description:", error);
        return { error: "Failed to generate description." };
    }
}
