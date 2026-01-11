import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Clock, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import { forwardRef } from 'react';

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
  ({ chapter, showHeader = true, showStats = true, variant = 'full', className }, ref) => {
    const wordCount = chapter.wordCount || getWordCount(chapter.content);
    const readTime = chapter.readTime || calculateReadTime(wordCount);

    const isCompact = variant === 'compact';
    const isPreview = variant === 'preview';

    return (
      <div ref={ref} className={cn('chapter-reader', className)}>
        {/* Header - Clean and minimal */}
        {showHeader && (
          <header className={cn('mb-10', isCompact && 'mb-4')}>
            {/* Title */}
            <h1
              className={cn(
                'text-text-primary font-serif font-bold tracking-tight',
                isCompact ? 'text-xl' : 'text-2xl sm:text-3xl'
              )}
            >
              {chapter.title}
            </h1>

            {/* Simple meta - just read time and author */}
            <div
              className={cn(
                'text-text-secondary-65 mt-4 flex items-center gap-4 text-sm',
                isCompact && 'mt-2'
              )}
            >
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={chapter.author.avatar} alt={chapter.author.name} />
                  <AvatarFallback className="text-xs">
                    {chapter.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{chapter.author.name}</span>
              </div>
            </div>
          </header>
        )}

        {/* Content */}
        <article
          className={cn(
            // Base typography - optimized for reading
            'prose prose-lg prose-gray dark:prose-invert',
            'mx-auto max-w-none',

            // Font settings for better readability
            'prose-p:font-serif prose-p:text-[1.125rem] prose-p:leading-[1.9] prose-p:tracking-[0.01em]',
            'prose-p:text-text-secondary prose-p:my-6',

            // Headings
            'prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-text-primary',
            'prose-h2:mt-12 prose-h2:mb-5 prose-h2:text-xl',
            'prose-h3:mt-10 prose-h3:mb-4',

            // Links
            'prose-a:text-brand-pink-500 prose-a:font-medium prose-a:no-underline',
            'hover:prose-a:underline',

            // Lists
            'prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3',
            'prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-3',
            'prose-li:font-serif prose-li:text-[1.125rem] prose-li:leading-[1.9]',

            // Blockquotes - elegant style
            'prose-blockquote:border-l-4',
            'prose-blockquote:border-l-brand-pink-500/40',
            'prose-blockquote:pl-6 prose-blockquote:py-1',
            'prose-blockquote:not-italic',
            'prose-blockquote:font-serif prose-blockquote:text-text-secondary-65',

            'selection:bg-primary selection:text-muted',

            // Compact / preview
            isCompact && 'prose-base prose-p:text-base prose-p:leading-[1.75] prose-p:my-4',
            isPreview && 'max-h-[65vh] overflow-y-auto pr-2'
          )}
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />

        {/* Stats Footer */}
        {showStats && chapter.stats && !isCompact && (
          <>
            <Separator className="my-6" />
            <div className="text-muted-foreground flex items-center gap-6 text-sm">
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
