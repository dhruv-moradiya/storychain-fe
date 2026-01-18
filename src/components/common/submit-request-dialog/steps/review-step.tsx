import { motion } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { StepProps } from '../submit-request-dialog.types';
import { LABELS, PR_TYPES } from '../submit-request-dialog.types';
import type { PRLabel } from '@/type/pull-request.type';

export function ReviewStep({ formData, onUpdate }: StepProps) {
  const toggleLabel = (label: PRLabel) => {
    const newLabels = formData.labels.includes(label)
      ? formData.labels.filter((l) => l !== label)
      : [...formData.labels, label];
    onUpdate({ labels: newLabels });
  };

  return (
    <motion.div
      key="review"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-5"
    >
      {/* Labels */}
      <div className="space-y-3">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Labels
        </Label>
        <div className="flex flex-wrap gap-2">
          {LABELS.map((label) => {
            const isSelected = formData.labels.includes(label.value);
            return (
              <button
                key={label.value}
                onClick={() => toggleLabel(label.value)}
                className={cn(
                  'rounded-full border px-3 py-1.5 font-mono text-xs transition-all',
                  isSelected
                    ? 'bg-brand-blue border-transparent text-white'
                    : 'text-text-secondary-75 border-black/10 hover:border-black/20'
                )}
              >
                {label.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4 rounded-xl border border-black/5 bg-black/[0.02] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Create as draft</p>
            <p className="text-text-secondary-65 font-mono text-xs">
              Won't be reviewed until marked ready
            </p>
          </div>
          <Switch
            checked={formData.isDraft}
            onCheckedChange={(checked) => onUpdate({ isDraft: checked })}
          />
        </div>
        <div className="h-px bg-black/5" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Community auto-approval</p>
            <p className="text-text-secondary-65 font-mono text-xs">
              Auto-approve when vote threshold is reached
            </p>
          </div>
          <Switch
            checked={formData.autoApproveEnabled}
            onCheckedChange={(checked) => onUpdate({ autoApproveEnabled: checked })}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
        <p className="text-text-secondary-65 font-mono text-xs font-medium tracking-wider uppercase">
          Summary
        </p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between font-mono text-sm">
            <span className="text-text-secondary-65">Type</span>
            <span className="text-text-primary">
              {PR_TYPES.find((t) => t.value === formData.prType)?.label}
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-sm">
            <span className="text-text-secondary-65">Title</span>
            <span className="text-text-primary max-w-[200px] truncate">{formData.title}</span>
          </div>
          {formData.storyTitle && (
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-text-secondary-65">Story</span>
              <span className="text-text-primary max-w-[200px] truncate">
                {formData.storyTitle}
              </span>
            </div>
          )}
          {formData.parentChapterTitle && (
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-text-secondary-65">
                {formData.prType === 'NEW_CHAPTER' ? 'After' : 'Chapter'}
              </span>
              <span className="text-text-primary max-w-[200px] truncate">
                {formData.parentChapterTitle}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between font-mono text-sm">
            <span className="text-text-secondary-65">Status</span>
            <Badge
              className={cn(
                'border-none font-mono text-xs',
                formData.isDraft
                  ? 'bg-brand-orange/15 text-brand-orange'
                  : 'bg-brand-pink-500/15 text-brand-pink-500'
              )}
            >
              {formData.isDraft ? 'Draft' : 'Ready'}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
