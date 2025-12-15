import { Clock, FileText, History, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type ChapterStatus = 'draft' | 'pending' | 'published' | 'rejected';

interface EditorStatusBarProps {
  status: ChapterStatus;
  wordCount: number;
  charCount: number;
  chapterTitle?: string;
  onHistoryClick?: () => void;
  onHelpClick?: () => void;
}

const STATUS_CONFIG: Record<
  ChapterStatus,
  { label: string; color: string; dotColor: string }
> = {
  draft: {
    label: 'Draft',
    color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    dotColor: 'bg-slate-500',
  },
  pending: {
    label: 'Pending Review',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    dotColor: 'bg-amber-500',
  },
  published: {
    label: 'Published',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    dotColor: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    dotColor: 'bg-red-500',
  },
};

function calculateReadTime(wordCount: number): string {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  if (minutes < 1) return '< 1 min read';
  return `~${minutes} min read`;
}

export function EditorStatusBar({
  status,
  wordCount,
  charCount,
  chapterTitle = 'Untitled Chapter',
  onHistoryClick,
  onHelpClick,
}: EditorStatusBarProps) {
  const statusConfig = STATUS_CONFIG[status];
  const readTime = calculateReadTime(wordCount);

  return (
    <TooltipProvider>
      <div className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-2">
          {/* Left Section - Status & Chapter Title */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className={cn('gap-1.5', statusConfig.color)}>
              <span className={cn('h-2 w-2 rounded-full', statusConfig.dotColor)} />
              {statusConfig.label}
            </Badge>

            <div className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <FileText className="h-3.5 w-3.5" />
              <span className="max-w-[200px] truncate">{chapterTitle}</span>
            </div>
          </div>

          {/* Center Section - Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-default">
                  {wordCount.toLocaleString()} words
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{charCount.toLocaleString()} characters</p>
              </TooltipContent>
            </Tooltip>

            <span className="hidden text-muted-foreground/50 sm:inline">|</span>

            <span className="hidden sm:inline">{charCount.toLocaleString()} chars</span>

            <span className="hidden text-muted-foreground/50 md:inline">|</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="hidden cursor-default items-center gap-1 md:flex">
                  <Clock className="h-3 w-3" />
                  {readTime}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Estimated reading time at 200 words/minute</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1">
            {onHistoryClick && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onHistoryClick}
                    className="h-7 gap-1.5 px-2 text-xs"
                  >
                    <History className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">History</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View version history</p>
                </TooltipContent>
              </Tooltip>
            )}

            {onHelpClick && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onHelpClick}
                    className="h-7 w-7"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Keyboard shortcuts & help</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
