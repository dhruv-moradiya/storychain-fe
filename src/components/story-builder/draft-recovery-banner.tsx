import { formatDistanceToNow } from 'date-fns';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DraftData } from './hooks/use-auto-save';

interface DraftRecoveryBannerProps {
  drafts: DraftData[];
  onContinue: (draft: DraftData) => void;
  onDiscard: (draft: DraftData) => void;
  onViewAll?: () => void;
  onDismiss: () => void;
}

export function DraftRecoveryBanner({
  drafts,
  onContinue,
  onDiscard,
  onViewAll,
  onDismiss,
}: DraftRecoveryBannerProps) {
  if (drafts.length === 0) return null;

  const hasMultipleDrafts = drafts.length > 1;
  const latestDraft = drafts.sort((a, b) => b.lastSavedAt.getTime() - a.lastSavedAt.getTime())[0];
  const timeAgo = formatDistanceToNow(new Date(latestDraft.lastSavedAt), { addSuffix: true });

  return (
    <div className="border-b border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-amber-100 p-2 dark:bg-amber-900/50">
            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex flex-col">
            {hasMultipleDrafts ? (
              <>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  You have {drafts.length} unsaved drafts
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Latest: "{latestDraft.title}" &bull; {timeAgo}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  You have an unsaved draft from {timeAgo}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  "{latestDraft.title}" &bull; {latestDraft.wordCount || 0} words
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasMultipleDrafts ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDiscard(latestDraft)}
                className="text-amber-700 hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-100"
              >
                Discard Latest
              </Button>
              {onViewAll && (
                <Button
                  size="sm"
                  onClick={onViewAll}
                  className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
                >
                  View All Drafts
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDiscard(latestDraft)}
                className="text-amber-700 hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-100"
              >
                Discard
              </Button>
              <Button
                size="sm"
                onClick={() => onContinue(latestDraft)}
                className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
              >
                Continue Editing
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="h-8 w-8 text-amber-700 hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
