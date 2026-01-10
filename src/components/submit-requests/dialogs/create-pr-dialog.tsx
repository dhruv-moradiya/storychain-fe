import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { colors } from '@/constants';
import {
  GitPullRequest,
  Plus,
  FileEdit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Check,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';
import type { PRType, PRLabel } from '@/type/pull-request.type';

interface CreatePRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: PRFormData) => void;
  storyId?: string;
  storyTitle?: string;
}

interface PRFormData {
  title: string;
  description: string;
  prType: PRType;
  chapterId: string;
  parentChapterId: string;
  proposedContent: string;
  labels: PRLabel[];
  isDraft: boolean;
  autoApproveEnabled: boolean;
}

const STEPS = ['Type', 'Details', 'Content', 'Review'];

const PR_TYPES: {
  value: PRType;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    value: 'NEW_CHAPTER',
    label: 'New Chapter',
    description: 'Add a new chapter to the story',
    icon: Plus,
    color: '#10b981',
  },
  {
    value: 'EDIT_CHAPTER',
    label: 'Edit Chapter',
    description: 'Propose changes to an existing chapter',
    icon: FileEdit,
    color: colors.brand.blue,
  },
  {
    value: 'DELETE_CHAPTER',
    label: 'Delete Chapter',
    description: 'Request removal of a chapter',
    icon: Trash2,
    color: '#ef4444',
  },
];

const LABELS: { value: PRLabel; label: string }[] = [
  { value: 'NEEDS_REVIEW', label: 'Needs Review' },
  { value: 'QUALITY_ISSUE', label: 'Quality Issue' },
  { value: 'GRAMMAR', label: 'Grammar' },
  { value: 'PLOT_HOLE', label: 'Plot Hole' },
  { value: 'GOOD_FIRST_PR', label: 'Good First PR' },
];

const MOCK_CHAPTERS = [
  { id: 'ch-1', title: 'Chapter 1: The Beginning' },
  { id: 'ch-2', title: 'Chapter 2: Rising Action' },
  { id: 'ch-3', title: 'Chapter 3: The Conflict' },
  { id: 'ch-4', title: 'Chapter 4: Resolution' },
  { id: 'ch-5', title: 'Chapter 5: Epilogue' },
];

