# TanStack Query Advanced Features Guide

This guide covers advanced TanStack Query features that can enhance the StoryChain project beyond the current implementation.

## Table of Contents

1. [Optimistic Updates](#1-optimistic-updates)
2. [Infinite Queries & Pagination](#2-infinite-queries--pagination)
3. [Prefetching](#3-prefetching)
4. [Dependent Queries](#4-dependent-queries)
5. [Parallel Queries](#5-parallel-queries)
6. [Query Cancellation](#6-query-cancellation)
7. [Placeholder & Initial Data](#7-placeholder--initial-data)
8. [Mutations with Optimistic Updates](#8-mutations-with-optimistic-updates)
9. [Query Filters & Selective Invalidation](#9-query-filters--selective-invalidation)
10. [Persisted Queries](#10-persisted-queries)
11. [Suspense Mode](#11-suspense-mode)
12. [Error Boundaries](#12-error-boundaries)
13. [Retry Configuration](#13-retry-configuration)
14. [Global Callbacks & Error Handling](#14-global-callbacks--error-handling)
15. [Offline Support](#15-offline-support)

---

## 1. Optimistic Updates

Optimistic updates show instant UI feedback before the server responds, creating a snappier user experience.

### Example: Optimistic Chapter Creation

```typescript
// src/hooks/story/story.mutations.ts
export function useCreateChapterOptimistic() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateChapterPayload) =>
      storyApi(api).createChapter(payload),

    // Called before mutation function
    onMutate: async (newChapter) => {
      // Cancel outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({
        queryKey: QueryKey.story.chapters(newChapter.storyId),
      });

      // Snapshot previous value
      const previousChapters = queryClient.getQueryData<Chapter[]>(
        QueryKey.story.chapters(newChapter.storyId)
      );

      // Optimistically update cache
      queryClient.setQueryData<Chapter[]>(
        QueryKey.story.chapters(newChapter.storyId),
        (old) => [
          ...(old || []),
          {
            ...newChapter,
            id: 'temp-id', // Temporary ID
            createdAt: new Date().toISOString(),
            status: 'creating', // Visual indicator
          },
        ]
      );

      // Return context for rollback
      return { previousChapters };
    },

    // On error, rollback to previous value
    onError: (err, newChapter, context) => {
      if (context?.previousChapters) {
        queryClient.setQueryData(
          QueryKey.story.chapters(newChapter.storyId),
          context.previousChapters
        );
      }
      toast.error('Failed to create chapter');
    },

    // Always refetch after error or success
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: QueryKey.story.chapters(variables.storyId),
      });
    },
  });
}
```

### Usage in Component

```tsx
function ChapterList({ storyId }: { storyId: string }) {
  const { data: chapters } = useGetStoryTree(storyId);
  const { mutate: createChapter, isPending } = useCreateChapterOptimistic();

  return (
    <div>
      {chapters?.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          // Show loading state for optimistic entries
          isOptimistic={chapter.id === 'temp-id'}
        />
      ))}
    </div>
  );
}
```

---

## 2. Infinite Queries & Pagination

Perfect for loading stories or notifications in a feed format.

### Example: Infinite Story Feed

```typescript
// src/hooks/story/story.queries.ts
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteStories(filters?: StoryFilters) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useInfiniteQuery({
    queryKey: ['stories', 'infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await storyApi(api).getStories({
        ...filters,
        page: pageParam,
        limit: 10,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Return undefined if no more pages
      if (lastPage.data.length < 10) return undefined;
      return allPages.length + 1;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (allPages.length <= 1) return undefined;
      return allPages.length - 1;
    },
    enabled: isSignedIn,
    staleTime: STALE_TIME.MEDIUM,
  });
}
```

### Usage with Intersection Observer

```tsx
import { useInView } from 'react-intersection-observer';

function StoryFeed() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteStories();

  // Auto-fetch when bottom is visible
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') return <StorySkeleton />;
  if (status === 'error') return <ErrorMessage />;

  return (
    <div>
      {data.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </Fragment>
      ))}

      {/* Infinite scroll trigger */}
      <div ref={ref}>
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
}
```

### Bi-directional Infinite Query (Chat/Timeline)

```typescript
export function useChapterComments(chapterId: string) {
  const api = useApi();

  return useInfiniteQuery({
    queryKey: ['chapter', chapterId, 'comments'],
    queryFn: ({ pageParam }) =>
      api.get(`/chapters/${chapterId}/comments`, {
        params: { cursor: pageParam },
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.previousCursor,
    maxPages: 5, // Keep only 5 pages in memory
  });
}
```

---

## 3. Prefetching

Load data before the user needs it for instant navigation.

### Prefetch on Hover

```typescript
// src/hooks/story/usePrefetchStory.ts
export function usePrefetchStory() {
  const api = useApi();
  const queryClient = useQueryClient();

  const prefetchStory = useCallback(
    (slug: string) => {
      queryClient.prefetchQuery({
        queryKey: QueryKey.story.bySlug(slug),
        queryFn: () => storyApi(api).getBySlug(slug),
        staleTime: STALE_TIME.MEDIUM,
      });
    },
    [api, queryClient]
  );

  return { prefetchStory };
}
```

### Usage in Component

```tsx
function StoryCard({ story }: { story: IStory }) {
  const { prefetchStory } = usePrefetchStory();
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => prefetchStory(story.slug)}
      onClick={() => navigate(`/story/${story.slug}`)}
    >
      <h3>{story.title}</h3>
    </div>
  );
}
```

### Prefetch in Route Loaders (React Router)

```typescript
// src/routes/story.route.tsx
import { queryClient } from '@/lib/query-client';

export const storyLoader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  // Prefetch in parallel
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: QueryKey.story.bySlug(slug!),
      queryFn: () => publicApi.getStoryBySlug(slug!),
    }),
    queryClient.prefetchQuery({
      queryKey: QueryKey.story.chapters(slug!),
      queryFn: () => publicApi.getChapters(slug!),
    }),
  ]);

  return null;
};

// In router config
{
  path: '/story/:slug',
  element: <StoryPage />,
  loader: storyLoader,
}
```

---

## 4. Dependent Queries

Execute queries that depend on results from other queries.

### Example: Load User's Active Story Settings

```typescript
export function useActiveStorySettings() {
  const { data: user, isLoading: userLoading } = useUserProfile();

  // This query depends on user data
  const {
    data: storySettings,
    isLoading: settingsLoading,
  } = useQuery({
    queryKey: QueryKey.story.settingsBySlug(user?.activeStorySlug ?? ''),
    queryFn: () => storyApi(api).getSettings(user!.activeStorySlug),
    // Only run when we have the user's active story
    enabled: !!user?.activeStorySlug,
    staleTime: STALE_TIME.MEDIUM,
  });

  return {
    user,
    storySettings,
    isLoading: userLoading || (!!user?.activeStorySlug && settingsLoading),
  };
}
```

### Chained Dependencies

```typescript
export function useChapterWithAuthor(chapterId: string) {
  const api = useApi();

  // First: Get chapter
  const chapterQuery = useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => api.get(`/chapters/${chapterId}`),
  });

  // Second: Get author (depends on chapter)
  const authorQuery = useQuery({
    queryKey: ['user', chapterQuery.data?.authorId],
    queryFn: () => api.get(`/users/${chapterQuery.data!.authorId}`),
    enabled: !!chapterQuery.data?.authorId,
  });

  return {
    chapter: chapterQuery.data,
    author: authorQuery.data,
    isLoading: chapterQuery.isLoading || authorQuery.isLoading,
  };
}
```

---

## 5. Parallel Queries

Run multiple independent queries simultaneously.

### Using useQueries

```typescript
import { useQueries } from '@tanstack/react-query';

export function useMultipleStories(slugs: string[]) {
  const api = useApi();

  return useQueries({
    queries: slugs.map((slug) => ({
      queryKey: QueryKey.story.bySlug(slug),
      queryFn: () => storyApi(api).getBySlug(slug),
      staleTime: STALE_TIME.MEDIUM,
    })),
    combine: (results) => ({
      data: results.map((r) => r.data).filter(Boolean),
      isLoading: results.some((r) => r.isLoading),
      isError: results.some((r) => r.isError),
      errors: results.map((r) => r.error).filter(Boolean),
    }),
  });
}
```

### Dashboard with Multiple Data Sources

```typescript
export function useDashboardData() {
  const api = useApi();

  const results = useQueries({
    queries: [
      {
        queryKey: QueryKey.story.my,
        queryFn: () => storyApi(api).getUserStories(),
        staleTime: STALE_TIME.LONG,
      },
      {
        queryKey: QueryKey.notification.list,
        queryFn: () => notificationApi(api).getAll(),
        staleTime: STALE_TIME.SHORT,
      },
      {
        queryKey: ['stats', 'overview'],
        queryFn: () => statsApi(api).getOverview(),
        staleTime: STALE_TIME.MEDIUM,
      },
    ],
  });

  const [storiesQuery, notificationsQuery, statsQuery] = results;

  return {
    stories: storiesQuery.data,
    notifications: notificationsQuery.data,
    stats: statsQuery.data,
    isLoading: results.some((r) => r.isLoading),
  };
}
```

---

## 6. Query Cancellation

Cancel in-flight queries when components unmount or when new queries supersede old ones.

### Automatic Cancellation with AbortSignal

```typescript
export function useSearchStories(query: string) {
  const api = useApi();

  return useQuery({
    queryKey: ['stories', 'search', query],
    queryFn: async ({ signal }) => {
      // Pass signal to axios for automatic cancellation
      const response = await api.get('/stories/search', {
        params: { q: query },
        signal, // AbortSignal from TanStack Query
      });
      return response.data;
    },
    enabled: query.length >= 2,
    staleTime: STALE_TIME.SHORT,
  });
}
```

### Manual Cancellation

```typescript
function SearchComponent() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');

  const handleClear = () => {
    // Cancel any pending search queries
    queryClient.cancelQueries({ queryKey: ['stories', 'search'] });
    setQuery('');
  };

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
```

---

## 7. Placeholder & Initial Data

Show cached or placeholder data while fresh data loads.

### Placeholder Data

```typescript
export function useStoryDetails(slug: string) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QueryKey.story.bySlug(slug),
    queryFn: () => storyApi(api).getBySlug(slug),
    // Show data from list cache while loading full details
    placeholderData: () => {
      const stories = queryClient.getQueryData<IStory[]>(QueryKey.story.my);
      return stories?.find((s) => s.slug === slug);
    },
  });
}
```

### Initial Data from Cache

```typescript
export function useStorySettings(slug: string) {
  const api = useApi();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QueryKey.story.settingsBySlug(slug),
    queryFn: () => storyApi(api).getSettings(slug),
    // Use cached overview data as initial data
    initialData: () => {
      const overview = queryClient.getQueryData<StoryOverview>(
        QueryKey.story.overviewBySlug(slug)
      );
      return overview?.settings;
    },
    // Consider initial data stale after 1 minute
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(
        QueryKey.story.overviewBySlug(slug)
      )?.dataUpdatedAt;
    },
  });
}
```

### Keep Previous Data

```typescript
export function useFilteredStories(filters: StoryFilters) {
  const api = useApi();

  return useQuery({
    queryKey: ['stories', 'filtered', filters],
    queryFn: () => storyApi(api).getFiltered(filters),
    // Keep showing previous results while new ones load
    placeholderData: keepPreviousData,
  });
}
```

---

## 8. Mutations with Optimistic Updates

### Full Example: Like/Unlike Story

```typescript
// src/hooks/story/useLikeStory.ts
export function useLikeStory() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storyId, isLiked }: { storyId: string; isLiked: boolean }) =>
      isLiked
        ? storyApi(api).unlike(storyId)
        : storyApi(api).like(storyId),

    onMutate: async ({ storyId, isLiked }) => {
      // Cancel related queries
      await queryClient.cancelQueries({ queryKey: ['story', storyId] });

      // Snapshot
      const previousStory = queryClient.getQueryData<IStory>(['story', storyId]);

      // Optimistic update
      queryClient.setQueryData<IStory>(['story', storyId], (old) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: !isLiked,
          likesCount: isLiked ? old.likesCount - 1 : old.likesCount + 1,
        };
      });

      return { previousStory };
    },

    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousStory) {
        queryClient.setQueryData(
          ['story', variables.storyId],
          context.previousStory
        );
      }
    },

    onSettled: (data, error, variables) => {
      // Sync with server
      queryClient.invalidateQueries({
        queryKey: ['story', variables.storyId],
      });
    },
  });
}
```

### Usage

```tsx
function LikeButton({ story }: { story: IStory }) {
  const { mutate: toggleLike, isPending } = useLikeStory();

  return (
    <button
      onClick={() => toggleLike({ storyId: story.id, isLiked: story.isLiked })}
      disabled={isPending}
      className={story.isLiked ? 'liked' : ''}
    >
      {story.likesCount} Likes
    </button>
  );
}
```

---

## 9. Query Filters & Selective Invalidation

### Invalidate by Partial Key

```typescript
const queryClient = useQueryClient();

// Invalidate all story queries
queryClient.invalidateQueries({ queryKey: ['story'] });

// Invalidate specific story
queryClient.invalidateQueries({ queryKey: QueryKey.story.bySlug('my-story') });

// Invalidate with predicate
queryClient.invalidateQueries({
  predicate: (query) =>
    query.queryKey[0] === 'story' &&
    query.state.dataUpdatedAt < Date.now() - 60000,
});
```

### Refetch Active Queries Only

```typescript
// Only refetch queries that are currently being observed
queryClient.invalidateQueries({
  queryKey: ['story'],
  refetchType: 'active',
});

// Refetch all matching queries (including inactive)
queryClient.invalidateQueries({
  queryKey: ['story'],
  refetchType: 'all',
});

// Don't refetch, just mark as stale
queryClient.invalidateQueries({
  queryKey: ['story'],
  refetchType: 'none',
});
```

### Remove Queries

```typescript
// Remove specific query from cache
queryClient.removeQueries({ queryKey: QueryKey.story.bySlug('deleted-story') });

// Remove all story queries
queryClient.removeQueries({ queryKey: ['story'] });
```

### Reset Queries

```typescript
// Reset queries to their initial state
queryClient.resetQueries({ queryKey: ['story'] });
```

---

## 10. Persisted Queries

Persist cache to localStorage for instant loading on page refresh.

### Setup with Persister

```typescript
// src/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours (for persistence)
    },
  },
});

// Create persister
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'storychain-query-cache',
});

// Persist only specific queries
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      // Only persist user and story list queries
      const key = query.queryKey[0];
      return key === 'user' || (key === 'story' && query.queryKey[1] === 'my');
    },
  },
});
```

### Using PersistQueryClientProvider

```tsx
// src/main.tsx
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
      onSuccess={() => {
        // Optional: Refetch stale queries after hydration
        queryClient.resumePausedMutations();
      }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  );
}
```

---

## 11. Suspense Mode

Use React Suspense for cleaner loading states.

### Enable Suspense Query

```typescript
import { useSuspenseQuery } from '@tanstack/react-query';

export function useStoryDetailsSuspense(slug: string) {
  const api = useApi();

  return useSuspenseQuery({
    queryKey: QueryKey.story.bySlug(slug),
    queryFn: () => storyApi(api).getBySlug(slug),
    staleTime: STALE_TIME.MEDIUM,
  });
}
```

### Component with Suspense

```tsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function StoryPage({ slug }: { slug: string }) {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<StorySkeleton />}>
        <StoryContent slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
}

function StoryContent({ slug }: { slug: string }) {
  // This will suspend until data is ready
  const { data: story } = useStoryDetailsSuspense(slug);

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.description}</p>
    </div>
  );
}
```

### Multiple Suspense Queries

```tsx
import { useSuspenseQueries } from '@tanstack/react-query';

function StoryWithAuthor({ slug }: { slug: string }) {
  const [storyQuery, authorQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: QueryKey.story.bySlug(slug),
        queryFn: () => storyApi(api).getBySlug(slug),
      },
      {
        queryKey: ['story', slug, 'author'],
        queryFn: () => storyApi(api).getAuthor(slug),
      },
    ],
  });

  // Both are guaranteed to have data here
  return (
    <div>
      <h1>{storyQuery.data.title}</h1>
      <p>By {authorQuery.data.name}</p>
    </div>
  );
}
```

---

## 12. Error Boundaries

Handle query errors gracefully.

### Query Error Boundary

```tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function StoryPageWrapper({ slug }: { slug: string }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="error-container">
              <h2>Something went wrong</h2>
              <pre>{error.message}</pre>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          )}
        >
          <Suspense fallback={<StorySkeleton />}>
            <StoryContent slug={slug} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
```

### Global Error Handler

```typescript
// src/lib/query-client.ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error) => {
        // Only throw for 5xx errors (show error boundary)
        return error instanceof ApiError && error.status >= 500;
      },
    },
    mutations: {
      onError: (error) => {
        // Global mutation error handling
        const message = handleApiError(error);
        toast.error(message);
      },
    },
  },
});
```

---

## 13. Retry Configuration

Fine-tune retry behavior for different scenarios.

### Custom Retry Logic

```typescript
export function useStoryWithRetry(slug: string) {
  const api = useApi();

  return useQuery({
    queryKey: QueryKey.story.bySlug(slug),
    queryFn: () => storyApi(api).getBySlug(slug),
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error instanceof ApiError && error.status < 500) {
        return false;
      }
      // Retry up to 3 times for server errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => {
      // Exponential backoff: 1s, 2s, 4s
      return Math.min(1000 * 2 ** attemptIndex, 30000);
    },
  });
}
```

### Mutation Retry

```typescript
export function useCreateStoryWithRetry() {
  const api = useApi();

  return useMutation({
    mutationFn: (data: CreateStoryData) => storyApi(api).create(data),
    retry: 2,
    retryDelay: 1000,
    // Only retry on network errors
    onError: (error, variables, context) => {
      if (error.message === 'Network Error') {
        // Will retry
        return;
      }
      // Show error for other cases
      toast.error(handleApiError(error));
    },
  });
}
```

---

## 14. Global Callbacks & Error Handling

### Query Client Global Callbacks

```typescript
// src/lib/query-client.ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
    mutations: {
      // Global mutation callbacks
      onError: (error, variables, context) => {
        console.error('Mutation error:', error);
        Sentry.captureException(error, {
          extra: { variables, context },
        });
      },
      onSuccess: (data, variables, context) => {
        console.log('Mutation success:', data);
      },
    },
  },
  // Query cache callbacks
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Global query error handler
      if (error instanceof ApiError && error.status === 401) {
        // Handle unauthorized - redirect to login
        window.location.href = '/sign-in';
      }

      // Log to Sentry
      Sentry.captureException(error, {
        extra: {
          queryKey: query.queryKey,
        },
      });
    },
  }),
  // Mutation cache callbacks
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      // Handle specific mutation errors
      if (mutation.options.meta?.showErrorToast !== false) {
        toast.error(handleApiError(error));
      }
    },
    onSuccess: (data, variables, context, mutation) => {
      // Handle specific mutation success
      if (mutation.options.meta?.showSuccessToast) {
        toast.success(mutation.options.meta.successMessage || 'Success!');
      }
    },
  }),
});
```

### Using Mutation Meta

```typescript
export function useCreateStory() {
  const api = useApi();

  return useMutation({
    mutationFn: (data: CreateStoryData) => storyApi(api).create(data),
    meta: {
      showErrorToast: true,
      showSuccessToast: true,
      successMessage: 'Story created successfully!',
      requiresAuth: true,
    },
  });
}
```

---

## 15. Offline Support

Handle offline scenarios gracefully.

### Online Status Manager

```typescript
import { onlineManager } from '@tanstack/react-query';

// Custom online detection
onlineManager.setEventListener((setOnline) => {
  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
});
```

### Pause Mutations When Offline

```typescript
export function useCreateChapterOfflineAware() {
  const api = useApi();

  return useMutation({
    mutationFn: (data: CreateChapterData) => storyApi(api).createChapter(data),
    // Mutation will pause when offline and resume when online
    networkMode: 'offlineFirst',
    // Keep retrying when back online
    retry: 3,
  });
}
```

### Show Offline Indicator

```tsx
import { useIsRestoring, onlineManager } from '@tanstack/react-query';

function OfflineIndicator() {
  const isRestoring = useIsRestoring();
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());

  useEffect(() => {
    return onlineManager.subscribe((online) => setIsOnline(online));
  }, []);

  if (isRestoring) {
    return <div className="banner">Restoring cached data...</div>;
  }

  if (!isOnline) {
    return <div className="banner warning">You are offline</div>;
  }

  return null;
}
```

### Full Offline-First Pattern

```typescript
// src/lib/query-client.ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Use cached data when offline
      networkMode: 'offlineFirst',
      // Keep cache longer for offline support
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      staleTime: 60 * 1000,
    },
    mutations: {
      // Pause mutations when offline
      networkMode: 'offlineFirst',
    },
  },
});

// Resume paused mutations when online
onlineManager.subscribe((isOnline) => {
  if (isOnline) {
    queryClient.resumePausedMutations();
  }
});
```

---

## Quick Reference: Current Project Patterns

### Existing Query Key Structure

```typescript
// src/lib/query-keys.ts
export const QueryKey = {
  user: {
    me: ['user', 'me'],
    searchByUsername: (username: string) => ['user', 'search', username],
  },
  story: {
    my: ['story', 'my'],
    bySlug: (slug: string) => ['story', 'slug', slug],
    // ... more keys
  },
};
```

### Existing Stale Time Constants

```typescript
// src/lib/constants.ts
export const STALE_TIME = {
  INFINITE: Infinity,
  REALTIME: 0,
  VERY_SHORT: 5 * 1000,
  SHORT: 30 * 1000,
  MEDIUM: 2 * 60 * 1000,
  LONG: 5 * 60 * 1000,
  VERY_LONG: 15 * 60 * 1000,
};
```

### Standard Query Pattern

```typescript
export function useExampleQuery(param: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.example.byParam(param),
    queryFn: () => exampleApi(api).getByParam(param),
    enabled: isSignedIn && !!param,
    staleTime: STALE_TIME.MEDIUM,
  });
}
```

### Standard Mutation Pattern

```typescript
export function useExampleMutation() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExampleData) => exampleApi(api).create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['example'] });
      toast.success('Success!');
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });
}
```

---

## Recommended Additions for StoryChain

1. **Infinite Queries** - For story feed and notifications
2. **Prefetching** - On story card hover for instant navigation
3. **Optimistic Updates** - For likes, bookmarks, and quick actions
4. **Offline Support** - For chapter auto-save drafts
5. **Suspense Mode** - For cleaner loading states in key pages

---

## Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Query DevTools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
