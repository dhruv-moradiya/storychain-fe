import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Mail, Lock, Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { GitHubIcon, GoogleIcon } from './auth-icons';
import { MobileLogo } from './auth-branding';
import { useSignInLogic } from '../hooks';
import type { SignInFormData, ForgotPasswordFormData, ResetPasswordFormData } from '../auth.types';

export function SignInForm() {
  const {
    showPassword,
    isFormSubmit,
    isOAuthLoading,
    togglePassword,
    onSubmit,
    handleOAuthSignIn,
    // Forgot password
    forgotPasswordOpen,
    forgotPasswordStep,
    forgotPasswordLoading,
    resetEmail,
    openForgotPassword,
    closeForgotPassword,
    handleForgotPasswordSubmit,
    handleResetPasswordSubmit,
  } = useSignInLogic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  // Forgot password form
  const forgotPasswordForm = useForm<ForgotPasswordFormData>();
  const resetPasswordForm = useForm<ResetPasswordFormData>();

  return (
    <div className="bg-bg-cream flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-6">
        <MobileLogo />

        <div className="space-y-2 text-center">
          <h2 className="text-text-primary text-2xl font-semibold">Welcome back</h2>
          <p className="text-text-secondary-65 text-sm">Sign in to continue your story</p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full gap-3 border-black/10 bg-white font-medium hover:bg-black/5"
            onClick={() => handleOAuthSignIn('oauth_google')}
            disabled={isOAuthLoading !== null}
          >
            {isOAuthLoading === 'google' ? <Spinner className="h-5 w-5" /> : <GoogleIcon />}
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full gap-3 border-black/10 bg-white font-medium hover:bg-black/5"
            onClick={() => handleOAuthSignIn('oauth_github')}
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
                })}
              />
            </div>
            {errors.email && <p className="text-brand-pink-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-text-primary text-sm font-medium">
                Password
              </Label>
              <button
                type="button"
                onClick={openForgotPassword}
                className="text-brand-pink-500 hover:text-brand-pink-600 text-xs font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="text-text-secondary-65 absolute top-2.5 left-3 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="focus:border-brand-blue focus:ring-brand-blue/20 border-black/10 bg-white pr-10 pl-9"
                {...register('password', {
                  required: 'Password is required',
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
            {isFormSubmit ? <Spinner /> : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-text-secondary-65 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/sign-up"
            className="text-brand-pink-500 hover:text-brand-pink-600 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Forgot Password Dialog */}
      <ResponsiveDialog open={forgotPasswordOpen} onOpenChange={closeForgotPassword}>
        <ResponsiveDialogContent
          className="bg-bg-cream border-border/50 sm:max-w-md"
          sheetHeight="auto"
        >
          {forgotPasswordStep === 'email' && (
            <>
              <ResponsiveDialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
                    <KeyRound className="text-brand-pink-500 h-5 w-5" />
                  </div>
                  <div>
                    <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
                      Forgot Password
                    </ResponsiveDialogTitle>
                    <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
                      Enter your email to receive a reset code
                    </ResponsiveDialogDescription>
                  </div>
                </div>
              </ResponsiveDialogHeader>

              <form
                onSubmit={forgotPasswordForm.handleSubmit(handleForgotPasswordSubmit)}
                className="space-y-4 py-4"
              >
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="reset-email" className="text-text-primary text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="text-text-secondary-65 absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white pl-9"
                      {...forgotPasswordForm.register('email', {
                        required: 'Email is required',
                      })}
                    />
                  </div>
                  {forgotPasswordForm.formState.errors.email && (
                    <p className="text-brand-pink-500 text-xs">
                      {forgotPasswordForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <ResponsiveDialogFooter className="gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeForgotPassword}
                    className="border-border text-text-secondary hover:bg-muted/50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={forgotPasswordLoading}
                    className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white"
                  >
                    {forgotPasswordLoading ? <Spinner /> : 'Send Reset Code'}
                  </Button>
                </ResponsiveDialogFooter>
              </form>
            </>
          )}

          {forgotPasswordStep === 'code' && (
            <>
              <ResponsiveDialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
                    <KeyRound className="text-brand-pink-500 h-5 w-5" />
                  </div>
                  <div>
                    <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
                      Reset Password
                    </ResponsiveDialogTitle>
                    <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
                      Enter the code sent to {resetEmail}
                    </ResponsiveDialogDescription>
                  </div>
                </div>
              </ResponsiveDialogHeader>

              <form
                onSubmit={resetPasswordForm.handleSubmit(handleResetPasswordSubmit)}
                className="space-y-4 py-4"
              >
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-text-primary text-sm font-medium">Verification Code</Label>
                  <InputOTP
                    maxLength={6}
                    value={resetPasswordForm.watch('code') || ''}
                    onChange={(value) => resetPasswordForm.setValue('code', value)}
                  >
                    <InputOTPGroup className="w-full justify-center gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="border-black/10 bg-white"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="new-password" className="text-text-primary text-sm font-medium">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="text-text-secondary-65 absolute top-2.5 left-3 h-4 w-4" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white pl-9"
                      {...resetPasswordForm.register('newPassword', {
                        required: 'New password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                    />
                  </div>
                  {resetPasswordForm.formState.errors.newPassword && (
                    <p className="text-brand-pink-500 text-xs">
                      {resetPasswordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <ResponsiveDialogFooter className="gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeForgotPassword}
                    className="border-border text-text-secondary hover:bg-muted/50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={forgotPasswordLoading}
                    className="bg-brand-pink-500 hover:bg-brand-pink-600 text-white"
                  >
                    {forgotPasswordLoading ? <Spinner /> : 'Reset Password'}
                  </Button>
                </ResponsiveDialogFooter>
              </form>
            </>
          )}

          {forgotPasswordStep === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-badge-success-bg mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle2 className="text-badge-success h-8 w-8" />
              </div>
              <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
                Password Reset Successful
              </ResponsiveDialogTitle>
              <ResponsiveDialogDescription className="text-text-secondary-65 mt-2 text-sm">
                Your password has been reset. Redirecting...
              </ResponsiveDialogDescription>
            </div>
          )}
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
}
