import { lazy } from 'react';

// Lazy pages
const Home = lazy(() => import('./pages/home'));
const StoryBuilder = lazy(() => import('./pages/story-builder'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Story = lazy(() => import('./pages/stories'));
const Reports = lazy(() => import('./pages/reports'));
const Appeals = lazy(() => import('./pages/appeals'));
const SignUp = lazy(() => import('./pages/sign-up'));
const SignIn = lazy(() => import('./pages/sign-in'));
const Layout = lazy(() => import('./layout/layout'));

// Non-lazy (small components)
import { ProtectedRoute } from './components/protected-route';

import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },

      // Stories
      {
        path: 'stories/:storyId/chapter/:chapterId/new',
        element: (
          <Suspense fallback={<div>Loading story builder...</div>}>
            <StoryBuilder />
          </Suspense>
        ),
      },
      {
        path: 'stories/:slug/*',
        element: (
          <Suspense fallback={<div>Loading story...</div>}>
            <Story />
          </Suspense>
        ),
      },

      // Dashboard
      {
        path: 'dashboard/*',
        element: (
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      // Admin - Reports & Appeals
      {
        path: 'reports',
        element: (
          <Suspense fallback={<div>Loading reports...</div>}>
            <Reports />
          </Suspense>
        ),
      },
      {
        path: 'appeals',
        element: (
          <Suspense fallback={<div>Loading appeals...</div>}>
            <Appeals />
          </Suspense>
        ),
      },
    ],
  },

  // Auth (unprotected)
  {
    path: '/sign-up',
    element: (
      <Suspense fallback={<div>Loading sign-up...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <Suspense fallback={<div>Loading sign-in...</div>}>
        <SignIn />
      </Suspense>
    ),
  },
]);
