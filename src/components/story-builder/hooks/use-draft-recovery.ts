import { useCallback, useMemo, useState } from 'react';
import { useGetAutoSaveDraft } from '@/hooks/chapterAutoSave/chapterAutoSave.queries';
import type { DraftData } from './use-auto-save';
import type { IChapterAutoSave } from '@/type/chapterAutoSave';

interface UseDraftRecoveryOptions {
  onRecover?: (draft: DraftData) => void;
  onDiscard?: (draft: DraftData) => void;
}

export function useDraftRecovery({ onRecover, onDiscard }: UseDraftRecoveryOptions = {}) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<DraftData | null>(null);

  const { data: apiDrafts, isLoading, refetch } = useGetAutoSaveDraft();

  const drafts = useMemo<DraftData[]>(() => {
    if (!apiDrafts?.data || !Array.isArray(apiDrafts.data)) return [];
    return apiDrafts.data.map((draft: IChapterAutoSave) => ({
      chapterId: draft.chapterId,
      draftId: draft._id,
      title: draft.title,
      content: draft.content,
      lastSavedAt: new Date(draft.lastSavedAt),
      wordCount: draft.content?.trim().split(/\s+/).length || 0,
      charCount: draft.content?.length || 0,
    }));
  }, [apiDrafts?.data]);

  const hasDrafts = drafts.length > 0;
  const hasMultipleDrafts = drafts.length > 1;

  const recoverDraft = useCallback(
    (draft: DraftData) => {
      if (onRecover) {
        onRecover(draft);
      }
      setSelectedDraft(draft);
      setIsDismissed(true);
    },
    [onRecover]
  );

  const discardDraft = useCallback(
    (draft: DraftData) => {
      if (onDiscard) {
        onDiscard(draft);
      }
    },
    [onDiscard]
  );

  const dismissBanner = useCallback(() => {
    setIsDismissed(true);
  }, []);

  const resetDismiss = useCallback(() => {
    setIsDismissed(false);
    setSelectedDraft(null);
  }, []);

  return {
    drafts,
    hasDrafts,
    hasMultipleDrafts,
    selectedDraft,
    isLoading,
    isDismissed,
    recoverDraft,
    discardDraft,
    dismissBanner,
    resetDismiss,
    showBanner: hasDrafts && !isDismissed,
    refetchDrafts: refetch,
  };
}
