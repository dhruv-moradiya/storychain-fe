# Suspense & Lazy Loading Best Practices

## Current Issues in StoryChain

After analyzing your codebase, here are the problems:

### Issue 1: Inconsistent Fallbacks

```tsx
// Current - inconsistent, ugly fallbacks
<Suspense fallback={<div>Loading...</div>}>        // Plain text
<Suspense fallback={<div>Loading story...</div>}>  // Plain text
<Suspense fallback={<PageLoader text="..." />}>    // Only one uses PageLoader
```

**Problem:** Users see ugly "Loading..." text instead of polished UI.

---

### Issue 2: No Error Boundaries

```tsx
// Current - no error handling
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent /> // If this fails, entire app crashes
</Suspense>
```

**Problem:** If lazy loading fails (network error), the app crashes with no recovery option.

---

### Issue 3: Suspense on Every Route

```tsx
// Current - repetitive Suspense wrappers
{
  path: '/dashboard',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  ),
},
{
  path: '/stories',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Story />
    </Suspense>
  ),
},
// ... repeated for every route
```

**Problem:** Boilerplate code, hard to maintain, inconsistent fallbacks.

---

### Issue 4: Profile Not Lazy Loaded

```tsx
// Current
import Profile from './pages/profile'; // Not lazy - increases initial bundle

const Dashboard = lazy(() => import('./pages/dashboard')); // Lazy - good
```

**Problem:** Profile page is bundled with initial load, increasing bundle size.

---

### Issue 5: No Skeleton Loaders

```tsx
// Current - text-based fallbacks
<Suspense fallback={<div>Loading dashboard...</div>}>

// Should be - skeleton that matches page layout
<Suspense fallback={<DashboardSkeleton />}>
```

**Problem:** Users see jarring text instead of smooth skeleton placeholders.

---

## The Solution Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PROPER SUSPENSE ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────────┘

                         App Root
                            │
                    ┌───────┴───────┐
                    │ ErrorBoundary │ ← Catches all errors
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │   Suspense    │ ← Root fallback (full page loader)
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │    Router     │
                    └───────┬───────┘
                            │
           ┌────────────────┼────────────────┐
           │                │                │
    ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐
    │ ErrorBoundary│  │ ErrorBoundary│  │ ErrorBoundary│
    │ + Suspense  │  │ + Suspense  │  │ + Suspense  │
    │ (Dashboard) │  │ (Stories)   │  │ (Profile)   │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
    ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐
    │ Dashboard   │  │ Stories     │  │ Profile     │
    │ (lazy)      │  │ (lazy)      │  │ (lazy)      │
    └─────────────┘  └─────────────┘  └─────────────┘
```

---

## Implementation

### Step 1: Create Error Boundary Component

```tsx
// src/components/error-boundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="bg-destructive/10 rounded-full p-4">
            <AlertTriangle className="text-destructive h-8 w-8" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={this.handleRetry} variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline">
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

### Step 2: Create Skeleton Components

```tsx
// src/components/skeletons/page-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Generic page skeleton - use when no specific skeleton exists
 */
export function PageSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Dashboard skeleton - matches dashboard layout
 */
export function DashboardSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2 rounded-lg border p-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Content cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3 rounded-lg border p-4">
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Story page skeleton
 */
export function StorySkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Story header */}
      <div className="flex gap-6">
        <Skeleton className="h-48 w-36 rounded-lg" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-8 w-24" />
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 rounded-lg border p-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Chapter read skeleton
 */
export function ChapterSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Title */}
      <Skeleton className="mx-auto h-10 w-2/3" />

      {/* Meta */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Content paragraphs */}
      <div className="mt-8 space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Story builder skeleton
 */
export function StoryBuilderSkeleton() {
  return (
    <div className="flex h-screen flex-col">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-8 w-8 rounded" />
        ))}
        <div className="flex-1" />
        <Skeleton className="h-8 w-24 rounded" />
      </div>

      {/* Editor */}
      <div className="mx-auto w-full max-w-4xl flex-1 p-8">
        <Skeleton className="mb-6 h-10 w-1/2" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton
              key={i}
              className="h-4 w-full"
              style={{ width: `${100 - Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex justify-between border-t p-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

/**
 * Auth page skeleton
 */
export function AuthSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-8 w-32" />
          <Skeleton className="mx-auto h-4 w-48" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="mx-auto h-4 w-48" />
      </div>
    </div>
  );
}

