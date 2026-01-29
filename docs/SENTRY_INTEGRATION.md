# Sentry Integration Guide for StoryChain

> A comprehensive guide to integrating Sentry error monitoring into your React + Vite application.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Core Integration](#core-integration)
6. [Advanced Features](#advanced-features)
7. [Environment Setup](#environment-setup)
8. [Testing](#testing)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Sentry?

Sentry is an application monitoring platform that helps you identify, triage, and resolve errors and performance issues in real-time.

### Why Sentry for StoryChain?

| Current State | With Sentry |
|--------------|-------------|
| `console.error()` logging | Centralized error tracking |
| No error context | Full stack traces with context |
| Manual debugging | Automatic issue grouping |
| No performance insights | Transaction tracing |
| No user impact metrics | User session tracking |

### Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                      StoryChain App                         │
├─────────────────────────────────────────────────────────────┤
│  main.tsx          → Sentry.init()                         │
│  error-boundary    → Sentry.ErrorBoundary                  │
│  axiosInspector    → HTTP error capture                    │
│  React Query       → Mutation/Query error tracking         │
│  React Router      → Route change tracking                 │
│  Clerk Auth        → User context attachment               │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

Before starting, ensure you have:

- [ ] A Sentry account ([Sign up free](https://sentry.io/signup/))
- [ ] A Sentry project created (select **React** as platform)
- [ ] Your Sentry DSN (found in Project Settings → Client Keys)

---

## Installation

### Step 1: Install Sentry Packages

```bash
npm install @sentry/react
```

### Step 2: Install Sentry Vite Plugin (for Source Maps)

```bash
npm install @sentry/vite-plugin --save-dev
```

### Package Versions (Recommended)

```json
{
  "dependencies": {
    "@sentry/react": "^8.x.x"
  },
  "devDependencies": {
    "@sentry/vite-plugin": "^2.x.x"
  }
}
```

---

## Configuration

### Step 1: Environment Variables

Add to your `.env` file:

```env
# Sentry Configuration
VITE_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/1234567
VITE_SENTRY_ENVIRONMENT=development
VITE_SENTRY_RELEASE=storychain@1.0.0
```

Add to `.env.production`:

```env
VITE_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/1234567
VITE_SENTRY_ENVIRONMENT=production
VITE_SENTRY_RELEASE=storychain@1.0.0
```

### Step 2: Update `.env.example`

```env
# Existing
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=

# Sentry (add these)
VITE_SENTRY_DSN=
VITE_SENTRY_ENVIRONMENT=development
VITE_SENTRY_RELEASE=
```

### Step 3: Add to `.gitignore`

```gitignore
# Sentry
.sentryclirc
```

---

## Core Integration

### Step 1: Create Sentry Configuration File

Create `src/lib/sentry.ts`:

```typescript
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development',
    release: import.meta.env.VITE_SENTRY_RELEASE,

    // Performance Monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in prod, 100% in dev

    // Session Replay (optional)
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Integration Options
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],

    // Filter out non-critical errors
    beforeSend(event, hint) {
      // Ignore specific errors
      const error = hint.originalException as Error;
      if (error?.message?.includes('ResizeObserver loop')) {
        return null;
      }

      // Don't send errors in development (optional)
      if (import.meta.env.DEV) {
        console.log('[Sentry] Would send:', event);
        return null; // Remove this line to send errors in dev
      }

      return event;
    },

    // Sensitive data scrubbing
    beforeSendTransaction(event) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
      }
      return event;
    },
  });
};

// Re-export Sentry for use throughout the app
export { Sentry };
```

**Note:** You'll need to import React Router hooks. Update the imports:

```typescript
import * as Sentry from '@sentry/react';
import React from 'react';
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
```

### Step 2: Update `main.tsx`

Update `src/main.tsx`:

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { initSentry } from './lib/sentry';
import App from './App';
import './index.css';

// Initialize Sentry BEFORE rendering
initSentry();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
);
```

### Step 3: Update Error Boundary

Update `src/components/error-boundary.tsx`:

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Send to Sentry with additional context
    Sentry.withScope((scope) => {
      scope.setTag('error_boundary', 'true');
      scope.setContext('react', {
        componentStack: errorInfo.componentStack,
      });

      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });

    // Keep console logging for development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, eventId: null });
  };

  handleReportFeedback = (): void => {
    if (this.state.eventId) {
      Sentry.showReportDialog({ eventId: this.state.eventId });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Something went wrong
                </h2>
                <p className="text-sm text-muted-foreground">
                  An unexpected error occurred
                </p>
              </div>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-4 rounded-md bg-muted p-3">
                <p className="font-mono text-xs text-muted-foreground">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button onClick={this.handleReset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload page
              </Button>

              <Button
                variant="ghost"
                onClick={() => (window.location.href = '/')}
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to homepage
              </Button>

              {this.state.eventId && (
                <Button
                  variant="link"
                  onClick={this.handleReportFeedback}
                  className="w-full text-sm"
                >
                  Report this issue
                </Button>
              )}
            </div>

            {this.state.eventId && (
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Error ID: {this.state.eventId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Step 4: Integrate with Axios

Update `src/lib/axiosInspector.ts`:

```typescript
import axios from 'axios';
import * as Sentry from '@sentry/react';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Add breadcrumb for request
    Sentry.addBreadcrumb({
      category: 'http',
      message: `${config.method?.toUpperCase()} ${config.url}`,
      level: 'info',
      data: {
        url: config.url,
        method: config.method,
      },
    });

    // Existing token logic...
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Sentry.captureException(error, {
      tags: { type: 'request_interceptor' },
    });
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Capture HTTP errors to Sentry
    if (error.response) {
      const { status, data, config } = error.response;

      // Don't report 401s as errors (expected auth flow)
      if (status === 401) {
        Sentry.addBreadcrumb({
          category: 'auth',
          message: 'Unauthorized - redirecting to login',
          level: 'warning',
        });
        console.warn('🔒 Unauthorized → Redirecting to login');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Capture 4xx and 5xx errors
      if (status >= 400) {
        Sentry.withScope((scope) => {
          scope.setTag('http.status_code', status);
          scope.setTag('http.method', config.method);
          scope.setContext('response', {
            status,
            url: config.url,
            data: typeof data === 'string' ? data.substring(0, 500) : data,
          });

          // Only capture 5xx as errors, 4xx as warnings
          if (status >= 500) {
            Sentry.captureException(error);
          } else {
            Sentry.captureMessage(`HTTP ${status}: ${config.url}`, 'warning');
          }
        });
      }
    } else if (error.request) {
      // Network error
      Sentry.captureException(error, {
        tags: { type: 'network_error' },
      });
    }

    return Promise.reject(error);
  }
);

export default api;
```

### Step 5: Integrate with React Query

Create `src/lib/queryClient.ts` or update existing:

```typescript
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import * as Sentry from '@sentry/react';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only report errors that aren't already handled
      if (query.meta?.skipSentryCapture) return;

      Sentry.withScope((scope) => {
        scope.setTag('react_query', 'query');
        scope.setContext('query', {
          queryKey: JSON.stringify(query.queryKey),
          queryHash: query.queryHash,
        });
        Sentry.captureException(error);
      });

      // Show user-friendly error
      toast.error('Failed to fetch data. Please try again.');
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      // Only report errors that aren't already handled
      if (mutation.meta?.skipSentryCapture) return;

      Sentry.withScope((scope) => {
        scope.setTag('react_query', 'mutation');
        scope.setContext('mutation', {
          mutationKey: JSON.stringify(mutation.options.mutationKey),
          variables: JSON.stringify(variables).substring(0, 500),
        });
        Sentry.captureException(error);
      });

      // Show user-friendly error
      toast.error('Operation failed. Please try again.');
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Step 6: Add User Context from Clerk

Create `src/components/sentry-user-context.tsx`:

```typescript
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';

export const SentryUserContext = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      Sentry.setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        username: user.username || undefined,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [isSignedIn, user]);

  return null;
};
```

Add to your `App.tsx`:

```typescript
import { SentryUserContext } from './components/sentry-user-context';

function App() {
  return (
    <>
      <SentryUserContext />
      {/* Rest of your app */}
    </>
  );
}
```

---

## Advanced Features

### 1. Custom Error Tracking

```typescript
import * as Sentry from '@sentry/react';

// Track specific events
export const trackEvent = (name: string, data?: Record<string, unknown>) => {
  Sentry.addBreadcrumb({
    category: 'user_action',
    message: name,
    level: 'info',
    data,
  });
};

// Track with custom tags
export const captureError = (
  error: Error,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
) => {
  Sentry.withScope((scope) => {
    if (context?.tags) {
      Object.entries(context.tags).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    }
    if (context?.extra) {
      scope.setExtras(context.extra);
    }
    Sentry.captureException(error);
  });
};
```

### 2. Performance Monitoring

```typescript
import * as Sentry from '@sentry/react';

// Track custom transactions
export const trackTransaction = async <T>(
  name: string,
  operation: string,
  fn: () => Promise<T>
): Promise<T> => {
  return Sentry.startSpan(
    {
      name,
      op: operation,
    },
    async () => {
      return await fn();
    }
  );
};

// Usage example
const result = await trackTransaction(
  'fetch-story-details',
  'http.client',
  async () => {
    return await storyApi.getStoryBySlug(slug);
  }
);
```

### 3. Component-Level Error Boundaries

```typescript
import * as Sentry from '@sentry/react';

// Wrap specific components with Sentry error boundary
export const StoryEditorWithErrorBoundary = Sentry.withErrorBoundary(
  StoryEditor,
  {
    fallback: <StoryEditorFallback />,
    showDialog: true,
  }
);

// Or use as a component
<Sentry.ErrorBoundary
  fallback={({ error, resetError }) => (
    <ErrorFallback error={error} onReset={resetError} />
  )}
  onError={(error, componentStack) => {
    console.error('Component error:', error);
  }}
>
  <MyComponent />
</Sentry.ErrorBoundary>
```

### 4. Session Replay Configuration

```typescript
Sentry.init({
  // ... other config
  integrations: [
    Sentry.replayIntegration({
      // Mask all text content
      maskAllText: true,
      // Block all media elements
      blockAllMedia: false,
      // Mask specific selectors
      mask: ['.sensitive-data', '[data-sentry-mask]'],
      // Block specific selectors
      block: ['.video-player', '[data-sentry-block]'],
    }),
  ],
});
```

---

## Environment Setup

### Vite Configuration for Source Maps

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Sentry plugin for source maps (production only)
    sentryVitePlugin({
      org: 'your-sentry-org',
      project: 'storychain',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      sourcemaps: {
        assets: './build/**',
      },
      // Only upload in CI/production builds
      disable: process.env.NODE_ENV !== 'production',
    }),
  ],
  build: {
    sourcemap: true, // Enable source maps for Sentry
    outDir: 'build',
  },
});
```

### CI/CD Integration (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Sentry source maps
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
          VITE_SENTRY_ENVIRONMENT: production
          VITE_SENTRY_RELEASE: ${{ github.sha }}
        run: npm run build

      # Your deployment step here
```

### Vercel Integration

Add to `vercel.json`:

```json
{
  "build": {
    "env": {
      "SENTRY_AUTH_TOKEN": "@sentry-auth-token"
    }
  }
}
```

Set up environment variables in Vercel dashboard:
- `VITE_SENTRY_DSN`
- `VITE_SENTRY_ENVIRONMENT` = `production`
- `SENTRY_AUTH_TOKEN` (for source maps)

---

## Testing

### Verify Installation

Add a test button (remove after testing):

```typescript
// In any component for testing
const TestSentryButton = () => {
  const testError = () => {
    throw new Error('Test Sentry Error - Please ignore');
  };

  const testMessage = () => {
    Sentry.captureMessage('Test message from StoryChain', 'info');
  };

  return (
    <div className="flex gap-2">
      <button onClick={testError}>Test Error</button>
      <button onClick={testMessage}>Test Message</button>
    </div>
  );
};
```

### Check Sentry Dashboard

1. Go to [sentry.io](https://sentry.io) → Your Project
2. Navigate to **Issues** → Should see test error
3. Navigate to **Performance** → Should see transactions
4. Navigate to **Replays** → Should see session recordings (if enabled)

### Local Development Testing

```typescript
// In sentry.ts, modify beforeSend for dev testing:
beforeSend(event, hint) {
  if (import.meta.env.DEV) {
    console.log('[Sentry] Event captured:', {
      message: event.message,
      exception: event.exception,
      tags: event.tags,
    });
    // Return event to send to Sentry (for testing)
    // Return null to skip sending (for normal dev)
    return event;
  }
  return event;
},
```

---

## Best Practices

### 1. Error Classification

```typescript
// Use tags to classify errors
Sentry.withScope((scope) => {
  scope.setTag('feature', 'story-editor');
  scope.setTag('action', 'save-chapter');
  scope.setLevel('error');
  Sentry.captureException(error);
});
```

### 2. Sensitive Data Handling

```typescript
// Never send sensitive data
Sentry.init({
  beforeSend(event) {
    // Scrub email from user data if needed
    if (event.user?.email) {
      event.user.email = '[REDACTED]';
    }

    // Remove sensitive request data
    if (event.request?.data) {
      const data = JSON.parse(event.request.data);
      if (data.password) data.password = '[REDACTED]';
      if (data.token) data.token = '[REDACTED]';
      event.request.data = JSON.stringify(data);
    }

    return event;
  },
});
```

### 3. Performance Budget

```typescript
// Set appropriate sample rates
Sentry.init({
  // Lower sample rates for high-traffic apps
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% when errors occur
});
```

### 4. Ignore Known Issues

```typescript
Sentry.init({
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    // Common browser errors
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Network errors (if expected)
    'Network request failed',
    'Failed to fetch',
    // Clerk-specific (if expected)
    'Clerk: Failed to load',
  ],
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Firefox extensions
    /^resource:\/\//i,
  ],
});
```

### 5. Release Tracking

```bash
# In CI/CD, create releases
npx @sentry/cli releases new $GITHUB_SHA
npx @sentry/cli releases set-commits $GITHUB_SHA --auto
npx @sentry/cli releases finalize $GITHUB_SHA
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Events not appearing | Check DSN, verify `beforeSend` isn't filtering |
| Source maps not working | Verify `SENTRY_AUTH_TOKEN`, check build config |
| Too many events | Adjust sample rates, add `ignoreErrors` |
| Missing user context | Ensure `SentryUserContext` is mounted after auth |
| Performance overhead | Reduce `tracesSampleRate` |

### Debug Mode

```typescript
Sentry.init({
  debug: import.meta.env.DEV, // Enable debug logging in development
});
```

### Check Connection

```typescript
// Verify Sentry is connected
console.log('Sentry DSN:', import.meta.env.VITE_SENTRY_DSN ? 'Set' : 'Missing');
console.log('Sentry Hub:', Sentry.getCurrentHub().getClient() ? 'Connected' : 'Not connected');
```

---

## File Structure After Integration

```
src/
├── lib/
│   ├── sentry.ts           # Sentry initialization
│   ├── axiosInspector.ts   # Updated with Sentry
│   └── queryClient.ts      # React Query with Sentry
├── components/
│   ├── error-boundary.tsx  # Updated with Sentry
│   └── sentry-user-context.tsx  # User context sync
├── main.tsx                # initSentry() call
└── App.tsx                 # SentryUserContext component
```

---

## Quick Reference

### Capture Methods

```typescript
import * as Sentry from '@sentry/react';

// Capture exception
Sentry.captureException(error);

// Capture message
Sentry.captureMessage('Something happened', 'warning');

// Add breadcrumb
Sentry.addBreadcrumb({
  category: 'ui',
  message: 'User clicked button',
  level: 'info',
});

// Set user
Sentry.setUser({ id: '123', email: 'user@example.com' });

// Set tag
Sentry.setTag('page', 'dashboard');

// Set context
Sentry.setContext('story', { id: '456', title: 'My Story' });
```

---

## Resources

- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Vite Plugin](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Session Replay](https://docs.sentry.io/product/session-replay/)
- [Sentry CLI](https://docs.sentry.io/product/cli/)

---

## Summary Checklist

- [ ] Install `@sentry/react` and `@sentry/vite-plugin`
- [ ] Add environment variables
- [ ] Create `src/lib/sentry.ts`
- [ ] Initialize Sentry in `main.tsx`
- [ ] Update Error Boundary
- [ ] Add Axios interceptor integration
- [ ] Configure React Query error handling
- [ ] Add user context from Clerk
- [ ] Configure Vite for source maps
- [ ] Set up CI/CD environment variables
- [ ] Test error capture
- [ ] Verify in Sentry dashboard

---

*Last updated: January 2025*
