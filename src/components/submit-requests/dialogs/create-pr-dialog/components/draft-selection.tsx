import { FileText, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DraftOption } from '../create-pr-dialog.types';

interface DraftSelectionProps {
  drafts: DraftOption[];
  selectedDraftId: string;
  onSelect: (draftId: string) => void;
}

export function DraftSelection({ drafts, selectedDraftId, onSelect }: DraftSelectionProps) {
  return (
    <div className="space-y-2">
      {drafts.map((draft) => {
        const isSelected = selectedDraftId === draft.id;
        return (
          <button
            key={draft.id}
            onClick={() => onSelect(draft.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all',
              isSelected
                ? 'border-[#10b981] bg-[#10b981]/5'
                : 'border-black/10 hover:border-black/20 hover:bg-black/[0.02]'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                isSelected ? 'bg-[#10b981]/15' : 'bg-black/5'
              )}
            >
              <FileText
                className={cn('h-4 w-4', isSelected ? 'text-[#10b981]' : 'text-text-secondary-65')}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-text-primary truncate text-sm font-medium">{draft.title}</p>
              <div className="text-text-secondary-65 flex items-center gap-2 font-mono text-xs">
                <Clock className="h-3 w-3" />
                <span>{draft.updatedAt}</span>
                <span>·</span>
                <span>{draft.wordCount} words</span>
              </div>
            </div>
            {isSelected && (
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
