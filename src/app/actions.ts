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

// This is a mock server action. In a real application, you would integrate an
// email service like SendGrid, Resend, or Nodemailer to send the email.
export async function handleContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  console.log("New contact form submission received:");
  console.log("Name:", formData.name);
  console.log("Email:", formData.email);
  console.log("Subject:", formData.subject);
  console.log("Message:", formData.message);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would have error handling here
  // For now, we'll always return success.
  return { success: true, message: "Your message has been sent successfully!" };
}
