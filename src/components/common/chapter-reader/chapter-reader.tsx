import { forwardRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Clock,
  User,
  Calendar,
  BookOpen,
  GitBranch,
  Eye,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ChapterAuthor {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
}

export interface ChapterData {
  id: string;
  title: string;
  content: string;
  author: ChapterAuthor;
  storyTitle?: string;
  chapterNumber?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  wordCount?: number;
  readTime?: number;
  status?: 'draft' | 'published' | 'pending';
  stats?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
  parentChapter?: {
    id: string;
    title: string;
  };
  tags?: string[];
}

interface ChapterReaderProps {
  chapter: ChapterData;
  showHeader?: boolean;
  showStats?: boolean;
  showAuthor?: boolean;
  showBreadcrumb?: boolean;
  variant?: 'full' | 'compact' | 'preview';
  className?: string;
}

function calculateReadTime(wordCount: number): number {
  return Math.ceil(wordCount / 200);
}

function getWordCount(content: string): number {
  const text = content.replace(/<[^>]*>/g, '').trim();
  return text ? text.split(/\s+/).length : 0;
}

const ChapterReader = forwardRef<HTMLDivElement, ChapterReaderProps>(
  (
    {
      chapter,
      showHeader = true,
      showStats = true,
      showAuthor = true,
      showBreadcrumb = true,
      variant = 'full',
      className,
    },
    ref
  ) => {
    const wordCount = chapter.wordCount || getWordCount(chapter.content);
    const readTime = chapter.readTime || calculateReadTime(wordCount);

    const isCompact = variant === 'compact';
    const isPreview = variant === 'preview';

    return (
      <div ref={ref} className={cn('chapter-reader', className)}>
        {/* Breadcrumb */}
        {showBreadcrumb && chapter.storyTitle && !isCompact && (
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{chapter.storyTitle}</span>
            {chapter.chapterNumber && (
              <>
                <span>/</span>
                <span>Chapter {chapter.chapterNumber}</span>
              </>
            )}
          </div>
        )}

        {/* Header */}
        {showHeader && (
          <header className={cn('mb-6', isCompact && 'mb-4')}>
            {/* Title */}
            <h1
              className={cn(
                'font-bold tracking-tight',
                isCompact ? 'text-xl' : 'text-2xl sm:text-3xl lg:text-4xl'
              )}
            >
              {chapter.title}
            </h1>

            {/* Meta Row */}
            <div
              className={cn(
                'mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground',
                isCompact && 'mt-2'
              )}
            >
              {/* Read Time */}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>

              {/* Word Count */}
              <div className="flex items-center gap-1">
                <span>{wordCount.toLocaleString()} words</span>
              </div>

              {/* Date */}
              {chapter.createdAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(chapter.createdAt), { addSuffix: true })}
                  </span>
                </div>
              )}

              {/* Status Badge */}
              {chapter.status && chapter.status !== 'published' && (
                <Badge
                  variant={chapter.status === 'draft' ? 'secondary' : 'outline'}
                  className="capitalize"
                >
                  {chapter.status}
                </Badge>
              )}
            </div>

            {/* Parent Chapter (Branch) */}
            {chapter.parentChapter && !isCompact && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <GitBranch className="h-4 w-4" />
                <span>Branched from:</span>
                <span className="font-medium text-foreground">
                  {chapter.parentChapter.title}
                </span>
              </div>
            )}

            {/* Tags */}
            {chapter.tags && chapter.tags.length > 0 && !isCompact && (
              <div className="mt-3 flex flex-wrap gap-2">
                {chapter.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>
        )}

        {/* Author Section */}
        {showAuthor && !isCompact && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={chapter.author.avatar} alt={chapter.author.name} />
                <AvatarFallback>
                  {chapter.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{chapter.author.name}</p>
                {chapter.author.username && (
                  <p className="text-sm text-muted-foreground">@{chapter.author.username}</p>
                )}
              </div>
            </div>
            <Separator className="mb-6" />
          </>
        )}

        {/* Content */}
       <article
  className={cn(
    // Base typography
    'prose prose-gray dark:prose-invert',
    'max-w-3xl mx-auto',

    // Headings
    'prose-headings:font-semibold prose-headings:tracking-tight',
    'prose-h2:mt-10 prose-h2:mb-4',
    'prose-h3:mt-8 prose-h3:mb-3',

    // Paragraphs
    'prose-p:leading-[1.75]',
    'prose-p:my-5',

    // Links
    'prose-a:text-primary prose-a:font-medium',
    'hover:prose-a:underline',

    // Lists
    'prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2',
    'prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2',

    // Blockquotes
    'prose-blockquote:border-l-4',
    'prose-blockquote:border-l-primary/60',
    'prose-blockquote:bg-muted/40',
    'prose-blockquote:px-4 prose-blockquote:py-3',
    'prose-blockquote:rounded-r-md',
    'prose-blockquote:not-italic',

    // Inline code
    'prose-code:rounded-md',
    'prose-code:bg-muted',
    'prose-code:px-1.5 prose-code:py-0.5',
    'prose-code:font-normal',
    'prose-code:text-[0.9em]',
    'prose-code:before:content-none prose-code:after:content-none',

    // Code blocks
    'prose-pre:bg-muted/60',
    'prose-pre:border',
    'prose-pre:rounded-lg',
    'prose-pre:p-4',
    'prose-pre:overflow-x-auto',

    // Tables (optional but useful)
    'prose-table:border prose-table:border-collapse',
    'prose-th:border prose-td:border',
    'prose-th:bg-muted',

    // Compact / preview
    isCompact && 'prose-sm',
    isPreview && 'max-h-[65vh] overflow-y-auto pr-2'
  )}
  dangerouslySetInnerHTML={{ __html: chapter.content }}
/>


        {/* Stats Footer */}
        {showStats && chapter.stats && !isCompact && (
          <>
            <Separator className="my-6" />
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {chapter.stats.views !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{chapter.stats.views.toLocaleString()} views</span>
                </div>
              )}
              {chapter.stats.likes !== undefined && (
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{chapter.stats.likes.toLocaleString()} likes</span>
                </div>
              )}
              {chapter.stats.comments !== undefined && (
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span>{chapter.stats.comments.toLocaleString()} comments</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);

ChapterReader.displayName = 'ChapterReader';

export { ChapterReader };
