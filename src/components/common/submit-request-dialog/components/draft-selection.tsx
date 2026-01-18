import { FileText, Clock, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DraftOption } from '../submit-request-dialog.types';

interface DraftSelectionProps {
  drafts: DraftOption[];
  selectedDraftId: string;
  onSelect: (draftId: string) => void;
  isLoading?: boolean;
}

export function DraftSelection({
  drafts,
  selectedDraftId,
  onSelect,
  isLoading,
}: DraftSelectionProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (drafts.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-text-secondary-65 text-sm">No drafts available</p>
        <p className="text-text-secondary-65 mt-1 text-xs">
          Create a draft in the Story Builder first
        </p>
      </div>
    );
  }

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
