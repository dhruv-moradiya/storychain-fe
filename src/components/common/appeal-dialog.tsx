import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Scale, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export type AppealReason =
  | 'WRONGFUL_BAN'
  | 'MISUNDERSTANDING'
  | 'CONTEXT_MISSING'
  | 'TECHNICAL_ERROR'
  | 'ACCOUNT_COMPROMISED'
  | 'OTHER';

interface AppealDialogProps {
  banId?: string;
  banReason?: string;
  bannedAt?: Date;
  trigger?: React.ReactNode;
  onAppeal?: (data: AppealData) => Promise<void>;
}

export interface AppealData {
  banId?: string;
  reason: AppealReason;
  explanation: string;
  additionalContext: string;
  contactEmail: string;
}

const appealReasons: Array<{
  value: AppealReason;
  label: string;
  description: string;
}> = [
  {
    value: 'WRONGFUL_BAN',
    label: 'Wrongful Ban',
    description: 'I believe I was banned by mistake and did not violate any rules',
  },
  {
    value: 'MISUNDERSTANDING',
    label: 'Misunderstanding',
    description: 'My actions were misinterpreted and I can explain the situation',
  },
  {
    value: 'CONTEXT_MISSING',
    label: 'Missing Context',
    description: 'Important context was not considered in the ban decision',
  },
  {
    value: 'TECHNICAL_ERROR',
    label: 'Technical Error',
    description: 'A bug or technical issue caused content that led to my ban',
  },
  {
    value: 'ACCOUNT_COMPROMISED',
    label: 'Account Compromised',
    description: 'My account was hacked or used by someone else without permission',
  },
  {
    value: 'OTHER',
    label: 'Other',
    description: 'Another reason not listed above',
  },
];

export function AppealDialog({ banId, banReason, bannedAt, trigger, onAppeal }: AppealDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<AppealReason | ''>('');
  const [explanation, setExplanation] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      addNotification({
        type: 'warning',
        title: 'Selection Required',
        message: 'Please select a reason for your appeal',
      });
      return;
    }

    if (explanation.length < 50) {
      toast.warning({
        type: 'warning',

        message: 'Please provide a more detailed explanation (at least 50 characters)',
      });
      return;
    }

    if (explanation.length > 2000) {
      addNotification({
        type: 'warning',
        title: 'Explanation Too Long',
        message: 'Explanation is too long (max 2000 characters)',
      });
      return;
    }

    if (!contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      addNotification({
        type: 'warning',
        title: 'Invalid Email',
        message: 'Please provide a valid email address',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (onAppeal) {
        await onAppeal({
          banId,
          reason,
          explanation,
          additionalContext,
          contactEmail,
        });
      } else {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      addNotification({
        type: 'success',
        title: 'Appeal Submitted',
        message: 'Our moderation team will review your appeal within 48-72 hours.',
      });
      setOpen(false);
      resetForm();
    } catch {
      addNotification({
        type: 'warning',
        title: 'Submission Failed',
        message: 'Failed to submit appeal. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setReason('');
    setExplanation('');
    setAdditionalContext('');
    setContactEmail('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isSubmitting) {
      setOpen(newOpen);
      if (!newOpen) {
        resetForm();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Scale className="h-4 w-4" />
            Submit Appeal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="text-primary h-5 w-5" />
            Submit Ban Appeal
          </DialogTitle>
          <DialogDescription>
            If you believe your ban was unjust, you can submit an appeal for review by our
            moderation team.
          </DialogDescription>
        </DialogHeader>

        {/* Ban Info Banner */}
        {(banReason || bannedAt) && (
          <div className="bg-destructive/10 border-destructive/20 flex items-start gap-3 rounded-lg border p-4">
            <AlertCircle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
            <div className="space-y-1">
              <p className="text-destructive text-sm font-medium">Ban Information</p>
              {banReason && (
                <p className="text-muted-foreground text-sm">
                  <strong>Reason:</strong> {banReason}
                </p>
              )}
              {bannedAt && (
                <p className="text-muted-foreground text-sm">
                  <strong>Date:</strong> {bannedAt.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-6 py-4">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Why are you appealing this ban? <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={reason}
              onValueChange={(v) => setReason(v as AppealReason)}
              className="space-y-2"
            >
              {appealReasons.map((item) => (
                <label
                  key={item.value}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors',
                    reason === item.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  )}
                >
                  <RadioGroupItem value={item.value} className="mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <Label htmlFor="explanation" className="text-sm font-medium">
              Detailed Explanation <span className="text-destructive">*</span>
            </Label>
            <p className="text-muted-foreground text-xs">
              Please explain your situation in detail. Include any relevant context that might help
              us understand what happened.
            </p>
            <Textarea
              id="explanation"
              placeholder="Explain why you believe your ban should be lifted..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={2000}
            />
            <p className="text-muted-foreground text-right text-xs">
              {explanation.length}/2000 characters (min 50)
            </p>
          </div>

          {/* Additional Context */}
          <div className="space-y-2">
            <Label htmlFor="context" className="text-sm font-medium">
              Additional Context (Optional)
            </Label>
            <p className="text-muted-foreground text-xs">
              Include any links, screenshots descriptions, or other evidence that supports your
              appeal.
            </p>
            <Textarea
              id="context"
              placeholder="Any additional information that might help your case..."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              className="min-h-[80px] resize-none"
              maxLength={1000}
            />
            <p className="text-muted-foreground text-right text-xs">
              {additionalContext.length}/1000 characters
            </p>
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Contact Email <span className="text-destructive">*</span>
            </Label>
            <p className="text-muted-foreground text-xs">
              We'll use this email to notify you about your appeal status.
            </p>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          {/* Guidelines */}
          <div className="bg-muted/50 space-y-2 rounded-lg p-4">
            <p className="text-sm font-medium">Appeal Guidelines</p>
            <ul className="text-muted-foreground list-inside list-disc space-y-1 text-xs">
              <li>Be honest and provide accurate information</li>
              <li>Avoid submitting multiple appeals for the same ban</li>
              <li>Appeals are typically reviewed within 48-72 hours</li>
              <li>False information may result in permanent ban</li>
              <li>Our decision after review is final</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!reason || explanation.length < 50 || !contactEmail || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Scale className="h-4 w-4" />
                Submit Appeal
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AppealDialog;
