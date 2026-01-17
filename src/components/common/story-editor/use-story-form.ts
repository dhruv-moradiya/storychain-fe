import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { StoryFormSchema, type TStoryFormValues } from '@/schema/story.schema';
import { useCreateStory } from '@/hooks/story/story.mutations';
import { QueryKey } from '@/lib/query-keys';
import { handleApiError } from '@/lib/utils';
import toast from '../toast';

const DEFAULT_VALUES: TStoryFormValues = {
  title: '',
  slug: '',
  description: '',
  coverImage: undefined,
  settings: {
    isPublic: true,
    allowBranching: true,
    requireApproval: false,
    allowComments: true,
    allowVoting: true,
    genres: [],
    contentRating: 'general',
  },
  tags: [],
  status: 'draft',
};

type UseStoryFormOptions = {
  onSuccess?: () => void;
};

export function useStoryForm(options?: UseStoryFormOptions) {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateStory();

  const methods = useForm<TStoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const { handleSubmit, trigger, reset } = methods;

  const onSubmit = useCallback(
    (data: TStoryFormValues) => {
      mutate(
        { ...data },
        {
          onSuccess: () => {
            options?.onSuccess?.();
            setStep(1);
            reset();
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
    },
    [mutate, options, queryClient, reset]
  );

  const handleNext = useCallback(async () => {
    const isValid = await trigger(['title', 'description']);
    if (isValid) {
      setStep(2);
    }
  }, [trigger]);

  const handleBack = useCallback(() => {
    setStep(1);
  }, []);

  const resetForm = useCallback(() => {
    setStep(1);
    reset();
  }, [reset]);

  const submitForm = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return {
    // Form state
    methods,
    step,
    isPending,

    // Actions
    handleNext,
    handleBack,
    resetForm,
    submitForm,
  };
}

export type UseStoryFormReturn = ReturnType<typeof useStoryForm>;
