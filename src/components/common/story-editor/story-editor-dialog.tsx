import { FormProvider } from 'react-hook-form';
import { useCallback } from 'react';

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogBody,
} from '../../ui/responsive-dialog';

import { BasicInfoStep, SettingsStep } from './story-form-fields';
import { StoryDialogHeader } from './story-dialog-header';
import { StoryDialogFooter } from './story-dialog-footer';
import { useStoryForm } from './use-story-form';

type StoryEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StoryEditorDialog({ open, onOpenChange }: StoryEditorDialogProps) {
  const { methods, step, isPending, handleNext, handleBack, resetForm, submitForm } = useStoryForm({
    onSuccess: () => onOpenChange(false),
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        resetForm();
      }
    },
    [onOpenChange, resetForm]
  );

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialogContent
        className="bg-bg-cream border-border/50 flex flex-col gap-0 p-0 sm:max-w-[520px]"
        sheetHeight="90%"
        showCloseButton={false}
      >
        <StoryDialogHeader step={step} />

        <FormProvider {...methods}>
          <ResponsiveDialogBody className="flex-1 overflow-y-auto px-6 py-4">
            {step === 1 ? <BasicInfoStep /> : <SettingsStep />}
          </ResponsiveDialogBody>
        </FormProvider>

        <StoryDialogFooter
          step={step}
          isPending={isPending}
          onCancel={handleCancel}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={submitForm}
        />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
