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
import { colors } from '@/constants';
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
          <DialogTitle
            className="flex items-center gap-2 font-serif"
            style={{ color: colors.text.primary }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
            >
              <GitMerge className="h-4 w-4" style={{ color: '#10b981' }} />
            </div>
            Merge Request
          </DialogTitle>
          <DialogDescription
            className="font-mono text-sm"
            style={{ color: colors.text.secondaryOpacity70 }}
          >
            Merge this submission into the story
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* PR Info */}
          {pullRequest && (
            <div
              className="rounded-xl border border-black/5 p-4"
              style={{ backgroundColor: `${colors.brand.blue}08` }}
            >
              <p className="font-medium" style={{ color: colors.text.primary }}>
                {pullRequest.title}
              </p>
              {pullRequest.description && (
                <p
                  className="mt-1 line-clamp-2 font-mono text-sm"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  {pullRequest.description}
                </p>
              )}
            </div>
          )}

          {/* Status Checks */}
          <div className="space-y-2">
            <Label
              className="font-mono text-xs tracking-wider uppercase"
              style={{ color: colors.text.secondaryOpacity65 }}
            >
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
                <span className="font-mono text-sm" style={{ color: colors.text.primary }}>
                  Approvals
                </span>
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
                <span className="font-mono text-sm" style={{ color: colors.text.primary }}>
                  {hasBlockers ? 'Has blockers' : 'No blockers'}
                </span>
              </div>
            </div>
          </div>

          {/* Warning if can't merge */}
          {!canMerge && (
            <div
              className="flex items-start gap-2 rounded-xl border p-3"
              style={{
                borderColor: `${colors.brand.orange}40`,
                backgroundColor: `${colors.brand.orange}10`,
              }}
            >
              <AlertTriangle className="mt-0.5 h-4 w-4" style={{ color: colors.brand.orange }} />
              <p className="font-mono text-sm" style={{ color: colors.brand.orange }}>
                This request needs more approvals or has blocking reviews.
              </p>
            </div>
          )}

          {/* Merge Message */}
          <div className="space-y-2">
            <Label className="font-medium" style={{ color: colors.text.primary }}>
              Merge Message (optional)
            </Label>
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
                <p className="font-medium" style={{ color: colors.text.primary }}>
                  Delete source after merge
                </p>
                <p className="font-mono text-xs" style={{ color: colors.text.secondaryOpacity65 }}>
                  Remove the draft content
                </p>
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
                <p className="font-medium" style={{ color: colors.text.primary }}>
                  Notify the author
                </p>
                <p className="font-mono text-xs" style={{ color: colors.text.secondaryOpacity65 }}>
                  Send a notification
                </p>
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
            className="gap-2 font-mono text-white"
            style={{ backgroundColor: '#10b981' }}
          >
            <GitMerge className="h-4 w-4" />
            Confirm Merge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
