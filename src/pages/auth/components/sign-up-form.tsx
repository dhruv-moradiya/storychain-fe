import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { GitHubIcon, GoogleIcon } from './auth-icons';
import { MobileLogo } from './auth-branding';
import { useSignUpLogic } from '../hooks';
import type { SignUpFormData } from '../auth.types';

export function SignUpForm() {
  const {
    showPassword,
    isFormSubmit,
    isVerifying,
    otpCode,
    isOAuthLoading,
    togglePassword,
    goBackToForm,
    onSubmit,
    handleVerify,
    handleResendCode,
    handleOAuthSignUp,
    setOtpCode,
  } = useSignUpLogic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  if (isVerifying) {
    return (
      <div className="bg-bg-cream relative flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goBackToForm}
            className="absolute top-4 left-4 hover:bg-black/5"
          >
            <ArrowLeft className="text-text-secondary-65 h-5 w-5" />
          </Button>

          <div className="space-y-2 text-center">
            <div className="bg-brand-blue/15 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
              <Mail className="text-brand-blue h-8 w-8" />
            </div>
            <h2 className="text-text-primary text-2xl font-semibold">Verify your email</h2>
            <p className="text-text-secondary-65 text-sm">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <InputOTP maxLength={6} value={otpCode} onChange={(val: string) => setOtpCode(val)}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="focus:border-brand-blue border-black/10 bg-white"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <Button
              onClick={handleVerify}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 w-full font-medium text-white"
              disabled={isFormSubmit || otpCode.length !== 6}
            >
              {isFormSubmit ? <Spinner /> : 'Verify Email'}
            </Button>

            <p className="text-text-secondary-65 text-center text-xs">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="text-brand-pink-500 hover:text-brand-pink-600 font-medium transition-colors"
                onClick={handleResendCode}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-cream flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-6">
        <MobileLogo />

        <div className="space-y-2 text-center">
          <h2 className="text-text-primary text-2xl font-semibold">Create an account</h2>
          <p className="text-text-secondary-65 text-sm">Join the community and start your story</p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full gap-3 border-black/10 bg-white font-medium hover:bg-black/5"
            onClick={() => handleOAuthSignUp('oauth_google')}
            disabled={isOAuthLoading !== null}
          >
            {isOAuthLoading === 'google' ? <Spinner className="h-5 w-5" /> : <GoogleIcon />}
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full gap-3 border-black/10 bg-white font-medium hover:bg-black/5"
            onClick={() => handleOAuthSignUp('oauth_github')}
            disabled={isOAuthLoading !== null}
          >
            {isOAuthLoading === 'github' ? <Spinner className="h-5 w-5" /> : <GitHubIcon />}
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-cream text-text-secondary-65 px-2">or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username" className="text-text-primary text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <User className="text-text-secondary-65 absolute top-2.5 left-3 h-4 w-4" />
              <Input
                id="username"
                placeholder="Choose a username"
                className="focus:border-brand-blue focus:ring-brand-blue/20 border-black/10 bg-white pl-9"
                {...register('username', {
                  required: 'Username is required',
                })}
              />
            </div>
            {errors.username && (
              <p className="text-brand-pink-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email" className="text-text-primary text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="text-text-secondary-65 absolute top-2.5 left-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="focus:border-brand-blue focus:ring-brand-blue/20 border-black/10 bg-white pl-9"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
              />
            </div>
            {errors.email && <p className="text-brand-pink-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password" className="text-text-primary text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="text-text-secondary-65 absolute top-2.5 left-3 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="focus:border-brand-blue focus:ring-brand-blue/20 border-black/10 bg-white pr-10 pl-9"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-text-secondary-65 hover:text-text-primary absolute top-2.5 right-3 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-brand-pink-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="bg-brand-pink-500 hover:bg-brand-pink-600 mt-2 w-full font-medium text-white"
            disabled={isFormSubmit}
          >
            {isFormSubmit ? <Spinner /> : 'Create Account'}
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-text-secondary-65 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/sign-in"
            className="text-brand-pink-500 hover:text-brand-pink-600 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
