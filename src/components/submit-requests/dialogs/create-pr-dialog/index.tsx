import { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GitPullRequest, ChevronRight, ChevronLeft } from 'lucide-react';

// Components
import { StepIndicator } from './components/step-indicator';

// Steps
import { StorySelectionStep } from './steps/story-selection-step';
import { TypeStep } from './steps/type-step';
import { DetailsStep } from './steps/details-step';
import { ContentPreviewStep } from './steps/content-preview-step';
import { ReviewStep } from './steps/review-step';

// Types and constants
import type { CreatePRDialogProps, PRFormData } from './create-pr-dialog.types';
import { getDefaultFormData, getStepNames } from './create-pr-dialog.types';

export function CreatePRDialog({
  open,
  onOpenChange,
  onSubmit,
  storyId,
  storyTitle,
  parentChapterId,
  parentChapterTitle,
}: CreatePRDialogProps) {
  // Determine if we have context (from story builder)
  const hasContext = Boolean(storyId && storyTitle);

  // Get step names based on context
  const steps = useMemo(() => getStepNames(hasContext), [hasContext]);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PRFormData>(() =>
    getDefaultFormData(storyId, storyTitle, parentChapterId, parentChapterTitle)
  );

  const updateFormData = (updates: Partial<PRFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
    resetDialog();
  };

  const resetDialog = () => {
    setCurrentStep(0);
    setFormData(getDefaultFormData(storyId, storyTitle, parentChapterId, parentChapterTitle));
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetDialog();
    }
    onOpenChange(isOpen);
  };

  // Validation for each step based on step name
  const canProceed = (): boolean => {
    const stepName = steps[currentStep];

    switch (stepName) {
      case 'Type':
        return Boolean(formData.prType);
      case 'Select':
        // For NEW_CHAPTER and EDIT_CHAPTER: need draft + story + chapter
        // For DELETE: need story + chapter only
        if (formData.prType === 'NEW_CHAPTER' || formData.prType === 'EDIT_CHAPTER') {
          return Boolean(formData.draftId && formData.storyId && formData.parentChapterId);
        }
        return Boolean(formData.storyId && formData.parentChapterId);
      case 'Details':
        return Boolean(formData.title);
      case 'Preview':
        return true;
      case 'Review':
        return true;
      default:
        return false;
    }
  };

  // Render current step content
  const renderStepContent = () => {
    const stepName = steps[currentStep];

    switch (stepName) {
      case 'Select':
        return <StorySelectionStep formData={formData} onUpdate={updateFormData} />;
      case 'Type':
        return <TypeStep formData={formData} onUpdate={updateFormData} />;
      case 'Details':
        return (
          <DetailsStep formData={formData} onUpdate={updateFormData} hasContext={hasContext} />
        );
      case 'Preview':
        return <ContentPreviewStep formData={formData} onUpdate={updateFormData} />;
      case 'Review':
        return <ReviewStep formData={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

  // Determine display title
  const displayStoryTitle = formData.storyTitle || storyTitle || 'The Story';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 font-serif">
            <div className="bg-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg">
              <GitPullRequest className="text-brand-pink-500 h-4 w-4" />
            </div>
            Create Submit Request
          </DialogTitle>
          <DialogDescription className="text-text-secondary-70 font-mono text-sm">
            {hasContext ? (
              <>
                Submit a change request for{' '}
                <span className="bg-brand-blue/15 text-brand-blue rounded px-1.5 py-0.5 font-medium">
                  {displayStoryTitle}
                </span>
              </>
            ) : (
              'Select a story and chapter to submit a change request'
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
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
          {currentStep < steps.length - 1 ? (
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
              <GitPullRequest className="h-4 w-4" />
              {formData.isDraft ? 'Create Draft' : 'Submit Request'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Re-export types for convenience
export type { CreatePRDialogProps, PRFormData } from './create-pr-dialog.types';
