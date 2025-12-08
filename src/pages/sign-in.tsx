import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
}

interface ClerkAPIError {
  errors: { message: string }[];
}

function isClerkAPIError(error: unknown): error is ClerkAPIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as { errors: unknown }).errors)
  );
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);

  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    if (!isLoaded) return;

    try {
      setIsFormSubmit(true);

      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Signed in successfully!', { position: 'top-center' });
        navigate('/');
      } else {
        toast.error('Login failed. Please try again.', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Sign-in error:', error);

      if (isClerkAPIError(error)) {
        toast.error(error.errors.map((e) => e.message).join(', '), { position: 'top-center' });
      } else if (error instanceof Error) {
        toast.error(error.message, { position: 'top-center' });
      } else {
        toast.error('Something went wrong', { position: 'top-center' });
      }
    } finally {
      setIsFormSubmit(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2 text-sm">
        <Spinner /> Loading...
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden items-center justify-center border-r md:flex"></div>

      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-muted-foreground text-sm">Enter your credentials to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pr-10 pl-9"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute top-2.5 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="mt-2 w-full">
              {isFormSubmit ? <Spinner /> : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
