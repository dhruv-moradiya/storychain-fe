import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

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

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { StoryFormFields } from './story-form-fields';
import { useCreateStory } from '@/api/story.api';
import { toast } from 'sonner';
import { handleApiError } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';

type StoryEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function StoryEditorDialog({ open, onOpenChange }: StoryEditorDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateStory();
  console.log('isPending :>> ', isPending);

  const methods = useForm<TStoryFormValues>({
    resolver: zodResolver(StoryFormSchema),
    mode: 'onBlur',
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
        onSuccess: (data) => {
          toast.success(data.message);
          onOpenChange(false);
        },
        onError: (error) => {
          const message = handleApiError(error);
          toast.error(message, { position: 'top-right' });
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['current_user_stories'] });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background grid max-h-[90vh] min-w-[55vw] grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border p-0 shadow-2xl">
        {/* HEADER */}
        <DialogHeader className="border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="bg-primary/20 absolute inset-0 h-10 w-10 rounded-full blur-xl" />
              <BookOpen className="text-primary relative size-6" />
            </motion.div>

            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Start New Story
              </DialogTitle>
              <DialogDescription className="text-sm opacity-80">
                Enter all the details for your new story.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* FORM */}
        <FormProvider {...methods}>
          <form
            id="story-form"
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto px-4 py-4"
          >
            <StoryFormFields />
          </form>
        </FormProvider>

        {/* FOOTER */}
        <DialogFooter className="bg-background/60 border-t p-4">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" type="submit" form="story-form" disabled={isPending}>
            {!isPending ? 'Save as Draft' : <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ============================================================
   UI UTIL COMPONENTS
   ============================================================ */
