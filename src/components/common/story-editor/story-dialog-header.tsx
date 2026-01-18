import { memo } from 'react';
import { BookOpen, X } from 'lucide-react';

import {
  ResponsiveDialogClose,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '../../ui/responsive-dialog';
import { StepIndicator } from './story-form-fields';

type StoryDialogHeaderProps = {
  step: number;
};

export const StoryDialogHeader = memo(({ step }: StoryDialogHeaderProps) => {
  const description = step === 1 ? 'Start with the basics' : 'Configure your story settings';

  return (
    <ResponsiveDialogHeader className="border-border/50 relative space-y-4 border-b bg-white/50 px-6 py-5">
      {/* Close button */}
      <ResponsiveDialogClose className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-full p-1.5 opacity-60 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </ResponsiveDialogClose>

      {/* Title section */}
      <div className="flex items-center gap-3">
        <div className="bg-brand-pink-500/10 flex h-11 w-11 items-center justify-center rounded-xl">
          <BookOpen className="text-brand-pink-500 h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold tracking-tight">
            Create New Story
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription className="text-text-secondary-65 text-sm">
            {description}
          </ResponsiveDialogDescription>
        </div>
      </div>

      {/* Step indicator */}
      <StepIndicator currentStep={step} />
    </ResponsiveDialogHeader>
  );
});

StoryDialogHeader.displayName = 'StoryDialogHeader';
