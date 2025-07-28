
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // This is a mock. In a real app, you'd send an email.
    console.log('Password reset requested for:', data.email);
    setSuccess('If an account with this email exists, a password reset link has been sent.');
    reset();
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-secondary px-4 py-12">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} disabled={isSubmitting} />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {success && (
                <Alert variant="default" className="border-green-500 text-green-700 [&>svg]:text-green-700">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full text-lg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <> <Mail className="mr-2" /> Send Reset Link </>}
              </Button>
            </CardContent>
            <CardFooter className="flex items-center justify-center text-sm">
              <p className="text-muted-foreground">
                Remember your password?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