/**
 * Profile skeleton
 */
export function ProfileSkeleton() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1 text-center">
            <Skeleton className="mx-auto h-6 w-12" />
            <Skeleton className="mx-auto h-4 w-16" />
          </div>
        ))}
      </div>

      {/* Tabs + Content */}
      <div className="space-y-4">
        <div className="flex gap-2 border-b pb-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### Step 3: Create Suspense Wrapper Component

```tsx
// src/components/suspense-wrapper.tsx
import { Suspense, ReactNode } from 'react';
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
```

---

### Step 4: Create Lazy Route Helper

```tsx
// src/lib/lazy-route.tsx
import { lazy, ComponentType } from 'react';
import { SuspenseWrapper } from '@/components/suspense-wrapper';
import {
  PageSkeleton,
  DashboardSkeleton,
  StorySkeleton,
  ChapterSkeleton,
  StoryBuilderSkeleton,
  AuthSkeleton,
  ProfileSkeleton,
} from '@/components/skeletons/page-skeleton';

type SkeletonType =
  | 'page'
  | 'dashboard'
  | 'story'
  | 'chapter'
  | 'storyBuilder'
  | 'auth'
  | 'profile';

const skeletonMap: Record<SkeletonType, ComponentType> = {
  page: PageSkeleton,
  dashboard: DashboardSkeleton,
  story: StorySkeleton,
  chapter: ChapterSkeleton,
  storyBuilder: StoryBuilderSkeleton,
  auth: AuthSkeleton,
  profile: ProfileSkeleton,
};

/**
 * Creates a lazy-loaded route element with proper Suspense + ErrorBoundary
 *
 * @param importFn - Dynamic import function
 * @param skeleton - Which skeleton to show while loading
 *
 * @example
 * const Dashboard = lazyRoute(() => import('./pages/dashboard'), 'dashboard');
 */
export function lazyRoute<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  skeleton: SkeletonType = 'page'
) {
  const LazyComponent = lazy(importFn);
  const SkeletonComponent = skeletonMap[skeleton];

  // Return a wrapper component
  return function LazyRouteWrapper(props: any) {
    return (
      <SuspenseWrapper fallback={<SkeletonComponent />}>
        <LazyComponent {...props} />
      </SuspenseWrapper>
    );
  };
}

/**
 * Alternative: Creates just the lazy component (for more control)
 */
export function lazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(importFn);
}
```

---

### Step 5: Refactor App.tsx

```tsx
// src/App.tsx
import { createBrowserRouter, Navigate } from 'react-router';
import { lazyRoute } from '@/lib/lazy-route';
import { ProtectedRoute } from '@/components/protected-route';
import { ErrorBoundary } from '@/components/error-boundary';

// ============================================
// LAZY LOADED PAGES WITH PROPER SKELETONS
// ============================================

const Home = lazyRoute(() => import('./pages/home'), 'page');
const Dashboard = lazyRoute(() => import('./pages/dashboard'), 'dashboard');
const Story = lazyRoute(() => import('./pages/stories'), 'story');
const StoryBuilder = lazyRoute(() => import('./pages/story-builder'), 'storyBuilder');
const ChapterRead = lazyRoute(() => import('./pages/chapter-read'), 'chapter');
const Profile = lazyRoute(() => import('./pages/profile'), 'profile');
const Reports = lazyRoute(() => import('./pages/reports'), 'dashboard');
const Appeals = lazyRoute(() => import('./pages/appeals'), 'dashboard');
const SignUp = lazyRoute(() => import('./pages/sign-up'), 'auth');
const SignIn = lazyRoute(() => import('./pages/sign-in'), 'auth');

// Layout is small, can be lazy loaded with simple skeleton
const Layout = lazyRoute(() => import('./layout/layout'), 'page');

// ============================================
// ROUTER CONFIGURATION
// ============================================

export const router = createBrowserRouter([
  // Protected Routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: (
      <ErrorBoundary>
        <div>Route Error</div>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard/*',
        element: <Dashboard />,
      },
      {
        path: 'stories/:slug/*',
        element: <Story />,
      },
      {
        path: 'stories/:storyId/chapter/:chapterId',
        element: <ChapterRead />,
      },
      {
        path: 'stories/:storyId/chapter/:chapterId/new',
        element: <StoryBuilder />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'appeals',
        element: <Appeals />,
      },
    ],
  },

  // Public Routes
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
```

