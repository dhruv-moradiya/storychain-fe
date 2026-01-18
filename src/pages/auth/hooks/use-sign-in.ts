import { useState, useCallback } from 'react';
import { useSignIn as useClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';
import type {
  SignInFormData,
  OAuthStrategy,
  OAuthProvider,
  ClerkAPIError,
  ForgotPasswordStep,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from '../auth.types';

function isClerkAPIError(error: unknown): error is ClerkAPIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as { errors: unknown }).errors)
  );
}

export function useSignInLogic() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<OAuthProvider | null>(null);

  // Forgot password state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<ForgotPasswordStep>('email');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useClerkSignIn();

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(
    async (data) => {
      if (!isLoaded || !signIn) return;

      try {
        setIsFormSubmit(true);

        const result = await signIn.create({
          identifier: data.email,
          password: data.password,
        });

        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          toast.success('Signed in successfully!');
          navigate('/');
        } else {
          toast.error('Login failed. Please try again.');
        }
      } catch (error) {
        console.error('Sign-in error:', error);

        if (isClerkAPIError(error)) {
          const errorMessage = error.errors.map((e) => e.message).join(', ');
          toast.error(errorMessage);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Something went wrong');
        }
      } finally {
        setIsFormSubmit(false);
      }
    },
    [isLoaded, signIn, setActive, navigate]
  );

  const handleOAuthSignIn = useCallback(
    async (strategy: OAuthStrategy) => {
      if (!isLoaded || !signIn) return;

      try {
        setIsOAuthLoading(strategy === 'oauth_github' ? 'github' : 'google');
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/',
        });
      } catch (error) {
        console.error('OAuth error:', error);
        toast.error('OAuth sign-in failed');
        setIsOAuthLoading(null);
      }
    },
    [isLoaded, signIn]
  );

  // Forgot password - send reset code
  const handleForgotPasswordSubmit: SubmitHandler<ForgotPasswordFormData> = useCallback(
    async (data) => {
      if (!isLoaded || !signIn) return;

      try {
        setForgotPasswordLoading(true);
        setResetEmail(data.email);

        await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: data.email,
        });

        setForgotPasswordStep('code');
        toast.success('Reset code sent to your email');
      } catch (error) {
        console.error('Forgot password error:', error);

        if (isClerkAPIError(error)) {
          const errorMessage = error.errors.map((e) => e.message).join(', ');
          toast.error(errorMessage);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Failed to send reset code');
        }
      } finally {
        setForgotPasswordLoading(false);
      }
    },
    [isLoaded, signIn]
  );

  // Forgot password - verify code and set new password
  const handleResetPasswordSubmit: SubmitHandler<ResetPasswordFormData> = useCallback(
    async (data) => {
      if (!isLoaded || !signIn) return;

      try {
        setForgotPasswordLoading(true);

        const result = await signIn.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: data.code,
          password: data.newPassword,
        });

        if (result.status === 'complete') {
          await setActive({ session: result.createdSessionId });
          setForgotPasswordStep('success');
          toast.success('Password reset successfully!');

          // Close dialog and navigate after short delay
          setTimeout(() => {
            setForgotPasswordOpen(false);
            setForgotPasswordStep('email');
            navigate('/');
          }, 1500);
        } else {
          toast.error('Password reset failed. Please try again.');
        }
      } catch (error) {
        console.error('Reset password error:', error);

        if (isClerkAPIError(error)) {
          const errorMessage = error.errors.map((e) => e.message).join(', ');
          toast.error(errorMessage);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Failed to reset password');
        }
      } finally {
        setForgotPasswordLoading(false);
      }
    },
    [isLoaded, signIn, setActive, navigate]
  );

  // Reset forgot password dialog state
  const openForgotPassword = useCallback(() => {
    setForgotPasswordStep('email');
    setResetEmail('');
    setForgotPasswordOpen(true);
  }, []);

  const closeForgotPassword = useCallback(() => {
    setForgotPasswordOpen(false);
    setForgotPasswordStep('email');
    setResetEmail('');
  }, []);

  return {
    // State
    isLoaded,
    showPassword,
    isFormSubmit,
    isOAuthLoading,

    // Forgot password state
    forgotPasswordOpen,
    forgotPasswordStep,
    forgotPasswordLoading,
    resetEmail,

    // Actions
    togglePassword,
    onSubmit,
    handleOAuthSignIn,

    // Forgot password actions
    openForgotPassword,
    closeForgotPassword,
    handleForgotPasswordSubmit,
    handleResetPasswordSubmit,
  };
}
