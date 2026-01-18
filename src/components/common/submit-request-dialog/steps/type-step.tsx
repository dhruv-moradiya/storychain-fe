import { motion } from 'motion/react';
import { PRTypeCard } from '../components/pr-type-card';
import { PR_TYPES } from '../submit-request-dialog.types';
import type { StepProps } from '../submit-request-dialog.types';
import type { PRType } from '@/type/pull-request.type';

export function TypeStep({ formData, onUpdate }: StepProps) {
  return (
    <motion.div
      key="type"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-3"
    >
      <p className="text-text-secondary-65 font-mono text-sm">Select the type of change</p>
      {PR_TYPES.map((type) => (
        <PRTypeCard
          key={type.value}
          type={type}
          isSelected={formData.prType === type.value}
          onSelect={() => onUpdate({ prType: type.value as PRType })}
        />
      ))}
    </motion.div>
  );
}
