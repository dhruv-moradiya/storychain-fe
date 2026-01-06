import { useMemo, useCallback, useState, useEffect } from 'react';
import { useGetAutoSaveDraft } from '@/hooks/chapterAutoSave/chapterAutoSave.queries';
import { formatDistanceToNow, format } from 'date-fns';

function useDraftRecoveryBannerLogic(setIsDraftSelectionOpen: (v: boolean) => void) {
  const { data: { data: draftList = [] } = {}, isLoading, isError, error } = useGetAutoSaveDraft();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(draftList.length > 0);
  }, [draftList]);

  const banner = useMemo(() => {
    const latest = draftList[draftList.length - 1];

    let timeAgo: string | null = null;
    if (latest?.lastSavedAt) {
      timeAgo = formatDistanceToNow(new Date(latest.lastSavedAt), { addSuffix: true });
    }

    return {
      count: draftList.length,
      latestTitle: latest?.title?.trim() || 'Untitled draft',
      lastSavedAt: latest?.lastSavedAt
        ? `${format(latest.lastSavedAt, 'PPp')} • ${formatDistanceToNow(new Date(latest.lastSavedAt), { addSuffix: true })}`
        : null,
      words: latest?.content ? latest.content.trim().split(/\s+/).length : null,
      timeAgo,
    };
  }, [draftList]);

  const handleView = useCallback(() => {
    setIsDraftSelectionOpen(true);
  }, [setIsDraftSelectionOpen]);

  const handleDiscardLatest = useCallback(() => {
    console.warn('Discard most recent draft');
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    banner,
    isLoading,
    isError,
    errorMessage: isError ? (error as Error)?.message || 'Failed to load drafts' : null,
    isVisible,
    setIsVisible,
    draftList,
    actions: {
      handleView,
      handleDiscardLatest,
      handleClose,
    },
  };
}

export { useDraftRecoveryBannerLogic };
