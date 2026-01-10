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
import { colors } from '@/constants';
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
            className="flex items-center gap-2 font-serif"
            style={{ color: isReject ? colors.brand.pink[500] : colors.text.primary }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: isReject ? `${colors.brand.pink[500]}15` : 'rgba(0,0,0,0.05)',
              }}
            >
              {isReject ? (
                <X className="h-4 w-4" style={{ color: colors.brand.pink[500] }} />
              ) : (
                <GitPullRequestClosed
                  className="h-4 w-4"
                  style={{ color: colors.text.secondaryOpacity65 }}
                />
              )}
            </div>
            {isReject ? 'Reject Request' : 'Close Request'}
          </DialogTitle>
          <DialogDescription
            className="font-mono text-sm"
            style={{ color: colors.text.secondaryOpacity70 }}
          >
            {isReject
              ? 'This will permanently reject this submission.'
              : 'This will close the request without merging.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* PR Title */}
          <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
            <p className="font-mono text-xs" style={{ color: colors.text.secondaryOpacity65 }}>
              Request
            </p>
            <p className="mt-1 font-medium" style={{ color: colors.text.primary }}>
              {prTitle}
            </p>
          </div>

          {/* Warning for reject */}
          {isReject && (
            <div
              className="flex items-start gap-2 rounded-xl border p-3"
              style={{
                borderColor: `${colors.brand.pink[500]}40`,
                backgroundColor: `${colors.brand.pink[500]}10`,
              }}
            >
              <AlertTriangle className="mt-0.5 h-4 w-4" style={{ color: colors.brand.pink[500] }} />
              <p className="font-mono text-sm" style={{ color: colors.brand.pink[500] }}>
                This action cannot be undone. The submission will be marked as rejected.
              </p>
            </div>
          )}

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label
              className="font-mono text-xs tracking-wider uppercase"
              style={{ color: colors.text.secondaryOpacity65 }}
            >
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
                      ? 'border-black/20 bg-white shadow-sm'
                      : 'border-black/5 hover:border-black/15 hover:bg-black/[0.02]'
                  )}
                  style={{
                    borderColor:
                      formData.selectedReason === reason
                        ? isReject
                          ? `${colors.brand.pink[500]}40`
                          : 'rgba(0,0,0,0.2)'
                        : undefined,
                    backgroundColor:
                      formData.selectedReason === reason
                        ? isReject
                          ? `${colors.brand.pink[500]}05`
                          : 'white'
                        : undefined,
                  }}
                >
                  <span className="font-mono text-sm" style={{ color: colors.text.primary }}>
                    {reason}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label className="font-medium" style={{ color: colors.text.primary }}>
              Additional Details (optional)
            </Label>
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
            className="gap-2 font-mono text-white"
            style={{ backgroundColor: isReject ? colors.brand.pink[500] : colors.text.secondary }}
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
