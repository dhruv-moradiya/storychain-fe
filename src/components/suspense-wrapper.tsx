import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from './error-boundary';
import { PageSkeleton } from './skeletons/page-skeleton';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
  onError?: (error: Error) => void;
}

/**
 * Combines ErrorBoundary + Suspense for lazy-loaded components
 * Use this instead of raw Suspense
 */
export function SuspenseWrapper({
  children,
  fallback = <PageSkeleton />,
  errorFallback,
  onError,
}: SuspenseWrapperProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
