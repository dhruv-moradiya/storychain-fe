import { useApi } from '@/hooks/useApi';
import { userApi } from '@/api/user.api';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';
import { STALE_TIME } from '@/lib/constants';

export function useUserProfile() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.user.me,
    queryFn: () => userApi(api).getMe(),
    enabled: isSignedIn,
    staleTime: STALE_TIME.LONG,
  });
}

export function useUserById(userId: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['user', 'id', userId],
    queryFn: () => userApi(api).getById(userId),
    enabled: isSignedIn && Boolean(userId?.trim()),
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useUserByUsername(username: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['user', 'username', username],
    queryFn: () => userApi(api).getByUsername(username),
    enabled: isSignedIn && Boolean(username?.trim()),
    staleTime: STALE_TIME.MEDIUM,
  });
}

export function useSearchUserByUsername(username: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.user.searchByUsername(username),
    queryFn: () => userApi(api).searchByUsername({ username }),
    enabled: isSignedIn && Boolean(username?.trim()),
    staleTime: STALE_TIME.SHORT,
  });
}
