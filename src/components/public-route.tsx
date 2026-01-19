import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  // Redirect authenticated users to home page
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
