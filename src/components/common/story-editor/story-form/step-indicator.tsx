import { memo } from 'react';
import { cn } from '@/lib/utils';
import { STEPS } from './story-form.constants';

type StepIndicatorProps = {
  currentStep: number;
};

export const StepIndicator = memo(({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={cn(
                'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                isActive && 'bg-brand-pink-500 text-white',
                isCompleted && 'bg-brand-pink-100 text-brand-pink-600',
                !isActive && !isCompleted && 'text-text-secondary-65 bg-black/5'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{step.label}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 rounded-full transition-all',
                  isCompleted ? 'bg-brand-pink-500' : 'bg-black/10'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

StepIndicator.displayName = 'StepIndicator';
