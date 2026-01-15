import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '../../ui/responsive-dialog';

import { Button } from '../../ui/button';

import { StoryFormSchema, type TStoryFormValues } from '@/schema/story.schema';

import { ArrowLeft, ArrowRight, BookOpen, Send } from 'lucide-react';
import { BasicInfoStep, SettingsStep, StepIndicator } from './story-form-fields';
import { handleApiError } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { useCreateStory } from '@/hooks/story/story.mutations';
import { QueryKey } from '@/lib/query-keys';
import toast from '../toast';

type StoryEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StoryEditorDialog({ open, onOpenChange }: StoryEditorDialogProps) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateStory();

  const methods = useForm<TStoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      genres: [],
      rating: 'general',
      visibility: 'public',
      branching: false,
      approvalMode: 'open',
      commentsEnabled: true,
      votingEnabled: true,
    },
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = (data: TStoryFormValues) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          onOpenChange(false);
          setStep(1);
          methods.reset();
        },
        onError: (error) => {
          const message = handleApiError(error);
          toast.error(message);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: QueryKey.story.my });
        },
      }
    );
  };

  const handleNext = async () => {
    const isValid = await trigger(['title', 'genres', 'description', 'rating']);
    if (isValid) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setStep(1);
      methods.reset();
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialogContent
        className="bg-bg-cream border-border/50 sm:max-w-[500px]"
        sheetHeight="85%"
      >
        {/* HEADER */}
        <ResponsiveDialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <BookOpen className="text-brand-pink-500 h-5 w-5" />
            </div>
            <div>
              <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
                Create New Story
              </ResponsiveDialogTitle>
              <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
                {step === 1 ? 'Start with the basics' : 'Configure your story settings'}
              </ResponsiveDialogDescription>
            </div>
          </div>
          <StepIndicator currentStep={step} />
        </ResponsiveDialogHeader>

        {/* FORM */}
        <FormProvider {...methods}>
          <div className="max-h-[55vh] overflow-y-auto py-4 sm:max-h-[45vh]">
            {step === 1 ? <BasicInfoStep /> : <SettingsStep />}
          </div>
        </FormProvider>

        {/* FOOTER */}
        <ResponsiveDialogFooter className="border-border/50 gap-2 border-t pt-4">
          {step === 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="border-border text-text-secondary hover:bg-muted/50 hover:text-text-primary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="border-border text-text-secondary hover:bg-muted/50 hover:text-text-primary gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                disabled={isPending}
                onClick={handleSubmit(onSubmit)}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white shadow-[0_2px_8px_var(--brand-pink-shadow25)]"
              >
                {!isPending ? (
                  <>
                    <Send className="h-4 w-4" />
                    Create Story
                  </>
                ) : (
                  <Spinner />
                )}
              </Button>
            </>
          )}
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
