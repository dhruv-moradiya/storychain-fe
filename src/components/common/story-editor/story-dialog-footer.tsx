import { memo } from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

import { Button } from '../../ui/button';
import { ResponsiveDialogFooter } from '../../ui/responsive-dialog';
import { Spinner } from '@/components/ui/spinner';

type StoryDialogFooterProps = {
  step: number;
  isPending: boolean;
  onCancel: () => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
};

export const StoryDialogFooter = memo(
  ({ step, isPending, onCancel, onNext, onBack, onSubmit }: StoryDialogFooterProps) => {
    return (
      <ResponsiveDialogFooter className="border-border/50 gap-3 border-t bg-white/50 px-6 py-4">
        {step === 1 ? (
          <Step1Footer onCancel={onCancel} onNext={onNext} />
        ) : (
          <Step2Footer isPending={isPending} onBack={onBack} onSubmit={onSubmit} />
        )}
      </ResponsiveDialogFooter>
    );
  }
);

StoryDialogFooter.displayName = 'StoryDialogFooter';

// Step 1 Footer - Cancel and Next buttons
type Step1FooterProps = {
  onCancel: () => void;
  onNext: () => void;
};

const Step1Footer = memo(({ onCancel, onNext }: Step1FooterProps) => (
  <>
    <Button
      type="button"
      variant="outline"
      onClick={onCancel}
      className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 px-5"
    >
      Cancel
    </Button>
    <Button
      type="button"
      onClick={onNext}
      className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
    >
      Next Step
      <ArrowRight className="h-4 w-4" />
    </Button>
  </>
));

Step1Footer.displayName = 'Step1Footer';

// Step 2 Footer - Back and Create buttons
type Step2FooterProps = {
  isPending: boolean;
  onBack: () => void;
  onSubmit: () => void;
};

const Step2Footer = memo(({ isPending, onBack, onSubmit }: Step2FooterProps) => (
  <>
    <Button
      type="button"
      variant="outline"
      onClick={onBack}
      className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 gap-2 px-5"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
    <Button
      type="button"
      disabled={isPending}
      onClick={onSubmit}
      className="bg-brand-pink-500 hover:bg-brand-pink-600 disabled:bg-brand-pink-400 h-10 min-w-[140px] gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed"
    >
      {!isPending ? (
        <>
          <Send className="h-4 w-4" />
          Create Story
        </>
      ) : (
        <Spinner className="h-4 w-4" />
      )}
    </Button>
  </>
));

Step2Footer.displayName = 'Step2Footer';
