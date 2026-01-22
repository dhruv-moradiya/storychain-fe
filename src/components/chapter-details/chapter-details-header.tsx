import { chapterStatusBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { IChapter } from '@/type/chapter';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Share2,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

interface ChapterDetailsHeaderProps {
  chapter: IChapter;
  storyTitle?: string;
  storySlug?: string;
  isBookmarked?: boolean;
  isAuthor?: boolean;
  onBack: () => void;
  onBookmark?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ChapterDetailsHeader({
  chapter,
  storyTitle,
  storySlug,
  isBookmarked = false,
  isAuthor = false,
  onBack,
  onBookmark,
  onEdit,
  onDelete,
}: ChapterDetailsHeaderProps) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <header className="border-border/50 bg-bg-cream sticky top-0 z-10 border-b">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        {/* Left - Back Button */}
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        {/* Center - Story Title & Status */}
        <div className="flex items-center gap-2 text-sm">
          {storyTitle && (
            <>
              <span className="text-muted-foreground max-w-[150px] truncate sm:max-w-[250px]">
                {storyTitle}
              </span>
              <span className="text-muted-foreground">/</span>
            </>
          )}
          {chapterStatusBadge(chapter.status)}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onBookmark}>
                {isBookmarked ? (
                  <BookmarkCheck className="text-brand-pink-500 h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isBookmarked ? 'Remove bookmark' : 'Bookmark'}</TooltipContent>
          </Tooltip>

          {/* Author Actions Dropdown */}
          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Chapter
                </DropdownMenuItem>
                {storySlug && (
                  <DropdownMenuItem
                    onClick={() => window.open(`/stories/${storySlug}`, '_blank')}
                    className="gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Story
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete Chapter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
