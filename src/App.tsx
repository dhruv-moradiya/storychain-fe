import { ErrorBoundary } from '@/components/error-boundary';
import { ProtectedRoute } from '@/components/protected-route';
import { lazyRoute } from '@/lib/lazy-route';
import { createBrowserRouter } from 'react-router';
import NotFound from './components/common/not-found';

// Lazy pages
const Home = lazyRoute(() => import('./pages/home'), 'page');
const Dashboard = lazyRoute(() => import('./pages/dashboard'), 'dashboard');
const Story = lazyRoute(() => import('./pages/stories'), 'story');
const StoryBuilder = lazyRoute(() => import('./pages/story-builder'), 'storyBuilder');
const ChapterRead = lazyRoute(() => import('./pages/chapter-read'), 'chapter');
const Profile = lazyRoute(() => import('./pages/profile'), 'profile');
const UserProfile = lazyRoute(() => import('./pages/user-profile'), 'profile');
const Reports = lazyRoute(() => import('./pages/reports'), 'dashboard');
const Appeals = lazyRoute(() => import('./pages/appeals'), 'dashboard');
const SubmitRequests = lazyRoute(() => import('./pages/submit-requests'));
const SubmitRequestDetail = lazyRoute(() => import('./pages/submit-request-detail'));
const SignUp = lazyRoute(() => import('./pages/sign-up'), 'auth');
const SignIn = lazyRoute(() => import('./pages/sign-in'), 'auth');

const Layout = lazyRoute(() => import('./layout/layout'), 'page');

export const router = createBrowserRouter([
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
      // Stories
      // Query params: mode (new|edit|continue), parent (root|chapterId), chapter (chapterId), draft (autoSaveId)
      // /stories/:storySlug/builder?mode=new&parent=root
      // /stories/:storySlug/builder?mode=new&parent=:parentChapterId
      // /stories/:storySlug/builder?mode=edit&chapter=:chapterId
      // /stories/:storySlug/builder?mode=continue&draft=:autoSaveId
      {
        path: 'stories/:storySlug/builder',
        element: <StoryBuilder />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'profile/:userId',
        element: <UserProfile />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'appeals',
        element: <Appeals />,
      },
      // Submit Requests (PR-like system)
      {
        path: 'submit-requests',
        element: <SubmitRequests />,
      },
      {
        path: 'submit-requests/:id',
        element: <SubmitRequestDetail />,
      },
    ],
  },

  // Auth (unprotected)
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },

  {
    path: '/*',
    element: <NotFound />,
  },
]);
