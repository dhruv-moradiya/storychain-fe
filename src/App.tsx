import { ErrorBoundary } from '@/components/error-boundary';
import { ProtectedRoute } from '@/components/protected-route';
import { lazyRoute } from '@/lib/lazy-route';
import { createBrowserRouter } from 'react-router';
import NotFound from './components/common/not-found';
import Explore from './pages/explore';

// Lazy pages
const Home = lazyRoute(() => import('./pages/home'), 'page');
const Dashboard = lazyRoute(() => import('./pages/dashboard'), 'dashboard');
const Story = lazyRoute(() => import('./pages/stories'), 'story');
const StoryBuilder = lazyRoute(() => import('./pages/story-builder'), 'storyBuilder');
const ChapterRead = lazyRoute(() => import('./pages/chapter-read'), 'chapter');
const UserProfile = lazyRoute(() => import('./pages/user-profile'), 'profile');
const Reports = lazyRoute(() => import('./pages/reports'), 'dashboard');
const Appeals = lazyRoute(() => import('./pages/appeals'), 'dashboard');
const SubmitRequests = lazyRoute(() => import('./pages/submit-requests'));
const SubmitRequestDetail = lazyRoute(() => import('./pages/submit-request-detail'));
const SignUp = lazyRoute(() => import('./pages/sign-up'), 'auth');
const SignIn = lazyRoute(() => import('./pages/sign-in'), 'auth');
const Pricing = lazyRoute(() => import('./pages/pricing'), 'minimal');
const HowToUse = lazyRoute(() => import('./pages/how-to-use'), 'minimal');
const Leaderboard = lazyRoute(() => import('./pages/leaderboard'), 'page');

// Profile Layout and Sections
const ProfileLayout = lazyRoute(() => import('./components/profile/profile-layout'), 'profile');
const GeneralSection = lazyRoute(() => import('./components/profile/general-section'), 'profile');
const BadgesSection = lazyRoute(() => import('./components/profile/badges-section'), 'profile');
const NotificationsSection = lazyRoute(
  () => import('./components/profile/notifications-section'),
  'profile'
);
const MyReportsSection = lazyRoute(
  () => import('./components/profile/my-reports-section'),
  'profile'
);
const SettingsSection = lazyRoute(() => import('./components/profile/settings-section'), 'profile');
const SubscriptionSection = lazyRoute(
  () => import('./components/profile/subscription-section'),
  'minimal'
);
const AdminSection = lazyRoute(() => import('./components/profile/admin-section'), 'profile');

// Admin sub-sections
const AdminUsers = lazyRoute(
  () => import('./components/profile/admin-section/admin-users'),
  'profile'
);
const AdminReports = lazyRoute(
  () => import('./components/profile/admin-section/admin-reports'),
  'profile'
);
const AdminRoles = lazyRoute(
  () => import('./components/profile/admin-section/admin-roles'),
  'profile'
);

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
        path: 'explore',
        element: <Explore />,
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
        path: 'builder',
        element: <StoryBuilder />,
      },
      {
        path: 'profile',
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <GeneralSection />,
          },
          {
            path: 'badges',
            element: <BadgesSection />,
          },
          {
            path: 'notifications',
            element: <NotificationsSection />,
          },
          {
            path: 'my-reports',
            element: <MyReportsSection />,
          },
          {
            path: 'settings',
            element: <SettingsSection />,
          },
          {
            path: 'subscription',
            element: <SubscriptionSection />,
          },
          {
            path: 'admin',
            element: <AdminSection />,
            children: [
              {
                index: true,
                element: <AdminUsers />,
              },
              {
                path: 'reports',
                element: <AdminReports />,
              },
              {
                path: 'roles',
                element: <AdminRoles />,
              },
            ],
          },
        ],
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
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'how-to-use',
        element: <HowToUse />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
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
