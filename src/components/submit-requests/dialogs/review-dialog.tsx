import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import {
  Star,
  ChevronRight,
  ChevronLeft,
  Check,
  MessageSquare,
  AlertCircle,
  ThumbsUp,
  Send,
} from 'lucide-react';
import type { ReviewStatus, IReviewFeedback } from '@/type/pull-request.type';

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: ReviewFormData) => void;
  prTitle?: string;
}

interface ReviewFormData {
  reviewStatus: ReviewStatus;
  summary: string;
  feedback: IReviewFeedback[];
  overallRating: number;
}

const STEPS = ['Decision', 'Feedback', 'Summary'];

const REVIEW_SECTIONS = [
  { id: 'writing', label: 'Writing Quality' },
  { id: 'plot', label: 'Plot & Story' },
  { id: 'characters', label: 'Characters' },
  { id: 'pacing', label: 'Pacing' },
];

const REVIEW_DECISIONS: {
  value: ReviewStatus;
  label: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}[] = [
  {
    value: 'APPROVED',
    label: 'Approve',
    description: 'This request is ready to be merged',
    icon: Check,
    colorClass: 'text-[#10b981]',
    bgClass: 'bg-[#10b981]',
  },
  {
    value: 'CHANGES_REQUESTED',
    label: 'Request Changes',
    description: 'Changes need to be made before merging',
    icon: AlertCircle,
    colorClass: 'text-brand-orange',
    bgClass: 'bg-brand-orange',
  },
  {
    value: 'IN_REVIEW',
    label: 'Comment Only',
    description: 'Leave feedback without approving or requesting changes',
    icon: MessageSquare,
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue',
  },
];

