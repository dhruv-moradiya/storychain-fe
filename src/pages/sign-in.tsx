import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { Mail, Lock, Eye, EyeOff, BookOpen, GitBranch, Users, Sparkles } from 'lucide-react';

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

// GitHub Icon Component
const GitHubIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Google Icon Component
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Feature Item Component
const FeatureItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-3"
  >
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
      <Icon className="h-5 w-5 text-white/80" />
    </div>
    <div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  </motion.div>
);

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<'github' | 'google' | null>(null);

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

  const handleOAuthSignIn = async (strategy: 'oauth_github' | 'oauth_google') => {
    if (!isLoaded) return;

    try {
      setIsOAuthLoading(strategy === 'oauth_github' ? 'github' : 'google');
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (error) {
      console.error('OAuth error:', error);
      toast.error('OAuth sign-in failed', { position: 'top-center' });
      setIsOAuthLoading(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="bg-bg-cream flex h-screen w-screen items-center justify-center gap-2 text-sm">
        <Spinner /> Loading...
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div
        className="relative hidden items-center justify-center overflow-hidden lg:flex"
        style={{
          background:
            'linear-gradient(135deg, var(--hero-gradient-from), var(--hero-gradient-via1), var(--hero-gradient-via2))',
        }}
      >
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: 'var(--brand-pink-500)' }}
          />
          <div
            className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full opacity-15 blur-3xl"
            style={{ background: 'var(--brand-blue)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2"
          >
            <div className="bg-brand-pink-500 flex h-10 w-10 items-center justify-center rounded-xl">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">Story Chain</span>
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-libreBaskerville mb-4 text-3xl leading-tight text-white"
          >
            Where stories branch
            <br />
            into infinite possibilities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 font-mono text-sm leading-relaxed text-white/70"
          >
            Join thousands of writers creating collaborative, branching narratives that evolve with
            every contribution.
          </motion.p>

          {/* Features */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FeatureItem
                icon={GitBranch}
                title="Branching Narratives"
                description="Create stories that split into multiple paths"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FeatureItem
                icon={Users}
                title="Collaborative Writing"
                description="Write together with authors worldwide"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FeatureItem
                icon={Sparkles}
                title="Community Driven"
                description="Vote and shape the direction of stories"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="bg-bg-cream flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-6">
          {/* Mobile Logo */}
          <div className="mb-4 flex items-center justify-center gap-2 lg:hidden">
            <div className="bg-brand-pink-500 flex h-9 w-9 items-center justify-center rounded-xl">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-text-primary text-lg font-semibold">Story Chain</span>
          </div>

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
              <span className="bg-bg-cream text-text-secondary-65 px-2">
                or continue with email
              </span>
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
              {errors.email && (
                <p className="text-brand-pink-500 text-xs">{errors.email.message}</p>
              )}
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
                  placeholder="Enter your password"
                  className="focus:border-brand-blue focus:ring-brand-blue/20 border-black/10 bg-white pr-10 pl-9"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
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
      </div>
    </div>
  );
};

export default SignIn;
