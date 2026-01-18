import { Spinner } from '@/components/ui/spinner';
import { AuthBranding, SignInForm } from './auth/components';
import { useSignInLogic } from './auth/hooks';

const SignIn = () => {
  const { isLoaded } = useSignInLogic();

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
        title="Where stories branch"
        subtitle="into infinite possibilities"
        description="Join thousands of writers creating collaborative, branching narratives that evolve with every contribution."
      />
      <SignInForm />
    </div>
  );
};

export default SignIn;
