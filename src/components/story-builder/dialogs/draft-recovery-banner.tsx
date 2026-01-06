import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDraftRecoveryBannerLogic } from '@/hooks/components/storyBuilder/useDraftRecoveryBannerLogic';
import { Activity, useState } from 'react';
import { DraftSelectionDialog } from './draft-selection-dialog';

export const DraftRecoveryBanner = () => {
  const [isDraftSelectionOpen, setIsDraftSelectionOpen] = useState(false);

  const { banner, isVisible, isLoading, actions, draftList } =
    useDraftRecoveryBannerLogic(setIsDraftSelectionOpen);

  if (isLoading) return <div className="p-3 text-sm text-amber-700">Checking drafts...</div>;
  if (banner.count === 0) return null;

  return (
    <div className="border-b bg-amber-50 dark:bg-amber-950/30">
      <Activity mode={isVisible ? 'visible' : 'hidden'} name="Draft Recovery Banner">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-amber-100 p-2 dark:bg-amber-900/50">
              <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                {banner.count > 1
                  ? `You have ${banner.count} drafts with unsaved changes`
                  : 'You have a draft with unsaved updates'}
              </p>

              <p className="text-xs text-amber-700 dark:text-amber-300">
                Most recent: "{banner.latestTitle}" {banner.words && `• ${banner.words} words`}{' '}
                {banner.lastSavedAt && `• saved ${banner.lastSavedAt}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {banner.count > 1 && (
              <Button variant="ghost" size="sm" onClick={actions.handleDiscardLatest}>
                Discard most recent
              </Button>
            )}
            <Button size="sm" onClick={actions.handleView}>
              View drafts
            </Button>
            <Button variant="ghost" size="icon" onClick={actions.handleClose} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Activity>

      <DraftSelectionDialog
        open={isDraftSelectionOpen}
        onOpenChange={setIsDraftSelectionOpen}
        drafts={draftList}
      />
    </div>
  );
};
