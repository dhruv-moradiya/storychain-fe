import { useAuth } from '@clerk/clerk-react';
import { useApi } from '../useApi';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';
import { chapterAutoSaveApi } from '@/api/chapterAutoSave.api';
import { STALE_TIME } from '@/lib/constants';

function useGetAutoSaveDraft() {
  const api = useApi();
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: QueryKey.story.autoSave.draft(),
    queryFn: () => chapterAutoSaveApi(api).getAutoSaveDraft(),
    enabled: isSignedIn,
    staleTime: STALE_TIME.LONG,
  });
}

export { useGetAutoSaveDraft };
