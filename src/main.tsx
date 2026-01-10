import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';

import { router } from './App';
import { ErrorBoundary } from './components/error-boundary';
import { PageSkeleton } from './components/skeletons/page-skeleton';
import './index.css';
import { ToastProvider } from './components/common/toast';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

// Root error fallback for catastrophic failures
function RootErrorFallback() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="space-y-4 p-8 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">We're sorry, but something unexpected happened.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2"
        >
          Reload Application
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<RootErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Suspense fallback={<PageSkeleton />}>
              <RouterProvider router={router} />
            </Suspense>
          </ClerkProvider>
        </ToastProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
