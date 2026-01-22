import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IChapter } from '@/type/chapter';

interface ChapterVoteActionsProps {
  votes: IChapter['votes'];
  className?: string;
}

export function ChapterVoteActions({ votes, className }: ChapterVoteActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={cn(
        'border-border/50 bg-card/50 flex items-center justify-between rounded-lg border px-4 py-3',
        className
      )}
    >
      {/* Upvotes */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
          <ThumbsUp className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <p className="text-foreground text-sm font-semibold">{votes.upvotes}</p>
          <p className="text-muted-foreground text-[10px]">Likes</p>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-border/50 h-8 w-px" />

      {/* Score */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            'text-lg font-bold',
            votes.score > 0
              ? 'text-green-600'
              : votes.score < 0
                ? 'text-red-500'
                : 'text-muted-foreground'
          )}
        >
          {votes.score > 0 ? '+' : ''}
          {votes.score}
        </span>
        <p className="text-muted-foreground text-[10px]">Score</p>
      </div>

      {/* Divider */}
      <div className="bg-border/50 h-8 w-px" />

      {/* Downvotes */}
      <div className="flex items-center gap-2.5">
        <div>
          <p className="text-foreground text-sm font-semibold">{votes.downvotes}</p>
          <p className="text-muted-foreground text-[10px]">Dislikes</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10">
          <ThumbsDown className="h-4 w-4 text-red-500" />
        </div>
      </div>
    </motion.div>
  );
}
