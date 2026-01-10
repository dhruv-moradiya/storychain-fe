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
import { cn } from '@/lib/utils';
import { GitPullRequestClosed, X, AlertTriangle } from 'lucide-react';

interface CloseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: CloseData) => void;
  variant?: 'close' | 'reject';
  prTitle?: string;
}

interface CloseData {
  reason: string;
  selectedReason: string;
}

const CLOSE_REASONS = [
  'Duplicate submission',
  'Out of scope',
  'Author request',
  'Resolved differently',
  'Other',
];

const REJECT_REASONS = [
  'Does not meet quality standards',
  'Inconsistent with story direction',
  'Contains inappropriate content',
  'Plagiarism or copyright issues',
  'Other',
];

export function CloseDialog({
  open,
  onOpenChange,
  onConfirm,
  variant = 'close',
  prTitle = 'Submit Request',
}: CloseDialogProps) {
  const [formData, setFormData] = useState<CloseData>({
    reason: '',
    selectedReason: '',
  });

  const handleConfirm = () => {
    onConfirm?.(formData);
    onOpenChange(false);
    setFormData({ reason: '', selectedReason: '' });
  };

  const isReject = variant === 'reject';
  const reasons = isReject ? REJECT_REASONS : CLOSE_REASONS;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle
            className={cn(
              'flex items-center gap-2 font-serif',
              isReject ? 'text-brand-pink-500' : 'text-text-primary'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg',
                isReject ? 'bg-brand-pink-500/15' : 'bg-black/5'
              )}
            >
              {isReject ? (
                <X className="text-brand-pink-500 h-4 w-4" />
              ) : (
                <GitPullRequestClosed className="text-text-secondary-65 h-4 w-4" />
              )}
            </div>
            {isReject ? 'Reject Request' : 'Close Request'}
          </DialogTitle>
          <DialogDescription className="text-text-secondary-70 font-mono text-sm">
            {isReject
              ? 'This will permanently reject this submission.'
              : 'This will close the request without merging.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* PR Title */}
          <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
            <p className="text-text-secondary-65 font-mono text-xs">Request</p>
            <p className="text-text-primary mt-1 font-medium">{prTitle}</p>
          </div>

          {/* Warning for reject */}
          {isReject && (
            <div className="border-brand-pink-500/40 bg-brand-pink-500/10 flex items-start gap-2 rounded-xl border p-3">
              <AlertTriangle className="text-brand-pink-500 mt-0.5 h-4 w-4" />
              <p className="text-brand-pink-500 font-mono text-sm">
                This action cannot be undone. The submission will be marked as rejected.
              </p>
            </div>
          )}

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
              Reason
            </Label>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setFormData((prev) => ({ ...prev, selectedReason: reason }))}
                  className={cn(
                    'w-full rounded-xl border p-3 text-left transition-all',
                    formData.selectedReason === reason
                      ? isReject
                        ? 'border-brand-pink-500/40 bg-brand-pink-500/5 shadow-sm'
                        : 'border-black/20 bg-white shadow-sm'
                      : 'border-black/5 hover:border-black/15 hover:bg-black/[0.02]'
                  )}
                >
                  <span className="text-text-primary font-mono text-sm">{reason}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">Additional Details (optional)</Label>
            <Textarea
              placeholder="Provide more context..."
              value={formData.reason}
              onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
              rows={3}
              className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
            />
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
            disabled={!formData.selectedReason}
            className={cn(
              'gap-2 font-mono text-white',
              isReject
                ? 'bg-brand-pink-500 hover:bg-brand-pink-400'
                : 'bg-text-secondary hover:bg-text-secondary/90'
            )}
          >
            {isReject ? (
              <>
                <X className="h-4 w-4" />
                Reject Request
              </>
            ) : (
              <>
                <GitPullRequestClosed className="h-4 w-4" />
                Close Request
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
