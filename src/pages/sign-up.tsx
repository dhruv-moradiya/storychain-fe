import { Spinner } from '@/components/ui/spinner';
import { AuthBranding, SignUpForm } from './auth/components';
import { useSignUpLogic } from './auth/hooks';

export default function SignUp() {
  const { isLoaded } = useSignUpLogic();

  if (!isLoaded) {
    return (
      <div className="bg-bg-cream flex h-screen w-screen items-center justify-center gap-2 text-sm">
        <Spinner /> Loading...
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <AuthBranding
        title="Start your journey"
        subtitle="as a storyteller"
        description="Create an account and join a community of writers crafting stories together. Your words can shape entire universes."
      />
      <SignUpForm />
    </div>
  );
}
