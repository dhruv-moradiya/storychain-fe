import { useMutation } from '@tanstack/react-query';
import { useApi } from '../useApi';
import type {
  TAutoSaveContentRequest,
  IDisableAutoSaveRequest,
  IEnableAutoSaveRequest,
} from '@/type/chapterAutoSave/chapterAutoSave.request.types';
import { chapterAutoSaveApi } from '@/api/chapterAutoSave.api';

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