---

### Step 6: Update Main Entry with Root Error Boundary

```tsx
// src/main.tsx
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'sonner';

import { router } from './App';
import { ErrorBoundary } from './components/error-boundary';
import { PageSkeleton } from './components/skeletons/page-skeleton';
import './index.css';

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
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Suspense fallback={<PageSkeleton />}>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster richColors />
        </ClerkProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
```

---

## Advanced Patterns

### Pattern 1: Preloading Routes on Hover

```tsx
// src/lib/preload.ts

/**
 * Preload a lazy component when user hovers over a link
 */
export function preloadComponent(importFn: () => Promise<any>) {
  return () => {
    importFn(); // Triggers the import
  };
}

// Usage in a navigation component
import { preloadComponent } from '@/lib/preload';

function NavLink({ to, children, importFn }) {
  return (
    <Link to={to} onMouseEnter={preloadComponent(importFn)} onFocus={preloadComponent(importFn)}>
      {children}
    </Link>
  );
}

// Example
<NavLink to="/dashboard" importFn={() => import('./pages/dashboard')}>
  Dashboard
</NavLink>;
```

---

### Pattern 2: Route-Based Preloading

```tsx
// src/lib/route-preloader.ts

const routeImports = {
  dashboard: () => import('./pages/dashboard'),
  stories: () => import('./pages/stories'),
  profile: () => import('./pages/profile'),
  storyBuilder: () => import('./pages/story-builder'),
};

/**
 * Preload routes that user is likely to visit next
 */
export function preloadRoutes(routes: (keyof typeof routeImports)[]) {
  routes.forEach((route) => {
    routeImports[route]?.();
  });
}

// Usage: Preload dashboard-related routes after login
useEffect(() => {
  if (isSignedIn) {
    preloadRoutes(['dashboard', 'stories', 'profile']);
  }
}, [isSignedIn]);
```

---

### Pattern 3: Intersection Observer Preloading

```tsx
// src/hooks/usePreloadOnVisible.ts
import { useEffect, useRef } from 'react';

/**
 * Preload a component when element becomes visible
 */
export function usePreloadOnVisible(importFn: () => Promise<any>) {
  const ref = useRef<HTMLElement>(null);
  const hasPreloaded = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPreloaded.current) {
          importFn();
          hasPreloaded.current = true;
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Preload 100px before visible
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [importFn]);

  return ref;
}

// Usage
function StoryCard({ story }) {
  const preloadRef = usePreloadOnVisible(() => import('./pages/chapter-read'));

  return (
    <div ref={preloadRef}>
      <Link to={`/stories/${story.id}`}>{story.title}</Link>
    </div>
  );
}
```

---

### Pattern 4: Nested Suspense for Sections

