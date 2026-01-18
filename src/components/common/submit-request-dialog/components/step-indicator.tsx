import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-medium transition-all',
              idx <= currentStep
                ? 'bg-brand-pink-500 text-white'
                : 'text-text-secondary-65 bg-black/5'
            )}
          >
            {idx < currentStep ? <Check className="h-4 w-4" /> : idx + 1}
          </div>
          {idx < steps.length - 1 && (
            <div
              className={cn(
                'mx-2 h-px w-8 transition-colors',
                idx < currentStep ? 'bg-brand-pink-500' : 'bg-black/10'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
