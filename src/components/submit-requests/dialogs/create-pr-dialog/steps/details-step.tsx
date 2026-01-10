import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { StepProps } from '../create-pr-dialog.types';
import { MOCK_STORY_CHAPTERS } from '../create-pr-dialog.types';

interface DetailsStepProps extends StepProps {
  hasContext: boolean;
}

export function DetailsStep({ formData, onUpdate, hasContext }: DetailsStepProps) {
  // Get chapters for the selected story (or use a fallback for context mode)
  const chapters = formData.storyId ? MOCK_STORY_CHAPTERS[formData.storyId] || [] : [];

  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Title
        </Label>
        <Input
          placeholder="e.g., Add new backstory chapter"
          value={formData.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="border-black/10 bg-white/50 font-mono focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Description
        </Label>
        <Textarea
          placeholder="Describe the changes you're proposing..."
          value={formData.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={3}
          className="border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
        />
      </div>

      {/* Only show chapter selector if we have context (from story builder)
          When coming from submit-requests page, chapter was already selected in step 0 */}
      {hasContext && (
        <div className="space-y-2">
          <Label className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
            {formData.prType === 'NEW_CHAPTER' ? 'Insert After' : 'Target Chapter'}
          </Label>
          <Select
            value={formData.chapterId}
            onValueChange={(value) => {
              const chapter = chapters.find((c) => c.id === value);
              onUpdate({
                chapterId: value,
                parentChapterId: value,
                parentChapterTitle: value === 'root' ? 'Story Introduction' : chapter?.title || '',
              });
            }}
          >
            <SelectTrigger className="border-black/10 bg-white/50 font-mono">
              <SelectValue placeholder="Select chapter" />
            </SelectTrigger>
            <SelectContent>
              {formData.prType === 'NEW_CHAPTER' && (
                <SelectItem value="root">
                  <span className="flex items-center gap-2 font-mono">
                    <BookOpen className="text-brand-blue h-3.5 w-3.5" />
                    Story Introduction
                  </span>
                </SelectItem>
              )}
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id} className="font-mono">
                  {chapter.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Show selected chapter info when coming from submit-requests page */}
      {!hasContext && formData.parentChapterTitle && (
        <div className="rounded-xl border border-black/5 bg-black/[0.02] p-3">
          <p className="text-text-secondary-65 mb-1 font-mono text-xs uppercase">
            {formData.prType === 'NEW_CHAPTER' ? 'Insert After' : 'Target Chapter'}
          </p>
          <p className="text-text-primary font-medium">{formData.parentChapterTitle}</p>
          <p className="text-text-secondary-65 mt-0.5 font-mono text-xs">
            in {formData.storyTitle}
          </p>
        </div>
      )}
    </motion.div>
  );
}