```tsx
// src/pages/dashboard.tsx
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { SuspenseWrapper } from '@/components/suspense-wrapper';

// Lazy load dashboard sections (smaller chunks)
const StoriesSection = lazy(() => import('@/components/dashboard/sections/stories-section'));
const ChaptersSection = lazy(() => import('@/components/dashboard/sections/my-chapters-section'));
const NotificationSection = lazy(
  () => import('@/components/dashboard/sections/notification-section')
);

// Section-specific skeletons
function SectionSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <DashboardTabs />

      <div className="mt-6">
        <Routes>
          <Route path="/" element={<Navigate to="stories" />} />

          <Route
            path="stories"
            element={
              <SuspenseWrapper fallback={<SectionSkeleton />}>
                <StoriesSection />
              </SuspenseWrapper>
            }
          />

          <Route
            path="my-chapters"
            element={
              <SuspenseWrapper fallback={<SectionSkeleton />}>
                <ChaptersSection />
              </SuspenseWrapper>
            }
          />

          <Route
            path="notification"
            element={
              <SuspenseWrapper fallback={<SectionSkeleton />}>
                <NotificationSection />
              </SuspenseWrapper>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
```

---

### Pattern 5: Retry Lazy Loading on Error

```tsx
// src/lib/lazy-with-retry.ts

/**
 * Lazy load with automatic retry on failure
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries = 3,
  delay = 1000
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | undefined;

    for (let i = 0; i < retries; i++) {
      try {
        return await importFn();
      } catch (error) {
        lastError = error as Error;
        console.warn(`Lazy load failed (attempt ${i + 1}/${retries}):`, error);

        if (i < retries - 1) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));

          // Clear module cache to retry fresh
          // This helps when the error was due to a deployment
          if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));
          }
        }
      }
    }

    throw lastError;
  });
}

// Usage
const Dashboard = lazyWithRetry(() => import('./pages/dashboard'));
```

---

## File Structure

```
src/
├── components/
│   ├── error-boundary.tsx          # Error boundary component
│   ├── suspense-wrapper.tsx        # Suspense + ErrorBoundary combo
│   └── skeletons/
│       └── page-skeleton.tsx       # All skeleton components
├── lib/
│   ├── lazy-route.tsx              # Lazy route helper
│   ├── lazy-with-retry.ts          # Retry logic for lazy loading
│   └── preload.ts                  # Preloading utilities
├── hooks/
│   └── usePreloadOnVisible.ts      # Intersection observer preloading
├── pages/
│   └── ... (all lazy-loaded)
├── App.tsx                         # Clean router config
└── main.tsx                        # Root error boundary + suspense
```

---

## Before vs After

### Before (Current)

```tsx
// Inconsistent, no error handling, ugly fallbacks
<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
<Suspense fallback={<div>Loading story...</div>}>
  <Story />
</Suspense>
```

### After (Improved)

```tsx
// Consistent, error handling, beautiful skeletons
const Dashboard = lazyRoute(() => import('./pages/dashboard'), 'dashboard');
const Story = lazyRoute(() => import('./pages/stories'), 'story');

// In router - clean, no Suspense wrappers needed
{ path: 'dashboard/*', element: <Dashboard /> }
{ path: 'stories/:slug/*', element: <Story /> }
```

---

## Checklist

### Must Have

- [x] Create ErrorBoundary component
- [x] Create skeleton components for each page type
- [x] Create SuspenseWrapper component
- [x] Create lazyRoute helper
- [x] Refactor App.tsx to use lazyRoute
- [x] Add root ErrorBoundary in main.tsx
- [x] Lazy load Profile page (currently not lazy)

### Nice to Have

- [ ] Add preloading on hover for navigation links
- [ ] Add route preloading after login
- [ ] Add intersection observer preloading for cards
- [ ] Add retry logic for lazy loading failures
- [ ] Add analytics for lazy load failures

---

## Summary

| Aspect              | Before                    | After                       |
| ------------------- | ------------------------- | --------------------------- |
| **Fallbacks**       | Plain text divs           | Matching skeleton UI        |
| **Error Handling**  | None (app crashes)        | ErrorBoundary with retry    |
| **Boilerplate**     | Suspense on every route   | lazyRoute helper            |
| **Profile Page**    | Not lazy loaded           | Lazy loaded                 |
| **Consistency**     | Different fallbacks       | Unified approach            |
| **User Experience** | Jarring "Loading..." text | Smooth skeleton transitions |

The key insight: **Suspense without ErrorBoundary is incomplete.** Always wrap lazy components with both.
