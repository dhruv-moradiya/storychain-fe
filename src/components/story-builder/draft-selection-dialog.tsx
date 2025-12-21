import { formatDistanceToNow } from 'date-fns';
import { FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { DraftData } from './hooks/use-auto-save';

interface DraftSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drafts: DraftData[];
  onSelect: (draft: DraftData) => void;
  onDiscard: (draft: DraftData) => void;
}

export function DraftSelectionDialog({
  open,
  onOpenChange,
  drafts,
  onSelect,
  onDiscard,
}: DraftSelectionDialogProps) {
  const sortedDrafts = drafts.sort((a, b) => b.lastSavedAt.getTime() - a.lastSavedAt.getTime());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select a Draft</DialogTitle>
          <DialogDescription>
            You have {sortedDrafts.length} unsaved drafts. Select one to continue editing.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-3">
            {sortedDrafts.map((draft) => (
              <DraftCard
                key={draft.draftId}
                draft={draft}
                onSelect={() => onSelect(draft)}
                onDiscard={() => onDiscard(draft)}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface DraftCardProps {
  draft: DraftData;
  onSelect: () => void;
  onDiscard: () => void;
}

function DraftCard({ draft, onSelect, onDiscard }: DraftCardProps) {
  const timeAgo = formatDistanceToNow(new Date(draft.lastSavedAt), { addSuffix: true });

  return (
    <div className="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-3 transition-colors">
      <div className="rounded-md bg-amber-100 p-2 dark:bg-amber-900/50">
        <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium">{draft.title}</h4>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {draft.wordCount} words &bull; Last saved {timeAgo}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onDiscard();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={onSelect}>
          Continue
        </Button>
      </div>
    </div>
  );
}
