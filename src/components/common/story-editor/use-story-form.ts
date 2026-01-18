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

  const processSubmit = (data: TStoryFormValues) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          options?.onSuccess?.();
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

  const handleNext = useCallback(async () => {
    const isValid = await methods.trigger(['title', 'description']);
    if (isValid) {
      setStep(2);
    }
  }, [methods]);

  const handleBack = useCallback(() => {
    setStep(1);
  }, []);

  const resetForm = useCallback(() => {
    setStep(1);
    methods.reset();
  }, [methods]);

  const submitForm = (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    methods.handleSubmit(processSubmit)(e);
  };

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
