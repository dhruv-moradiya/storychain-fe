import { useApi } from '@/hook/useApi';
import { QueryKey } from '@/lib/query-keys';
import type { INotificationListResponse } from '@/type/notification.type';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

export function useGetNotifications() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.notification.list,
    queryFn: async () => {
      const res = await api.get<INotificationListResponse>('/notifications');
      return res.data.data;
    },
    enabled: isSignedIn,
    staleTime: Infinity,
  });
}
