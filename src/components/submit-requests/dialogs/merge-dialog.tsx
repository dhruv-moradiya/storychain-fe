import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { GitMerge, AlertTriangle, Check, X } from 'lucide-react';
import type { IPullRequest } from '@/type/pull-request.type';

interface MergeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: MergeData) => void;
  pullRequest?: IPullRequest;
}

interface MergeData {
  mergeMessage: string;
  deleteSourceBranch: boolean;
  notifyAuthor: boolean;
}

export function MergeDialog({ open, onOpenChange, onConfirm, pullRequest }: MergeDialogProps) {
  const [formData, setFormData] = useState<MergeData>({
    mergeMessage: '',
    deleteSourceBranch: false,
    notifyAuthor: true,
  });

  const handleConfirm = () => {
    onConfirm?.(formData);
    onOpenChange(false);
    setFormData({
      mergeMessage: '',
      deleteSourceBranch: false,
      notifyAuthor: true,
    });
  };

  const approvalsReceived = pullRequest?.approvalsStatus?.received || 0;
  const approvalsRequired = pullRequest?.approvalsStatus?.required || 1;
  const hasBlockers = (pullRequest?.approvalsStatus?.blockers?.length || 0) > 0;
  const canMerge = pullRequest?.approvalsStatus?.canMerge ?? approvalsReceived >= approvalsRequired;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 font-serif">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/10">
              <GitMerge className="h-4 w-4 text-[#10b981]" />
            </div>
            Merge Request
          </DialogTitle>
          <DialogDescription className="text-text-secondary-70 font-mono text-sm">
            Merge this submission into the story
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* PR Info */}
          {pullRequest && (
            <div className="bg-brand-blue/[0.08] rounded-xl border border-black/5 p-4">
              <p className="text-text-primary font-medium">{pullRequest.title}</p>
              {pullRequest.description && (
                <p className="text-text-secondary-65 mt-1 line-clamp-2 font-mono text-sm">
                  {pullRequest.description}
                </p>
              )}
            </div>
          )}

          {/* Status Checks */}
          <div className="space-y-2">
            <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
              Merge Checks
            </Label>

            {/* Approvals */}
            <div
              className={cn(
                'flex items-center justify-between rounded-xl border p-3',
                canMerge ? 'border-green-200 bg-green-50/50' : 'border-amber-200 bg-amber-50/50'
              )}
            >
              <div className="flex items-center gap-2">
                {canMerge ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                )}
                <span className="text-text-primary font-mono text-sm">Approvals</span>
              </div>
              <span
                className={cn(
                  'font-mono text-sm font-medium',
                  canMerge ? 'text-green-600' : 'text-amber-600'
                )}
              >
                {approvalsReceived} / {approvalsRequired}
              </span>
            </div>

            {/* Blockers */}
            <div
              className={cn(
                'flex items-center justify-between rounded-xl border p-3',
                hasBlockers ? 'border-red-200 bg-red-50/50' : 'border-green-200 bg-green-50/50'
              )}
            >
              <div className="flex items-center gap-2">
                {hasBlockers ? (
                  <X className="h-4 w-4 text-red-600" />
                ) : (
                  <Check className="h-4 w-4 text-green-600" />
                )}
                <span className="text-text-primary font-mono text-sm">
                  {hasBlockers ? 'Has blockers' : 'No blockers'}
                </span>
              </div>
            </div>
          </div>

          {/* Warning if can't merge */}
          {!canMerge && (
            <div className="border-brand-orange/40 bg-brand-orange/10 flex items-start gap-2 rounded-xl border p-3">
              <AlertTriangle className="text-brand-orange mt-0.5 h-4 w-4" />
              <p className="text-brand-orange font-mono text-sm">
                This request needs more approvals or has blocking reviews.
              </p>
            </div>
          )}

          {/* Merge Message */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">Merge Message (optional)</Label>
            <Textarea
              placeholder="Add a message for this merge..."
              value={formData.mergeMessage}
              onChange={(e) => setFormData((prev) => ({ ...prev, mergeMessage: e.target.value }))}
              rows={2}
              className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 rounded-xl border border-black/5 bg-black/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">Delete source after merge</p>
                <p className="text-text-secondary-65 font-mono text-xs">Remove the draft content</p>
              </div>
              <Switch
                checked={formData.deleteSourceBranch}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, deleteSourceBranch: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">Notify the author</p>
                <p className="text-text-secondary-65 font-mono text-xs">Send a notification</p>
              </div>
              <Switch
                checked={formData.notifyAuthor}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, notifyAuthor: checked }))
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-black/10 font-mono hover:bg-black/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!canMerge}
            className="gap-2 bg-[#10b981] font-mono text-white hover:bg-[#059669]"
          >
            <GitMerge className="h-4 w-4" />
            Confirm Merge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
