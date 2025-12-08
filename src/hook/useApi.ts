import { useMemo } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { createAxiosInspector } from '@/lib/axiosInspector';

export function useApi() {
  const { getToken, signOut } = useAuth();

  return useMemo(() => createAxiosInspector(getToken, signOut), [getToken, signOut]);
}
