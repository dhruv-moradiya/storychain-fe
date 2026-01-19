import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) return null;

  // Allow home page for both authenticated and unauthenticated users
  const isHomePage = location.pathname === '/';
  if (isHomePage) {
    return <>{children}</>;
  }

  // For all other protected routes, redirect to sign-up if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-up" replace />;
  }

  return <>{children}</>;
};
