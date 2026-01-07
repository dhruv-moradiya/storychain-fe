import { lazy, type ComponentType } from 'react';
import { SuspenseWrapper } from '@/components/suspense-wrapper';
import {
  AuthSkeleton,
  ChapterSkeleton,
  DashboardSkeleton,
  PageSkeleton,
  ProfileSkeleton,
  StoryBuilderSkeleton,
  StorySkeleton,
} from '@/components/skeletons';

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
// eslint-disable-next-line
export function lazyRoute<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  skeleton: SkeletonType = 'page'
) {
  const LazyComponent = lazy(importFn);
  const SkeletonComponent = skeletonMap[skeleton];

  // Return a wrapper component
  // eslint-disable-next-line
  return function LazyRouteWrapper(props: any) {
    return (
      <SuspenseWrapper fallback={<SkeletonComponent />}>
        <LazyComponent {...props} />
      </SuspenseWrapper>
    );
  };
}
