import { useCallback, useEffect, useState } from 'react';
import { getAllSavedDrafts, deleteDraft, type DraftData } from './use-auto-save';

export interface DraftRecoveryState {
  hasDraft: boolean;
  draft: DraftData | null;
  isLoading: boolean;
}

interface UseDraftRecoveryOptions {
  chapterId?: string;
  onRecover?: (draft: DraftData) => void;
  onDiscard?: (draft: DraftData) => void;
}

export function useDraftRecovery({
  chapterId,
  onRecover,
  onDiscard,
}: UseDraftRecoveryOptions = {}) {
  const [state, setState] = useState<DraftRecoveryState>({
    hasDraft: false,
    draft: null,
    isLoading: true,
  });
  const [isDismissed, setIsDismissed] = useState(false);

  // Check for drafts on mount
  useEffect(() => {
    const checkForDrafts = () => {
      const drafts = getAllSavedDrafts();

      if (drafts.length === 0) {
        setState({ hasDraft: false, draft: null, isLoading: false });
        return;
      }

      // If specific chapterId provided, look for that draft
      if (chapterId) {
        const specificDraft = drafts.find((d) => d.chapterId === chapterId);
        if (specificDraft) {
          setState({ hasDraft: true, draft: specificDraft, isLoading: false });
          return;
        }
      }

      // Otherwise, get the most recent draft
      const sortedDrafts = drafts.sort(
        (a, b) => new Date(b.lastSavedAt).getTime() - new Date(a.lastSavedAt).getTime()
      );

      const mostRecentDraft = sortedDrafts[0];

      // Only show if draft is less than 7 days old
      const draftAge = Date.now() - new Date(mostRecentDraft.lastSavedAt).getTime();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (draftAge < sevenDays) {
        setState({ hasDraft: true, draft: mostRecentDraft, isLoading: false });
      } else {
        // Clean up old drafts
        drafts.forEach((draft) => {
          const age = Date.now() - new Date(draft.lastSavedAt).getTime();
          if (age >= sevenDays) {
            deleteDraft(draft.chapterId);
          }
        });
        setState({ hasDraft: false, draft: null, isLoading: false });
      }
    };

    checkForDrafts();
  }, [chapterId]);

  const recoverDraft = useCallback(() => {
    if (state.draft && onRecover) {
      onRecover(state.draft);
    }
    setIsDismissed(true);
  }, [state.draft, onRecover]);

  const discardDraft = useCallback(() => {
    if (state.draft) {
      if (onDiscard) {
        onDiscard(state.draft);
      }
      deleteDraft(state.draft.chapterId);
    }
    setState({ hasDraft: false, draft: null, isLoading: false });
    setIsDismissed(true);
  }, [state.draft, onDiscard]);

  const dismissBanner = useCallback(() => {
    setIsDismissed(true);
  }, []);

  return {
    ...state,
    isDismissed,
    recoverDraft,
    discardDraft,
    dismissBanner,
    showBanner: state.hasDraft && !isDismissed,
  };
}
