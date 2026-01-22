import { motion } from 'framer-motion';
import { GitBranch, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IChapter } from '@/type/chapter';

interface ChapterBranchInfoProps {
  chapter: IChapter;
  className?: string;
  onNavigateToParent?: () => void;
}

// Static child branches data
const STATIC_BRANCHES = [
  { id: '1', title: 'The Dark Path', author: 'sarah_writer' },
  { id: '2', title: 'Unexpected Ally', author: 'mike_stories' },
  { id: '3', title: 'Hidden Truth', author: 'jane_author' },
];

export function ChapterBranchInfo({
  chapter,
  className,
  onNavigateToParent,
}: ChapterBranchInfoProps) {
  const hasParent = chapter.parentChapterId !== null;
  const hasChildren = chapter.stats.childBranches > 0;
  const isRoot = chapter.depth === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={cn('border-border/50 bg-card/50 rounded-lg border', className)}
    >
      {/* Header */}
      <div className="border-border/50 flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <GitBranch className="text-brand-pink-500 h-4 w-4" />
          <span className="text-sm font-medium">Branch Info</span>
        </div>
        {isRoot && (
          <span className="bg-brand-pink-500/10 text-brand-pink-500 rounded-full px-2 py-0.5 text-[10px]">
            Root
          </span>
        )}
      </div>

      <div className="space-y-3 p-3">
        {/* Parent Chapter */}
        {hasParent && (
          <button
            onClick={onNavigateToParent}
            className="hover:bg-muted/50 flex w-full items-center gap-2 rounded-md p-2 text-left transition-colors"
          >
            <div className="bg-muted-foreground/50 h-1.5 w-1.5 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-[10px]">Parent Chapter</p>
              <p className="truncate text-xs font-medium">
                Previous chapter at depth {chapter.depth - 1}
              </p>
            </div>
            <ExternalLink className="text-muted-foreground h-3 w-3" />
          </button>
        )}

        {/* Child Branches */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-[10px] tracking-wider uppercase">
              Child Branches
            </p>
            <span className="text-muted-foreground text-[10px]">
              {chapter.stats.childBranches} total
            </span>
          </div>

          {hasChildren ? (
            <div className="space-y-1">
              {STATIC_BRANCHES.slice(0, Math.min(chapter.stats.childBranches, 3)).map((branch) => (
                <div
                  key={branch.id}
                  className="hover:bg-muted/50 flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{branch.title}</p>
                    <p className="text-muted-foreground text-[10px]">by {branch.author}</p>
                  </div>
                  <ChevronRight className="text-muted-foreground h-3 w-3" />
                </div>
              ))}
              {chapter.stats.childBranches > 3 && (
                <p className="text-muted-foreground py-1 text-center text-[10px]">
                  +{chapter.stats.childBranches - 3} more
                </p>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground py-4 text-center">
              <GitBranch className="mx-auto mb-1 h-5 w-5 opacity-50" />
              <p className="text-xs">No branches yet</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
