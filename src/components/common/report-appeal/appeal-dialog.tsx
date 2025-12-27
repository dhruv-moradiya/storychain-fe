import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, AlertTriangle, Send, Plus, X, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { type CreateAppealData } from '@/type/appeal.type';

interface AppealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateAppealData) => Promise<void>;
  banHistoryId: string;
  banReason?: string;
  banType?: string;
  banExpiresAt?: string;
  isLoading?: boolean;
}

export function AppealDialog({
  open,
  onOpenChange,
  onSubmit,
  banHistoryId,
  banReason,
  banType,
  banExpiresAt,
  isLoading = false,
}: AppealDialogProps) {
  const [appealReason, setAppealReason] = useState('');
  const [explanation, setExplanation] = useState('');
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'info' | 'details' | 'evidence'>('info');

  const resetForm = () => {
    setAppealReason('');
    setExplanation('');
    setEvidenceUrls([]);
    setNewUrl('');
    setError('');
    setStep('info');
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
    if (appealReason.length < 10) {
      setError('Please provide a reason for your appeal (at least 10 characters)');
      return;
    }
    if (explanation.length < 50) {
      setError('Please provide a detailed explanation (at least 50 characters)');
      return;
    }

    const data: CreateAppealData = {
      banHistoryId,
      appealReason,
      explanation,
      evidenceUrls: evidenceUrls.length > 0 ? evidenceUrls : undefined,
    };

    try {
      await onSubmit(data);
      resetForm();
      onOpenChange(false);
    } catch {
      setError('Failed to submit appeal. Please try again.');
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    onOpenChange(isOpen);
  };

  const canProceed = () => {
    if (step === 'info') return true;
    if (step === 'details') return appealReason.length >= 10 && explanation.length >= 50;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Scale className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            Appeal Your Ban
          </DialogTitle>
          <DialogDescription>
            Submit an appeal if you believe this action was made in error
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {['info', 'details', 'evidence'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors',
                  step === s
                    ? 'bg-primary text-primary-foreground'
                    : ['info', 'details', 'evidence'].indexOf(step) > i
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                )}
                animate={{ scale: step === s ? 1.1 : 1 }}
              >
                {i + 1}
              </motion.div>
              {i < 2 && (
                <div
                  className={cn(
                    'h-0.5 w-8 rounded-full transition-colors',
                    ['info', 'details', 'evidence'].indexOf(step) > i ? 'bg-primary/50' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-muted/30 space-y-3 rounded-lg border p-4">
                <h4 className="text-sm font-medium">Ban Information</h4>
                <div className="space-y-2 text-sm">
                  {banType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="secondary">{banType}</Badge>
                    </div>
                  )}
                  {banReason && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground shrink-0">Reason:</span>
                      <span className="text-right">{banReason}</span>
                    </div>
                  )}
                  {banExpiresAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{new Date(banExpiresAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      Before you proceed
                    </p>
                    <p className="mt-1 text-amber-700 dark:text-amber-300">
                      Please review our community guidelines. False or frivolous appeals may result
                      in extended restrictions.
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="appealReason">Why are you appealing?</Label>
                <Input
                  id="appealReason"
                  placeholder="Briefly describe why you believe this action was wrong"
                  value={appealReason}
                  onChange={(e) => {
                    setAppealReason(e.target.value);
                    setError('');
                  }}
                  maxLength={200}
                />
                <p className="text-muted-foreground text-xs">{appealReason.length}/200</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="explanation">Detailed explanation</Label>
                <Textarea
                  id="explanation"
                  placeholder="Provide a detailed explanation of your situation. Include any context that might help us understand why this action should be reversed..."
                  value={explanation}
                  onChange={(e) => {
                    setExplanation(e.target.value);
                    setError('');
                  }}
                  rows={5}
                  className="resize-none"
                  maxLength={2000}
                />
                <p className="text-muted-foreground text-xs">
                  {explanation.length}/2000 (minimum 50 characters)
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
                <p className="text-muted-foreground text-xs">
                  Add links to screenshots, documents, or other evidence that supports your appeal
                </p>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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
                  <Label className="text-muted-foreground text-xs">Added evidence:</Label>
                  <div className="space-y-2">
                    {evidenceUrls.map((url) => (
                      <motion.div
                        key={url}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-muted/30 flex items-center gap-2 rounded-md border p-2"
                      >
                        <LinkIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
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

              <div className="bg-muted/30 rounded-lg border p-4">
                <h4 className="mb-2 text-sm font-medium">Review your appeal</h4>
                <div className="text-muted-foreground space-y-1 text-sm">
                  <p>
                    <strong>Reason:</strong> {appealReason}
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
          {step !== 'info' && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(step === 'evidence' ? 'details' : 'info')}
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
          {step !== 'evidence' ? (
            <Button
              onClick={() => {
                if (step === 'info') {
                  setStep('details');
                } else if (canProceed()) {
                  setStep('evidence');
                }
              }}
              disabled={step === 'details' && !canProceed()}
            >
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Appeal
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
