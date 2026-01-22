import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../useApi';
import type {
  TAutoSaveContentRequest,
  IDisableAutoSaveRequest,
  IEnableAutoSaveRequest,
  IConvertAutoSaveToDraftRequest,
  IConvertAutoSaveToPublishedRequest,
} from '@/type/chapterAutoSave/chapterAutoSave.request.types';
import { chapterAutoSaveApi } from '@/api/chapterAutoSave.api';
import { QueryKey } from '@/lib/query-keys';

export function useEnableAutoSave() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: IEnableAutoSaveRequest) =>
      chapterAutoSaveApi(api).enableAutoSave(payload),
    meta: { requiresAuth: true },
  });
}

export function useAutoSaveContent() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: TAutoSaveContentRequest) =>
      chapterAutoSaveApi(api).autoSaveContent(payload),
    meta: { requiresAuth: true },
  });
}

export function useDisableAutoSave() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: IDisableAutoSaveRequest) =>
      chapterAutoSaveApi(api).disableAutoSave(payload),
    meta: { requiresAuth: true },
  });
}

export function useConvertAutoSaveToDraft() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IConvertAutoSaveToDraftRequest) =>
      chapterAutoSaveApi(api).convertToDraft(payload),
    meta: { requiresAuth: true },
    onSuccess: () => {
      // Invalidate drafts list to refresh after conversion
      queryClient.invalidateQueries({ queryKey: QueryKey.story.autoSave.draft() });
    },
  });
}

export function useConvertAutoSaveToPublished() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IConvertAutoSaveToPublishedRequest) =>
      chapterAutoSaveApi(api).convertToPublished(payload),
    meta: { requiresAuth: true },
    onSuccess: () => {
      // Invalidate drafts list to refresh after conversion
      queryClient.invalidateQueries({ queryKey: QueryKey.story.autoSave.draft() });
    },
  });
}
