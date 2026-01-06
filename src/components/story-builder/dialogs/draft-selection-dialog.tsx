import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { IChapterAutoSave } from '@/type/chapterAutoSave';
import { DraftCard } from './draft-card';

interface DraftSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drafts: IChapterAutoSave[];
}

function DraftSelectionDialog({ open, onOpenChange, drafts }: DraftSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select a Draft</DialogTitle>
          <DialogDescription>
            You have {drafts.length + 1} unsaved drafts. Select one to continue editing.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-3">
            {drafts.map((draft) => (
              <DraftCard {...draft} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export { DraftSelectionDialog };
export type { DraftSelectionDialogProps };
