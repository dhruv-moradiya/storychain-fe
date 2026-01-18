import { useCallback, useEffect } from 'react';
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
import { TypeStep } from './steps/type-step';
import { StorySelectionStep } from './steps/story-selection-step';
import { DetailsStep } from './steps/details-step';
import { ContentPreviewStep } from './steps/content-preview-step';
import { ReviewStep } from './steps/review-step';

// Hooks
import {
  useSubmitRequestDialog,
  useSubmitRequestData,
} from '@/hooks/components/submitRequestDialog';

// Types
import type { SubmitRequestDialogProps } from './submit-request-dialog.types';

export function SubmitRequestDialog(props: SubmitRequestDialogProps) {
  const { open, onOpenChange, onSubmit } = props;

  // Dialog state management
  const {
    formData,
    currentStepName,
    steps,
    hasContext,
    displayStoryTitle,
    canProceed,
    isLastStep,
    isFirstStep,
    updateFormData,
    handleNext,
    handleBack,
    handleSubmit,
    resetDialog,
  } = useSubmitRequestDialog({ props, onSubmit });

  // Data fetching
  const {
    stories,
    chapters,
    drafts,
    preSelectedStory,
    isLoadingStories,
    isLoadingChapters,
    isLoadingDrafts,
    isLoadingStoryBySlug,
    findStoryById,
    findChapterById,
    findDraftById,
  } = useSubmitRequestData({
    selectedStoryId: formData.storyId,
    storySlug: props.storySlug,
  });

  // Handle dialog close
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        resetDialog();
      }
      onOpenChange(isOpen);
    },
    [onOpenChange, resetDialog]
  );

  // Handle form submission
  const onFormSubmit = useCallback(() => {
    handleSubmit();
    onOpenChange(false);
  }, [handleSubmit, onOpenChange]);

  // Selection handlers
  const handleDraftSelect = useCallback(
    (draftId: string) => {
      const draft = findDraftById(draftId);
      updateFormData({
        draftId,
        draftTitle: draft?.title || '',
        draftContent: draft?.content || '',
      });
    },
    [findDraftById, updateFormData]
  );

  const handleStorySelect = useCallback(
    (storyId: string) => {
      const story = findStoryById(storyId);
      updateFormData({
        storyId,
        storyTitle: story?.title || '',
        storySlug: story?.slug || '',
        parentChapterId: '',
        parentChapterTitle: '',
        chapterId: '',
      });
    },
    [findStoryById, updateFormData]
  );

  const handleChapterSelect = useCallback(
    (chapterId: string) => {
      const chapter = findChapterById(chapterId);
      updateFormData({
        parentChapterId: chapterId,
        parentChapterTitle: chapterId === 'root' ? 'Story Introduction' : chapter?.title || '',
        chapterId: chapterId,
      });
    },
    [findChapterById, updateFormData]
  );

  // Sync props to form data when dialog opens with context
  useEffect(() => {
    if (open && hasContext) {
      updateFormData({
        storyId: props.storyId || '',
        storyTitle: props.storyTitle || '',
        storySlug: props.storySlug || '',
        parentChapterId: props.parentChapterId || '',
        parentChapterTitle: props.parentChapterTitle || '',
        draftId: props.draftId || '',
        draftTitle: props.draftTitle || '',
        draftContent: props.draftContent || '',
        prType: props.prType || 'NEW_CHAPTER',
      });
    }
  }, [open, hasContext, props, updateFormData]);

  // Auto-select story from storySlug when preSelectedStory is loaded
  useEffect(() => {
    if (open && preSelectedStory && !formData.storyId && !isLoadingStoryBySlug) {
      updateFormData({
        storyId: preSelectedStory.id,
        storyTitle: preSelectedStory.title,
        storySlug: preSelectedStory.slug,
      });
    }
  }, [open, preSelectedStory, formData.storyId, isLoadingStoryBySlug, updateFormData]);

  // Render current step content
  const renderStepContent = () => {
    switch (currentStepName) {
      case 'Select':
        return (
          <StorySelectionStep
            formData={formData}
            onUpdate={updateFormData}
            stories={stories}
            chapters={chapters}
            drafts={drafts}
            isLoadingStories={isLoadingStories}
            isLoadingChapters={isLoadingChapters}
            isLoadingDrafts={isLoadingDrafts}
            onStorySelect={handleStorySelect}
            onChapterSelect={handleChapterSelect}
            onDraftSelect={handleDraftSelect}
          />
        );
      case 'Type':
        return <TypeStep formData={formData} onUpdate={updateFormData} />;
      case 'Details':
        return (
          <DetailsStep
            formData={formData}
            onUpdate={updateFormData}
            hasContext={hasContext}
            chapters={chapters}
          />
        );
      case 'Preview':
        return (
          <ContentPreviewStep formData={formData} onUpdate={updateFormData} chapters={chapters} />
        );
      case 'Review':
        return <ReviewStep formData={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

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
        <StepIndicator steps={steps} currentStep={steps.indexOf(currentStepName)} />

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-1 border-black/10 font-mono hover:bg-black/5"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          {!isLastStep ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-brand-blue hover:bg-brand-blue-alt gap-1 font-mono text-white"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onFormSubmit}
              disabled={!canProceed}
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
