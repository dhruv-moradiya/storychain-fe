import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, AlertTriangle, Send, X, Plus, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  type ReportType,
  type ReportReason,
  type CreateReportData,
  REPORT_REASONS,
} from '@/type/report.type';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateReportData) => Promise<void>;
  reportType: ReportType;
  relatedId: string;
  relatedTitle?: string;
  isLoading?: boolean;
}

export function ReportDialog({
  open,
  onOpenChange,
  onSubmit,
  reportType,
  relatedId,
  relatedTitle,
  isLoading = false,
}: ReportDialogProps) {
  const [reason, setReason] = useState<ReportReason | ''>('');
  const [description, setDescription] = useState('');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'reason' | 'details' | 'evidence'>('reason');

  const resetForm = () => {
    setReason('');
    setDescription('');
    setEvidenceUrls([]);
    setNewUrl('');
    setError('');
    setStep('reason');
  };

  const addEvidenceUrl = () => {
    if (!newUrl.trim()) return;

    try {
      new URL(newUrl);
      if (!evidenceUrls.includes(newUrl.trim())) {
        setEvidenceUrls([...evidenceUrls, newUrl.trim()]);
      }
      setNewUrl('');
      setError('');
    } catch {
      setError('Please enter a valid URL');
    }
  };

  const removeEvidenceUrl = (url: string) => {
    setEvidenceUrls(evidenceUrls.filter((u) => u !== url));
  };

  const handleSubmit = async () => {
    if (!reason) {
      setError('Please select a reason');
      return;
    }
    if (description.length < 10) {
      setError('Please provide more details (at least 10 characters)');
      return;
    }

    const data: CreateReportData = {
      reportType,
      reason,
      description,
      evidenceUrls: evidenceUrls.length > 0 ? evidenceUrls : undefined,
      ...(reportType === 'CHAPTER' && { relatedChapterId: relatedId }),
      ...(reportType === 'COMMENT' && { relatedCommentId: relatedId }),
      ...(reportType === 'USER' && { relatedUserId: relatedId }),
      ...(reportType === 'STORY' && { relatedStoryId: relatedId }),
    };

    try {
      await onSubmit(data);
      resetForm();
      onOpenChange(false);
    } catch {
      setError('Failed to submit report. Please try again.');
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <Flag className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            Report {reportType.charAt(0) + reportType.slice(1).toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            {relatedTitle ? (
              <>Help us understand what's wrong with "{relatedTitle}"</>
            ) : (
              <>Help us understand what's wrong with this content</>
            )}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'reason' && (
            <motion.div
              key="reason"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <Label className="text-sm font-medium">What's the issue?</Label>
              <RadioGroup
                value={reason}
                onValueChange={(value) => {
                  setReason(value as ReportReason);
                  setError('');
                }}
                className="space-y-2"
              >
                {REPORT_REASONS.map((item) => (
                  <motion.div
                    key={item.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <label
                      htmlFor={item.value}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors',
                        reason === item.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      )}
                    >
                      <RadioGroupItem value={item.value} id={item.value} className="mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </label>
                  </motion.div>
                ))}
              </RadioGroup>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm text-red-500"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {error}
                </motion.p>
              )}
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">Reporting for:</p>
                <p className="text-sm font-medium">
                  {REPORT_REASONS.find((r) => r.value === reason)?.label}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional details</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide specific details about the issue. This helps our team review your report faster..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError('');
                  }}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/1000 characters (minimum 10)
                </p>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm text-red-500"
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {error}
                </motion.p>
              )}
            </motion.div>
          )}

          {step === 'evidence' && (
            <motion.div
              key="evidence"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Supporting evidence (optional)</Label>
                <p className="text-xs text-muted-foreground">
                  Add links to screenshots, documents, or other evidence that supports your report
                </p>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="https://example.com/evidence"
                      value={newUrl}
                      onChange={(e) => {
                        setNewUrl(e.target.value);
                        setError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addEvidenceUrl();
                        }
                      }}
                      className="pl-9"
                    />
                  </div>
                  <Button type="button" variant="outline" size="icon" onClick={addEvidenceUrl}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-sm text-red-500"
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {error}
                  </motion.p>
                )}
              </div>

              {evidenceUrls.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Added evidence:</Label>
                  <div className="space-y-2">
                    {evidenceUrls.map((url) => (
                      <motion.div
                        key={url}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 rounded-md border bg-muted/30 p-2"
                      >
                        <LinkIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="flex-1 truncate text-sm">{url}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => removeEvidenceUrl(url)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg border bg-muted/30 p-4">
                <h4 className="text-sm font-medium mb-2">Review your report</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <strong>Reason:</strong> {REPORT_REASONS.find((r) => r.value === reason)?.label}
                  </p>
                  <p>
                    <strong>Evidence:</strong> {evidenceUrls.length} link(s) attached
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="gap-2 sm:gap-0">
          {step !== 'reason' && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(step === 'evidence' ? 'details' : 'reason')}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          {step === 'reason' && (
            <Button
              onClick={() => {
                if (reason) {
                  setStep('details');
                } else {
                  setError('Please select a reason');
                }
              }}
            >
              Continue
            </Button>
          )}
          {step === 'details' && (
            <Button
              onClick={() => {
                if (description.length >= 10) {
                  setStep('evidence');
                } else {
                  setError('Please provide more details (at least 10 characters)');
                }
              }}
              disabled={description.length < 10}
            >
              Continue
            </Button>
          )}
          {step === 'evidence' && (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
