import { useApi } from '@/hooks/useApi';
import { QueryKey } from '@/lib/query-keys';
import { storyApi } from '@/api/story.api';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { IStory } from '@/type/story.type';
import { STALE_TIME } from '@/lib/constants';
import type { IGetStoryOverviewBySlugResponse } from '@/type/story';

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

export function useGetStoryOverviewBySlug(
  slug: string,
  options?: Omit<
    UseQueryOptions<IGetStoryOverviewBySlugResponse, Error, IGetStoryOverviewBySlugResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.overviewBySlug(slug),
    queryFn: () => storyApi(api).getStoryOverviewBySlug(slug),
    enabled: isSignedIn && !!slug,
    staleTime: STALE_TIME.MEDIUM,
    ...options,
  });
}

export function useGetStorySettingsBySlug(slug: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.settingsBySlug(slug),
    queryFn: () => storyApi(api).getStorySettingsBySlug(slug),
    enabled: isSignedIn && !!slug,
    staleTime: STALE_TIME.MEDIUM,
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

export function useGetStorySignatureUrl(
  slug: string,
  options?: Omit<
    UseQueryOptions<{ data: { uploadURL: string } }, Error, { data: { uploadURL: string } }>,
    'queryKey' | 'queryFn'
  >
) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.signatureUrl(slug),
    queryFn: () => storyApi(api).getSignatureUrl(slug),
    enabled: isSignedIn && !!slug,
    staleTime: STALE_TIME.MEDIUM,
    ...options,
  });
}
