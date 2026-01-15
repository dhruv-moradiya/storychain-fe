import { useState, useCallback } from 'react';
import { useSignUp as useClerkSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { SubmitHandler } from 'react-hook-form';
import type { SignUpFormData, OAuthStrategy, OAuthProvider, ClerkAPIError } from '../auth.types';

function isClerkAPIError(error: unknown): error is ClerkAPIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as { errors: unknown }).errors)
  );
}

export function useSignUpLogic() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isOAuthLoading, setIsOAuthLoading] = useState<OAuthProvider | null>(null);

  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useClerkSignUp();

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const goBackToForm = useCallback(() => {
    setIsVerifying(false);
  }, []);

  const onSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (data) => {
      if (!isLoaded || !signUp) return;

      try {
        setIsFormSubmit(true);

        await signUp.create({
          username: data.username,
          emailAddress: data.email,
          password: data.password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        });

        toast.success('Verification email sent!', {
          position: 'top-center',
        });

        setIsVerifying(true);
      } catch (error: unknown) {
        console.error('Signup error:', error);

        if (isClerkAPIError(error)) {
          const message = error.errors.map((e) => e.message).join(', ');
          toast.error(message, { position: 'top-center' });
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      } finally {
        setIsFormSubmit(false);
      }
    },
    [isLoaded, signUp]
  );

  const handleVerify = useCallback(async () => {
    if (!isLoaded || !signUp || otpCode.length !== 6) {
      toast.error('Please enter the full 6-digit code');
      return;
    }

    try {
      setIsFormSubmit(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success('Email verified successfully!', {
          position: 'top-center',
        });

        navigate('/');
      } else {
        toast.error('Verification failed. Try again.');
      }
    } catch (error: unknown) {
      console.error('Verification error:', error);

      if (isClerkAPIError(error)) {
        const message = error.errors.map((e) => e.message).join(', ');
        toast.error(message, { position: 'top-center' });
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsFormSubmit(false);
    }
  }, [isLoaded, signUp, otpCode, setActive, navigate]);

  const handleResendCode = useCallback(async () => {
    if (!isLoaded || !signUp) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      toast.success('New code sent!', { position: 'top-center' });
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend code');
    }
  }, [isLoaded, signUp]);

  const handleOAuthSignUp = useCallback(
    async (strategy: OAuthStrategy) => {
      if (!isLoaded || !signUp) return;

      try {
        setIsOAuthLoading(strategy === 'oauth_github' ? 'github' : 'google');
        await signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/',
        });
      } catch (error) {
        console.error('OAuth error:', error);
        toast.error('OAuth sign-up failed', { position: 'top-center' });
        setIsOAuthLoading(null);
      }
    },
    [isLoaded, signUp]
  );

  return {
    // State
    isLoaded,
    showPassword,
    isFormSubmit,
    isVerifying,
    otpCode,
    isOAuthLoading,

    // Actions
    togglePassword,
    goBackToForm,
    onSubmit,
    handleVerify,
    handleResendCode,
    handleOAuthSignUp,
    setOtpCode,
  };
}
