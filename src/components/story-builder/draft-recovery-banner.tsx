import { formatDistanceToNow } from 'date-fns';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DraftData } from './hooks/use-auto-save';

interface DraftRecoveryBannerProps {
  draft: DraftData;
  onContinue: () => void;
  onDiscard: () => void;
  onPreview?: () => void;
  onDismiss: () => void;
}

export function DraftRecoveryBanner({
  draft,
  onContinue,
  onDiscard,
  onPreview,
  onDismiss,
}: DraftRecoveryBannerProps) {
  const timeAgo = formatDistanceToNow(new Date(draft.lastSavedAt), { addSuffix: true });

  return (
    <div className="border-b border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-amber-100 p-2 dark:bg-amber-900/50">
            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
              You have an unsaved draft from {timeAgo}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              "{draft.title}" &bull; {draft.wordCount.toLocaleString()} words
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onPreview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onPreview}
              className="text-amber-700 hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-100"
            >
              Preview
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDiscard}
            className="text-amber-700 hover:bg-amber-100 hover:text-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-100"
          >
            Discard
          </Button>
          <Button
            size="sm"
            onClick={onContinue}
            className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
          >
            Continue Editing
          </Button>
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
