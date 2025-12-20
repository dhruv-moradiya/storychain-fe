import { useApi } from '@/hooks/useApi';
import type { IAuthUser, ISearchUserByUsername } from '@/type/user';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

export function useUserProfile() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get<IAuthUser>('/users/me');
      return res.data.data;
    },
    enabled: isSignedIn,
    staleTime: Infinity,
  });
}

export function useSearchUserByUsername(username: string) {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['search_user_by_username', username],
    queryFn: async () => {
      const res = await api.post<ISearchUserByUsername>('/users/search', { username });
      return res.data.data;
    },
    enabled: isSignedIn && Boolean(username?.trim()),
    staleTime: Infinity,
  });
}
