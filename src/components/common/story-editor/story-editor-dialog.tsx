import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

import { Button } from '../../ui/button';

import { StoryFormSchema, type TStoryFormValues } from '@/schema/story.schema';

import { BookOpen, Send } from 'lucide-react';
import { StoryFormFields } from './story-form-fields';
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
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateStory();

  const methods = useForm<TStoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      genre: 'OTHER',
      rating: 'GENERAL',
      visibility: 'public',
      branching: false,
      approvalMode: 'open',
      commentsEnabled: true,
      votingEnabled: true,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: TStoryFormValues) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid max-h-[90vh] grid-rows-[auto_1fr_auto] overflow-hidden border-black/10 bg-white sm:max-w-[600px]">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 font-serif">
            <div className="bg-brand-pink-500/15 flex h-8 w-8 items-center justify-center rounded-lg">
              <BookOpen className="text-brand-pink-500 h-4 w-4" />
            </div>
            Create New Story
          </DialogTitle>
          <DialogDescription className="text-text-secondary-65 font-mono text-sm">
            Fill in the details to start your new story
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <FormProvider {...methods}>
          <form id="story-form" onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto py-4">
            <StoryFormFields />
          </form>
        </FormProvider>

        {/* FOOTER */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-black/10 font-mono hover:bg-black/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="story-form"
            disabled={isPending}
            className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 font-mono text-white"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
