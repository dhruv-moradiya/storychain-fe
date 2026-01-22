import { chapterApi } from '@/api/chapter.api';
import { useApi } from '@/hooks/useApi';
import { QueryKey } from '@/lib/query-keys';
import type { IUpdateChapterRequest } from '@/type/chapter';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to update a chapter's content or title
 */
export function useUpdateChapter() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateChapterRequest) => chapterApi(api).updateChapter(payload),
    meta: { requiresAuth: true },
    onSuccess: (_data, variables) => {
      // Invalidate the specific chapter query
      queryClient.invalidateQueries({
        queryKey: QueryKey.chapter.byId(variables.chapterId),
      });
      // Also invalidate user's chapters list
      queryClient.invalidateQueries({
        queryKey: QueryKey.chapter.my,
      });
    },
  });
}

/**
 * Hook to delete a chapter (soft delete)
 */
export function useDeleteChapter() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chapterId: string) => chapterApi(api).deleteChapter(chapterId),
    meta: { requiresAuth: true },
    onSuccess: () => {
      // Invalidate user's chapters list after deletion
      queryClient.invalidateQueries({
        queryKey: QueryKey.chapter.my,
      });
    },
  });
}
