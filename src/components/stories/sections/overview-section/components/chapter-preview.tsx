import { motion } from 'framer-motion';
import { Eye, MessageSquare, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Chapter {
  title: string;
  reads: string;
  comments: number;
  likes: number;
  date: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}

interface ChapterPreviewProps {
  chapters: Chapter[];
  onViewAll: () => void;
  onStartReading: () => void;
  onContinueReading?: () => void;
  continueChapter?: string;
}

export function ChapterPreview({
  chapters,
  onViewAll,
  onStartReading,
  onContinueReading,
  continueChapter,
}: ChapterPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary flex items-center gap-2 font-semibold">
          <BookOpen size={18} className="text-brand-pink-500" />
          Latest Chapters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-pink-500 hover:bg-brand-pink-500/10 gap-1"
          onClick={onViewAll}
        >
          View All
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <ChapterCard key={index} chapter={chapter} index={index} />
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <Button
          onClick={onStartReading}
          className="from-brand-pink-500 to-brand-orange flex-1 gap-2 bg-gradient-to-r text-white hover:opacity-90"
        >
          <BookOpen size={18} />
          Start Reading
        </Button>

        {onContinueReading && continueChapter && (
          <Button
            variant="outline"
            onClick={onContinueReading}
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10 flex-1 gap-2"
          >
            <ArrowRight size={18} />
            Continue: {continueChapter}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function ChapterCard({ chapter }: { chapter: Chapter; index: number }) {
  return (
    <div
      className={cn(
        'border-border/50 relative cursor-pointer rounded-xl border p-4',
        'hover:border-brand-pink-500/50 transition'
      )}
    >
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <img
          src={chapter.authorAvatar}
          alt={chapter.authorName}
          className="border-brand-pink-500/20 h-8 w-8 rounded-full border object-cover"
        />
        <div className="flex-1">
          <span className="text-text-primary text-sm font-medium">{chapter.authorName}</span>
          <span className="text-text-secondary-65 ml-2 text-xs">• {chapter.authorRole}</span>
        </div>
        <span className="text-text-secondary-65 text-xs">{chapter.date}</span>
      </div>

      {/* Chapter Title */}
      <h3 className="text-text-primary mt-3 font-semibold">{chapter.title}</h3>

      {/* Stats */}
      <div className="text-text-secondary-65 mt-3 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <Eye size={14} className="text-blue-500" />
          {chapter.reads}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={14} className="text-green-500" />
          {chapter.comments}
        </span>
        <span className="flex items-center gap-1">
          <Heart size={14} className="text-red-500" />
          {chapter.likes}
        </span>
      </div>
    </div>
  );
}
