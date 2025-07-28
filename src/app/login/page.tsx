
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
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
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    const result = await login(data.email, data.password);
    if (result.success) {
      if (result.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };
  
  const isFormSubmitting = isSubmitting || loading;

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-secondary px-4 py-12">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
              <CardDescription>
                Log in to manage your bookings or access the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  disabled={isFormSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    disabled={isFormSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full text-lg" disabled={isFormSubmitting}>
                {isFormSubmitting ? 'Logging in...' : <> <LogIn className="mr-2" /> Log In </>}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center text-sm">
                <p className="text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-semibold text-primary hover:underline">
                        Create an account
                    </Link>
                </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
