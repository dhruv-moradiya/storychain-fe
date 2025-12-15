import { useApi } from '@/hook/useApi';
import { QueryKey } from '@/lib/query-keys';
import { storyApi } from '@/api/story.api';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { IStory } from '@/type/story.type';
import { STALE_TIME } from '@/lib/constants';

export function useGetUserStories() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.my,
    queryFn: () => storyApi(api).getMyStories(),
    enabled: isSignedIn,
    staleTime: STALE_TIME.LONG,
  });
}

export function useGetStoryBySlug(
  slug: string,
  options?: Omit<UseQueryOptions<IStory, Error, IStory>, 'queryKey' | 'queryFn'>
) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.bySlug(slug),
    queryFn: () => storyApi(api).getBySlug(slug),
    enabled: isSignedIn && !!slug,
    staleTime: STALE_TIME.MEDIUM,
    ...options,
  });
}

export function useGetStoryCollaborators(storyId: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.collaborators(storyId),
    queryFn: () => storyApi(api).getCollaborators(storyId),
    enabled: isSignedIn && !!storyId,
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useGetStoryTree(storyId: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.chapters(storyId),
    queryFn: () => storyApi(api).getTree(storyId),
    enabled: isSignedIn && !!storyId,
    staleTime: STALE_TIME.LONG,
  });
}
