import { useState, useMemo, useCallback } from 'react';
import type {
  PRFormData,
  SubmitRequestDialogProps,
} from '@/components/common/submit-request-dialog/submit-request-dialog.types';
import {
  getDefaultFormData,
  getStepNames,
  hasFullContext,
} from '@/components/common/submit-request-dialog/submit-request-dialog.types';

interface UseSubmitRequestDialogProps {
  props: SubmitRequestDialogProps;
  onSubmit?: (data: PRFormData) => void;
}

export function useSubmitRequestDialog({ props, onSubmit }: UseSubmitRequestDialogProps) {
  // Determine if we have context (from story builder)
  const hasContext = useMemo(() => hasFullContext(props), [props]);

  // Get step names based on context
  const steps = useMemo(() => getStepNames(hasContext), [hasContext]);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PRFormData>(() => getDefaultFormData(props));

  // Update form data
  const updateFormData = useCallback((updates: Partial<PRFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Reset dialog state
  const resetDialog = useCallback(() => {
    setCurrentStep(0);
    setFormData(getDefaultFormData(props));
  }, [props]);

  // Submit handler
  const handleSubmit = useCallback(() => {
    onSubmit?.(formData);
    resetDialog();
  }, [formData, onSubmit, resetDialog]);

  // Validation for each step based on step name
  const canProceed = useCallback((): boolean => {
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
  }, [steps, currentStep, formData]);

  // Current step name
  const currentStepName = steps[currentStep];

  // Check if on last step
  const isLastStep = currentStep === steps.length - 1;

  // Check if on first step
  const isFirstStep = currentStep === 0;

  // Display story title
  const displayStoryTitle = formData.storyTitle || props.storyTitle || 'The Story';

  return {
    // State
    formData,
    currentStep,
    currentStepName,
    steps,
    hasContext,
    displayStoryTitle,

    // Computed
    canProceed: canProceed(),
    isLastStep,
    isFirstStep,

    // Actions
    updateFormData,
    handleNext,
    handleBack,
    handleSubmit,
    resetDialog,
  };
}
