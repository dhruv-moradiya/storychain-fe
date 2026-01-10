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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Lightbulb,
  HelpCircle,
  ThumbsUp,
  AlertCircle,
  Send,
  ArrowDown,
} from 'lucide-react';
import type { PRCommentType, IPRSuggestion } from '@/type/pull-request.type';

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CommentFormData) => void;
  replyTo?: string;
  selectedText?: string;
}

interface CommentFormData {
  content: string;
  commentType: PRCommentType;
  suggestion?: IPRSuggestion;
}

const COMMENT_TYPES: {
  value: PRCommentType;
  label: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}[] = [
  {
    value: 'GENERAL',
    label: 'General',
    icon: MessageSquare,
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue/15',
  },
  {
    value: 'SUGGESTION',
    label: 'Suggestion',
    icon: Lightbulb,
    colorClass: 'text-brand-orange',
    bgClass: 'bg-brand-orange/15',
  },
  {
    value: 'QUESTION',
    label: 'Question',
    icon: HelpCircle,
    colorClass: 'text-[#8b5cf6]',
    bgClass: 'bg-[#8b5cf6]/10',
  },
  {
    value: 'APPROVAL',
    label: 'Approval',
    icon: ThumbsUp,
    colorClass: 'text-[#10b981]',
    bgClass: 'bg-[#10b981]/10',
  },
  {
    value: 'REQUEST_CHANGES',
    label: 'Changes',
    icon: AlertCircle,
    colorClass: 'text-brand-pink-500',
    bgClass: 'bg-brand-pink-500/15',
  },
];

export function CommentDialog({
  open,
  onOpenChange,
  onSubmit,
  replyTo,
  selectedText = '',
}: CommentDialogProps) {
  const [formData, setFormData] = useState<CommentFormData>({
    content: '',
    commentType: 'GENERAL',
    suggestion: selectedText ? { originalText: selectedText, suggestedText: '' } : undefined,
  });

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
    setFormData({
      content: '',
      commentType: 'GENERAL',
      suggestion: undefined,
    });
  };

  const updateSuggestion = (updates: Partial<IPRSuggestion>) => {
    setFormData((prev) => ({
      ...prev,
      suggestion: {
        originalText: prev.suggestion?.originalText || '',
        suggestedText: prev.suggestion?.suggestedText || '',
        ...updates,
      },
    }));
  };

  const canSubmit =
    formData.content.trim() &&
    (formData.commentType !== 'SUGGESTION' ||
      (formData.suggestion?.originalText && formData.suggestion?.suggestedText));

  const selectedType = COMMENT_TYPES.find((t) => t.value === formData.commentType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-black/10 bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary flex items-center gap-2 font-serif">
            <div className="bg-brand-blue/15 flex h-8 w-8 items-center justify-center rounded-lg">
              <MessageSquare className="text-brand-blue h-4 w-4" />
            </div>
            {replyTo ? 'Reply to Comment' : 'Add Comment'}
          </DialogTitle>
          <DialogDescription className="text-text-secondary-70 font-mono text-sm">
            Share your feedback on this submission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Comment Type Selection */}
          <div className="space-y-2">
            <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
              Type
            </Label>
            <div className="flex gap-2">
              {COMMENT_TYPES.map((type) => {
                const TypeIcon = type.icon;
                const isSelected = formData.commentType === type.value;

                return (
                  <button
                    key={type.value}
                    onClick={() => setFormData((prev) => ({ ...prev, commentType: type.value }))}
                    className={cn(
                      'flex flex-1 flex-col items-center gap-1 rounded-xl border p-2 transition-all',
                      isSelected
                        ? 'border-black/20 bg-white shadow-sm'
                        : 'border-black/5 hover:border-black/15 hover:bg-black/[0.02]'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        type.bgClass
                      )}
                    >
                      <TypeIcon className={cn('h-4 w-4', type.colorClass)} />
                    </div>
                    <span
                      className={cn(
                        'font-mono text-xs',
                        isSelected ? 'text-text-primary' : 'text-text-secondary-65'
                      )}
                    >
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suggestion Section */}
          <AnimatePresence>
            {formData.commentType === 'SUGGESTION' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4">
                  <Label className="text-brand-pink-500 font-mono text-xs">Original Text</Label>
                  <Input
                    placeholder="Enter the original text..."
                    value={formData.suggestion?.originalText || ''}
                    onChange={(e) => updateSuggestion({ originalText: e.target.value })}
                    className="mt-2 border-black/10 bg-white/50 font-mono text-sm focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                  />

                  <div className="my-3 flex justify-center">
                    <ArrowDown className="text-text-secondary-65 h-4 w-4" />
                  </div>

                  <Label className="font-mono text-xs text-[#10b981]">Suggested Text</Label>
                  <Input
                    placeholder="Enter your suggestion..."
                    value={formData.suggestion?.suggestedText || ''}
                    onChange={(e) => updateSuggestion({ suggestedText: e.target.value })}
                    className="mt-2 border-black/10 bg-white/50 font-mono text-sm focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comment Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-text-primary font-medium">
                {formData.commentType === 'SUGGESTION' ? 'Explanation' : 'Comment'}
              </Label>
              <span className="text-text-secondary-65 font-mono text-xs">
                {formData.content.length} chars
              </span>
            </div>
            <Textarea
              placeholder={
                formData.commentType === 'SUGGESTION'
                  ? 'Explain why you suggest this change...'
                  : formData.commentType === 'QUESTION'
                    ? 'What would you like to know?'
                    : 'Write your comment...'
              }
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-black/10 font-mono hover:bg-black/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={cn(
              'gap-2 font-mono text-white',
              selectedType?.value === 'GENERAL' && 'bg-brand-blue hover:bg-brand-blue-alt',
              selectedType?.value === 'SUGGESTION' && 'bg-brand-orange hover:bg-brand-orange-alt',
              selectedType?.value === 'QUESTION' && 'bg-[#8b5cf6] hover:bg-[#7c3aed]',
              selectedType?.value === 'APPROVAL' && 'bg-[#10b981] hover:bg-[#059669]',
              selectedType?.value === 'REQUEST_CHANGES' &&
                'bg-brand-pink-500 hover:bg-brand-pink-400'
            )}
          >
            <Send className="h-4 w-4" />
            Post Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
