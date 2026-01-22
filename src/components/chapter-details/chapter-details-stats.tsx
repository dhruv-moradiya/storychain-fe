import { motion } from 'framer-motion';
import { Eye, ThumbsUp, ThumbsDown, MessageSquare, GitBranch, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IChapter } from '@/type/chapter';

interface ChapterDetailsStatsProps {
  chapter: IChapter;
  className?: string;
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function ChapterDetailsStats({ chapter, className }: ChapterDetailsStatsProps) {
  const stats = [
    {
      icon: Eye,
      label: 'Reads',
      value: formatNumber(chapter.stats.reads),
    },
    {
      icon: ThumbsUp,
      label: 'Upvotes',
      value: formatNumber(chapter.votes.upvotes),
      color: 'text-green-600',
    },
    {
      icon: ThumbsDown,
      label: 'Downvotes',
      value: formatNumber(chapter.votes.downvotes),
      color: 'text-red-500',
    },
    {
      icon: MessageSquare,
      label: 'Comments',
      value: formatNumber(chapter.stats.comments),
    },
    {
      icon: GitBranch,
      label: 'Branches',
      value: formatNumber(chapter.stats.childBranches),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={cn('space-y-4', className)}
    >
      {/* Stats Grid */}
      <div className="border-border/50 grid grid-cols-5 gap-2 rounded-xl border p-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <stat.icon className={cn('text-text-secondary-65 h-4 w-4', stat.color)} />
            <span className="text-text-primary text-lg font-semibold">{stat.value}</span>
            <span className="text-text-secondary-65 text-xs">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Date Info */}
      <div className="text-text-secondary-65 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>Created {formatDate(chapter.createdAt)}</span>
        </div>
        {chapter.updatedAt !== chapter.createdAt && (
          <span>Updated {formatDate(chapter.updatedAt)}</span>
        )}
      </div>
    </motion.div>
  );
}
