
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import WhatsAppButton from '@/components/WhatsAppButton';
import { handleContactForm } from '../actions';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await handleContactForm(values);
    if (result.success) {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. We will get back to you shortly.',
      });
      setIsSubmitted(true);
      form.reset();
    } else {
       toast({
        variant: "destructive",
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again or contact us via WhatsApp.',
      });
    }
  }

  return (
    <div className="relative overflow-hidden bg-secondary">
      {/* Abstract background waves */}
      <div className="absolute inset-0 -z-0 opacity-5">
        <svg
          className="absolute left-0 top-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="wave-pattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 40 Q 20 10 40 40 T 80 40"
                stroke="hsl(var(--primary))"
                fill="none"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="font-headline text-5xl font-bold text-primary md:text-6xl">
            Get In Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We're here to help you plan the perfect marine adventure. Reach out
            with any questions or booking inquiries.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                 <Alert variant="default" className="border-green-500 text-green-700 [&>svg]:text-green-700 flex flex-col items-center justify-center text-center p-8">
                  <CheckCircle className="h-16 w-16 mb-4" />
                  <AlertTitle className="text-2xl font-bold">Thank You!</AlertTitle>
                  <AlertDescription className="text-base">
                    Your message has been sent successfully. We will get back to you as soon as possible.
                  </AlertDescription>
                  <Button onClick={() => setIsSubmitted(false)} className="mt-6">Send Another Message</Button>
                </Alert>
              ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} disabled={form.formState.isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                               disabled={form.formState.isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Private Yacht Inquiry"
                            {...field}
                             disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your inquiry..."
                            className="min-h-[120px]"
                            {...field}
                             disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg" disabled={form.formState.isSubmitting}>
                     {form.formState.isSubmitting ? 'Sending...' : (
                       <>
                         <Send className="mr-2" />
                         Send Message
                       </>
                     )}
                  </Button>
                </form>
              </Form>
              )}
            </CardContent>
          </Card>

          {/* Contact Details */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardContent className="space-y-6 p-8">
                <div className="flex items-start">
                  <MapPin className="mt-1 h-8 w-8 shrink-0 text-primary" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Our Location</h3>
                    <p className="text-muted-foreground">
                      Dubai Marina, Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mt-1 h-8 w-8 shrink-0 text-primary" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Email Us</h3>
                    <a
                      href="mailto:sales@tourdit.com"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      sales@tourdit.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mt-1 h-8 w-8 shrink-0 text-primary" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Call Us</h3>
                    <a
                      href="tel:+971504227715"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      +971 50 422 7715
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Instant Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-primary-foreground/90">
                  For immediate assistance with bookings or questions, connect
                  with us on WhatsApp.
                </p>
                <WhatsAppButton
                  phoneNumber="+971504227715"
                  message="Hello! I'm on your contact page and have a question."
                  className="bg-white text-primary hover:bg-white/90"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
