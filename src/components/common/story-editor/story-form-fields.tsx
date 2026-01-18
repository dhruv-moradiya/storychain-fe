import { memo } from 'react';

// Re-export all components from modular structure
export { BasicInfoStep, SettingsStep, StepIndicator, GENRES, STEPS } from './story-form';
export type { Genre, StepId } from './story-form';

// Import for backwards compatibility component
import { BasicInfoStep } from './story-form/basic-info-step';
import { SettingsStep } from './story-form/settings-step';

// Legacy component for backwards compatibility
export const StoryFormFields = memo(() => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Basic Information
        </p>
        <BasicInfoStep />
      </div>
      <div className="space-y-4">
        <p className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Story Settings
        </p>
        <SettingsStep />
      </div>
    </div>
  );
});

StoryFormFields.displayName = 'StoryFormFields';
