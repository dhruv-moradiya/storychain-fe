import { useApi } from '@/hooks/useApi';
import { userApi, type IUpdateProfilePayload, type IUpdatePreferencesPayload } from '@/api/user.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

export function useUpdateProfile() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateProfilePayload) => userApi(api).updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
    },
  });
}

export function useUpdatePreferences() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdatePreferencesPayload) => userApi(api).updatePreferences(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
    },
  });
}