function StarRating({
  value,
  onChange,
  size = 'md',
}: {
  value: number;
  onChange: (rating: number) => void;
  size?: 'sm' | 'md';
}) {
  const [hovered, setHovered] = useState(0);
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="p-0.5 focus:outline-none"
        >
          <Star
            className={cn(
              sizeClass,
              'transition-colors',
              (hovered || value) >= star ? 'fill-amber-400 text-amber-400' : 'text-black/20'
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewDialog({
  open,
  onOpenChange,
  onSubmit,
  prTitle = 'Submit Request',
}: ReviewDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ReviewFormData>({
    reviewStatus: 'APPROVED',
    summary: '',
    feedback: REVIEW_SECTIONS.map((section) => ({
      section: section.label,
      rating: 0,
      comment: '',
    })),
    overallRating: 0,
  });

  const updateFeedback = (index: number, updates: Partial<IReviewFeedback>) => {
    setFormData((prev) => ({
      ...prev,
      feedback: prev.feedback.map((f, i) => (i === index ? { ...f, ...updates } : f)),
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
    setCurrentStep(0);
    setFormData({
      reviewStatus: 'APPROVED',
      summary: '',
      feedback: REVIEW_SECTIONS.map((section) => ({
        section: section.label,
        rating: 0,
        comment: '',
      })),
      overallRating: 0,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.reviewStatus;
      case 1:
        return true;
      case 2:
        return formData.overallRating > 0;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 font-serif">
            <div className="bg-brand-blue/15 flex h-8 w-8 items-center justify-center rounded-lg">
              <ThumbsUp className="text-brand-blue h-4 w-4" />
            </div>
            Submit Review
          </DialogTitle>
          <DialogDescription className="text-text-secondary-70 font-mono text-sm">
            Reviewing:{' '}
            <span className="bg-brand-pink-500/15 text-brand-pink-500 rounded px-1.5 py-0.5 font-medium">
              {prTitle}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 py-3">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-medium transition-all',
                  idx <= currentStep
                    ? 'bg-brand-blue text-white'
                    : 'text-text-secondary-65 bg-black/5'
                )}
              >
                {idx < currentStep ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-px w-12 transition-colors',
                    idx < currentStep ? 'bg-brand-blue' : 'bg-black/10'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          <AnimatePresence mode="wait">
            {/* Step 1: Decision */}
            {currentStep === 0 && (
              <motion.div
                key="decision"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <p className="text-text-secondary-65 font-mono text-sm">
                  Choose your review decision
                </p>
                {REVIEW_DECISIONS.map((decision) => {
                  const DecisionIcon = decision.icon;
                  const isSelected = formData.reviewStatus === decision.value;

                  return (
                    <button
                      key={decision.value}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, reviewStatus: decision.value }))
                      }
                      className={cn(
                        'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all',
                        isSelected
                          ? 'border-black/20 bg-white shadow-sm'
                          : 'border-black/5 hover:border-black/15 hover:bg-black/[0.02]'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-11 w-11 items-center justify-center rounded-xl',
                          decision.value === 'APPROVED' ? 'bg-[#10b981]/15' : '',
                          decision.value === 'CHANGES_REQUESTED' ? 'bg-brand-orange/15' : '',
                          decision.value === 'IN_REVIEW' ? 'bg-brand-blue/15' : ''
                        )}
                      >
                        <DecisionIcon className={cn('h-5 w-5', decision.colorClass)} />
                      </div>
                      <div className="flex-1">
                        <p className="text-text-primary font-medium">{decision.label}</p>
                        <p className="text-text-secondary-65 font-mono text-sm">
                          {decision.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full',
                            decision.bgClass
                          )}
                        >
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Step 2: Detailed Feedback */}
            {currentStep === 1 && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <p className="text-text-secondary-65 font-mono text-sm">
                  Rate each aspect (optional)
                </p>
                <div className="space-y-3">
                  {REVIEW_SECTIONS.map((section, idx) => (
                    <div
                      key={section.id}
                      className="rounded-xl border border-black/5 bg-black/[0.02] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">{section.label}</span>
                        <StarRating
                          value={formData.feedback[idx]?.rating || 0}
                          onChange={(rating) => updateFeedback(idx, { rating })}
                          size="sm"
                        />
                      </div>
                      {(formData.feedback[idx]?.rating || 0) > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.15 }}
                          className="mt-3"
                        >
                          <Textarea
                            placeholder={`Comments about ${section.label.toLowerCase()}...`}
                            value={formData.feedback[idx]?.comment || ''}
                            onChange={(e) => updateFeedback(idx, { comment: e.target.value })}
                            rows={2}
                            className="border-black/10 bg-white/50 font-mono text-sm focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                          />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Summary */}
            {currentStep === 2 && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                {/* Overall Rating */}
                <div className="rounded-xl border border-black/5 bg-black/[0.02] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-text-primary font-medium">Overall Rating</Label>
                      <p className="text-text-secondary-65 font-mono text-xs">Required</p>
                    </div>
                    <StarRating
                      value={formData.overallRating}
                      onChange={(rating) =>
                        setFormData((prev) => ({ ...prev, overallRating: rating }))
                      }
                    />
                  </div>
                </div>

                {/* Summary Text */}
                <div className="space-y-2">
                  <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
                    Review Summary
                  </Label>
                  <Textarea
                    placeholder="Write a summary of your review..."
                    value={formData.summary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                    rows={4}
                    className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                  />
                </div>

                {/* Review Preview */}
                <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                  <p className="text-text-secondary-65 font-mono text-xs font-medium tracking-wider uppercase">
                    Preview
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span className="text-text-secondary-65">Decision</span>
                      <span
                        className={cn(
                          'font-medium',
                          formData.reviewStatus === 'APPROVED'
                            ? 'text-[#10b981]'
                            : formData.reviewStatus === 'CHANGES_REQUESTED'
                              ? 'text-brand-orange'
                              : 'text-brand-blue'
                        )}
                      >
                        {REVIEW_DECISIONS.find((d) => d.value === formData.reviewStatus)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span className="text-text-secondary-65">Rating</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              'h-4 w-4',
                              star <= formData.overallRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-black/20'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-1 border-black/10 font-mono hover:bg-black/5"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-brand-blue hover:bg-brand-blue-alt gap-1 font-mono text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-brand-pink-500 hover:bg-brand-pink-400 gap-2 font-mono text-white"
            >
              <Send className="h-4 w-4" />
              Submit Review
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
