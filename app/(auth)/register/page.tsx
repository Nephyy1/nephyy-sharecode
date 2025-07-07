"use client";

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Github, LoaderCircle, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else if (data.user) {
      if (data.user.identities && data.user.identities.length === 0) {
        setError("User with this email already exists but is unconfirmed. Please check your email for the confirmation link.");
      } else {
        setSuccess(true);
      }
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-subtle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tighter">Create an Account</CardTitle>
          <CardDescription>Join our community by creating a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="text-xl font-semibold">Confirm your email</h3>
              <p className="text-muted-foreground">
                We&apos;ve sent a confirmation link to <span className="font-bold text-foreground">{email}</span>. Please check your inbox and spam folder to complete the registration.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="name" type="text" placeholder="Your Name" required className="pl-10" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" required className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} required className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full mt-6 btn-gradient text-base" disabled={isLoading}>
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Sign up with GitHub
              </Button>
            </form>
          )}
        </CardContent>
        <div className="text-center p-6 pt-0 text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
