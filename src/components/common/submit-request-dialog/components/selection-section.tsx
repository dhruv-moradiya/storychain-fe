import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectionSectionProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDisabled?: boolean;
  selectedLabel?: string;
  onEdit: () => void;
  children: React.ReactNode;
}

export function SelectionSection({
  stepNumber,
  title,
  isActive,
  isCompleted,
  isDisabled,
  selectedLabel,
  onEdit,
  children,
}: SelectionSectionProps) {
  return (
    <div
      className={cn(
        'rounded-xl border transition-all',
        isActive
          ? 'border-black/15 bg-white shadow-sm'
          : isCompleted
            ? 'border-black/10 bg-black/[0.02]'
            : 'border-black/5 bg-black/[0.01]',
        isDisabled && 'pointer-events-none opacity-50'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3',
          isCompleted && !isActive && 'cursor-pointer hover:bg-black/[0.02]'
        )}
        onClick={isCompleted && !isActive ? onEdit : undefined}
      >
        {/* Step number */}
        <div
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-all',
            isCompleted
              ? 'bg-brand-pink-500 text-white'
              : isActive
                ? 'bg-brand-blue text-white'
                : 'text-text-secondary-65 bg-black/10'
          )}
        >
          {isCompleted ? <Check className="h-3.5 w-3.5" /> : stepNumber}
        </div>

        {/* Title and selected value */}
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'text-sm font-medium',
              isActive ? 'text-text-primary' : 'text-text-secondary-75'
            )}
          >
            {title}
          </p>
          {isCompleted && selectedLabel && (
            <p className="text-text-secondary-65 truncate font-mono text-xs">{selectedLabel}</p>
          )}
        </div>

        {/* Edit indicator */}
        {isCompleted && !isActive && (
          <ChevronDown className="text-text-secondary-65 h-4 w-4 rotate-180" />
        )}
      </div>

      {/* Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-1 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