export function CreatePRDialog({
  open,
  onOpenChange,
  onSubmit,
  storyTitle = 'The Story',
}: CreatePRDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PRFormData>({
    title: '',
    description: '',
    prType: 'NEW_CHAPTER',
    chapterId: '',
    parentChapterId: '',
    proposedContent: '',
    labels: [],
    isDraft: false,
    autoApproveEnabled: true,
  });

  const updateFormData = (updates: Partial<PRFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
    setCurrentStep(0);
    setFormData({
      title: '',
      description: '',
      prType: 'NEW_CHAPTER',
      chapterId: '',
      parentChapterId: '',
      proposedContent: '',
      labels: [],
      isDraft: false,
      autoApproveEnabled: true,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!formData.prType;
      case 1:
        return !!formData.title && !!formData.chapterId;
      case 2:
        return formData.prType === 'DELETE_CHAPTER' || !!formData.proposedContent;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const toggleLabel = (label: PRLabel) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2 font-serif"
            style={{ color: colors.text.primary }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${colors.brand.pink[500]}15` }}
            >
              <GitPullRequest className="h-4 w-4" style={{ color: colors.brand.pink[500] }} />
            </div>
            Create Submit Request
          </DialogTitle>
          <DialogDescription
            className="font-mono text-sm"
            style={{ color: colors.text.secondaryOpacity70 }}
          >
            Submit a change request for{' '}
            <span
              className="rounded px-1.5 py-0.5 font-medium"
              style={{ backgroundColor: `${colors.brand.blue}15`, color: colors.brand.blue }}
            >
              {storyTitle}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 py-3">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-medium transition-all',
                  idx <= currentStep ? 'text-white' : 'bg-black/5'
                )}
                style={{
                  backgroundColor: idx <= currentStep ? colors.brand.pink[500] : undefined,
                  color: idx > currentStep ? colors.text.secondaryOpacity65 : undefined,
                }}
              >
                {idx < currentStep ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className="mx-2 h-px w-8 transition-colors"
                  style={{
                    backgroundColor: idx < currentStep ? colors.brand.pink[500] : 'rgba(0,0,0,0.1)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px] py-4">
          <AnimatePresence mode="wait">
            {/* Step 1: Type */}
            {currentStep === 0 && (
              <motion.div
                key="type"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <p className="font-mono text-sm" style={{ color: colors.text.secondaryOpacity65 }}>
                  Select the type of change
                </p>
                {PR_TYPES.map((type) => {
                  const TypeIcon = type.icon;
                  const isSelected = formData.prType === type.value;

                  return (
                    <button
                      key={type.value}
                      onClick={() => updateFormData({ prType: type.value })}
                      className={cn(
                        'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all',
                        isSelected
                          ? 'border-black/20 bg-white shadow-sm'
                          : 'border-black/5 hover:border-black/15 hover:bg-black/[0.02]'
                      )}
                    >
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${type.color}15` }}
                      >
                        <TypeIcon className="h-5 w-5" style={{ color: type.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: colors.text.primary }}>
                          {type.label}
                        </p>
                        <p
                          className="font-mono text-sm"
                          style={{ color: colors.text.secondaryOpacity65 }}
                        >
                          {type.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: colors.brand.pink[500] }}
                        >
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Step 2: Details */}
            {currentStep === 1 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label
                    className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    Title
                  </Label>
                  <Input
                    placeholder="e.g., Add new backstory chapter"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    className="border-black/10 bg-white/50 font-mono focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    Description
                  </Label>
                  <Textarea
                    placeholder="Describe the changes you're proposing..."
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    rows={3}
                    className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    {formData.prType === 'NEW_CHAPTER' ? 'Insert After' : 'Target Chapter'}
                  </Label>
                  <Select
                    value={formData.chapterId}
                    onValueChange={(value) =>
                      updateFormData({ chapterId: value, parentChapterId: value })
                    }
                  >
                    <SelectTrigger className="border-black/10 bg-white/50 font-mono">
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.prType === 'NEW_CHAPTER' && (
                        <SelectItem value="root">
                          <span className="flex items-center gap-2 font-mono">
                            <BookOpen
                              className="h-3.5 w-3.5"
                              style={{ color: colors.brand.blue }}
                            />
                            Story Introduction
                          </span>
                        </SelectItem>
                      )}
                      {MOCK_CHAPTERS.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id} className="font-mono">
                          {chapter.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Content */}
            {currentStep === 2 && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                {formData.prType === 'DELETE_CHAPTER' ? (
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-700">Deletion Request</p>
                        <p className="mt-1 font-mono text-sm text-red-600/70">
                          You're requesting to delete this chapter. Please provide a clear reason in
                          the description field.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        className="font-mono text-xs tracking-wider uppercase"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        {formData.prType === 'NEW_CHAPTER' ? 'Chapter Content' : 'Proposed Changes'}
                      </Label>
                      <span
                        className="font-mono text-xs"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        {formData.proposedContent.length} characters
                      </span>
                    </div>
                    <Textarea
                      placeholder={
                        formData.prType === 'NEW_CHAPTER'
                          ? 'Write your chapter content here...'
                          : 'Enter the modified content...'
                      }
                      value={formData.proposedContent}
                      onChange={(e) => updateFormData({ proposedContent: e.target.value })}
                      rows={12}
                      className="border-black/10 bg-white/50 font-mono text-sm focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
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
                  <Label
                    className="font-mono text-xs tracking-wider uppercase"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
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
                              ? 'border-transparent text-white'
                              : 'border-black/10 hover:border-black/20'
                          )}
                          style={{
                            backgroundColor: isSelected ? colors.brand.blue : 'transparent',
                            color: isSelected ? '#fff' : colors.text.secondaryOpacity75,
                          }}
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
                      <p className="font-medium" style={{ color: colors.text.primary }}>
                        Create as draft
                      </p>
                      <p
                        className="font-mono text-xs"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        Won't be reviewed until marked ready
                      </p>
                    </div>
                    <Switch
                      checked={formData.isDraft}
                      onCheckedChange={(checked) => updateFormData({ isDraft: checked })}
                    />
                  </div>
                  <div className="h-px bg-black/5" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium" style={{ color: colors.text.primary }}>
                        Community auto-approval
                      </p>
                      <p
                        className="font-mono text-xs"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        Auto-approve when vote threshold is reached
                      </p>
                    </div>
                    <Switch
                      checked={formData.autoApproveEnabled}
                      onCheckedChange={(checked) => updateFormData({ autoApproveEnabled: checked })}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                  <p
                    className="font-mono text-xs font-medium tracking-wider uppercase"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    Summary
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span style={{ color: colors.text.secondaryOpacity65 }}>Type</span>
                      <span style={{ color: colors.text.primary }}>
                        {PR_TYPES.find((t) => t.value === formData.prType)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span style={{ color: colors.text.secondaryOpacity65 }}>Title</span>
                      <span
                        className="max-w-[200px] truncate"
                        style={{ color: colors.text.primary }}
                      >
                        {formData.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-sm">
                      <span style={{ color: colors.text.secondaryOpacity65 }}>Status</span>
                      <Badge
                        className="font-mono text-xs"
                        style={{
                          backgroundColor: formData.isDraft
                            ? `${colors.brand.orange}15`
                            : `${colors.brand.pink[500]}15`,
                          color: formData.isDraft ? colors.brand.orange : colors.brand.pink[500],
                          border: 'none',
                        }}
                      >
                        {formData.isDraft ? 'Draft' : 'Ready'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-1 border-black/10 font-mono hover:bg-black/5"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-1 font-mono text-white"
              style={{ backgroundColor: colors.brand.blue }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="gap-2 font-mono text-white"
              style={{ backgroundColor: colors.brand.pink[500] }}
            >
              <GitPullRequest className="h-4 w-4" />
              {formData.isDraft ? 'Create Draft' : 'Submit Request'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
