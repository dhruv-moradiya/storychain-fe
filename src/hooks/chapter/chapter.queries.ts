import { chapterApi } from '@/api/chapter.api';
import { useApi } from '@/hooks/useApi';
import { STALE_TIME } from '@/lib/constants';
import { QueryKey } from '@/lib/query-keys';
import type { IGetChapterByIdResponse, IGetMyChaptersResponse } from '@/type/chapter';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook to get a single chapter by its ID with full details including author info
 */
export function useGetChapterById(
  chapterId: string,
  options?: Omit<
    UseQueryOptions<IGetChapterByIdResponse, Error, IGetChapterByIdResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.chapter.byId(chapterId),
    queryFn: () => chapterApi(api).getById(chapterId),
    enabled: isSignedIn && !!chapterId,
    staleTime: STALE_TIME.MEDIUM,
    ...options,
  });
}

/**
 * Hook to get current user's chapters
 */
export function useGetMyChapters(
  options?: Omit<
    UseQueryOptions<IGetMyChaptersResponse, Error, IGetMyChaptersResponse>,
    'queryKey' | 'queryFn'
  >
) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.chapter.my,
    queryFn: () => chapterApi(api).getMyChapters(),
    enabled: isSignedIn,
    staleTime: STALE_TIME.LONG,
    ...options,
  });
}
