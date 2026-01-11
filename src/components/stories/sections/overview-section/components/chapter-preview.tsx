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
      className="space-y-3 sm:space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <BookOpen size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
          Latest Chapters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-pink-500 hover:bg-brand-pink-500/10 gap-1 text-xs sm:text-sm"
          onClick={onViewAll}
        >
          View All
          <ArrowRight size={14} />
        </Button>
      </div>

      {/* Chapters List */}
      <div className="space-y-2 sm:space-y-3">
        {chapters.map((chapter, index) => (
          <ChapterCard key={index} chapter={chapter} index={index} />
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:gap-3 sm:pt-4">
        <Button
          onClick={onStartReading}
          className="from-brand-pink-500 to-brand-orange flex-1 gap-2 bg-gradient-to-r text-sm text-white hover:opacity-90 sm:text-base"
        >
          <BookOpen size={16} className="sm:h-[18px] sm:w-[18px]" />
          Start Reading
        </Button>

        {onContinueReading && continueChapter && (
          <Button
            variant="outline"
            onClick={onContinueReading}
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10 flex-1 gap-2 text-sm sm:text-base"
          >
            <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
            <span className="truncate">Continue: {continueChapter}</span>
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
        'border-border/50 relative cursor-pointer rounded-xl border p-3 sm:p-4',
        'hover:border-brand-pink-500/50 transition'
      )}
    >
      {/* Author Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src={chapter.authorAvatar}
          alt={chapter.authorName}
          className="border-brand-pink-500/20 h-7 w-7 rounded-full border object-cover sm:h-8 sm:w-8"
        />
        <div className="min-w-0 flex-1">
          <span className="text-text-primary text-xs font-medium sm:text-sm">
            {chapter.authorName}
          </span>
          <span className="text-text-secondary-65 ml-1.5 text-[10px] sm:ml-2 sm:text-xs">
            • {chapter.authorRole}
          </span>
        </div>
        <span className="text-text-secondary-65 text-[10px] sm:text-xs">{chapter.date}</span>
      </div>

      {/* Chapter Title */}
      <h3 className="text-text-primary mt-2 text-sm font-semibold sm:mt-3 sm:text-base">
        {chapter.title}
      </h3>

      {/* Stats */}
      <div className="text-text-secondary-65 mt-2 flex items-center gap-3 text-[10px] sm:mt-3 sm:gap-4 sm:text-xs">
        <span className="flex items-center gap-1">
          <Eye size={12} className="text-blue-500 sm:h-3.5 sm:w-3.5" />
          {chapter.reads}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={12} className="text-green-500 sm:h-3.5 sm:w-3.5" />
          {chapter.comments}
        </span>
        <span className="flex items-center gap-1">
          <Heart size={12} className="text-red-500 sm:h-3.5 sm:w-3.5" />
          {chapter.likes}
        </span>
      </div>
    </div>
  );
}
