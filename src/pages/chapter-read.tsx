import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  GitBranch,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MoreHorizontal,
  Edit,
  GitPullRequest,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ChapterReader, type ChapterData } from '@/components/common/chapter-reader';
import { ReportButton } from '@/components/common/report-appeal';

// Mock data - replace with actual API call
const MOCK_CHAPTER: ChapterData = {
  id: '1',
  title: 'Chapter 5: The Dark Forest',
  content: `
    <p>The wind howled through the ancient trees as Elena stepped into the Dark Forest. She had heard the stories—everyone had—but nothing could have prepared her for this.</p>

    <p>The canopy above was so thick that barely any light filtered through. What little did manage to penetrate cast eerie, dancing shadows on the forest floor. Elena clutched her lantern tighter, its warm glow a small comfort in the overwhelming darkness.</p>

    <h2>The Path Ahead</h2>

    <p>"You shouldn't be here," a voice whispered from somewhere in the shadows. Elena spun around, her heart pounding, but saw nothing. Just more trees, more darkness.</p>

    <p>"Who's there?" she called out, her voice steadier than she felt.</p>

    <p>Silence. Then, slowly, a figure emerged from behind an ancient oak. It was a young man, perhaps a few years older than her, with silver hair that seemed to glow faintly in the dim light.</p>

    <blockquote>
      <p>"The forest doesn't take kindly to strangers," he said, his voice soft but carrying easily through the still air. "Especially ones carrying light."</p>
    </blockquote>

    <p>Elena raised her lantern higher, trying to get a better look at him. "I'm looking for the Heartstone. My village—they need it to survive the winter."</p>

    <p>The stranger's expression shifted, something like respect flickering in his pale eyes. "The Heartstone," he repeated. "That's deep in the forest. Deeper than anyone has gone in centuries."</p>

    <h2>An Unexpected Alliance</h2>

    <p>"Then I'll be the first in centuries to go there," Elena said firmly.</p>

    <p>The young man studied her for a long moment, then nodded slowly. "I'm Kael. And if you're truly set on this path..." He paused, glancing back into the darkness. "Then you'll need a guide."</p>

    <p>Elena hesitated. Trust was a luxury she couldn't afford, but neither could she afford to wander blind in this forest. She extended her hand. "I'm Elena. And I accept your offer—but know that I'm not as helpless as I might look."</p>

    <p>Kael's lips quirked into something almost like a smile as he shook her hand. "I never thought you were. Come. We have a long journey ahead, and the forest grows more dangerous after dark."</p>

    <p>Together, they walked deeper into the shadows, the lantern's light a small beacon of hope in the endless dark.</p>
  `,
  author: {
    id: 'author-1',
    name: 'Sarah Mitchell',
    username: 'sarahmitchell',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  storyTitle: 'The Chronicles of Eldoria',
  chapterNumber: 5,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-16'),
  wordCount: 412,
  status: 'published',
  stats: {
    views: 1234,
    likes: 89,
    comments: 23,
  },
  parentChapter: {
    id: 'ch-4',
    title: 'Chapter 4: The Warning',
  },
  tags: ['fantasy', 'adventure', 'mystery'],
};

export default function ChapterReadPage() {
  const { storyId, chapterId } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  // TODO: Fetch chapter data using storyId and chapterId
  const chapter = MOCK_CHAPTER;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleVote = (vote: 'up' | 'down') => {
    if (userVote === vote) {
      setUserVote(null);
    } else {
      setUserVote(vote);
    }
  };

  const handleBranch = () => {
    navigate(`/stories/${storyId}/chapter/${chapterId}/new`);
  };

  const handleEdit = () => {
    toast.info('Edit functionality coming soon');
  };

  const handleCreatePR = () => {
    toast.info('Submit request functionality coming soon');
  };

  // Report is now handled by ReportButton component

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
            {/* Left - Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            {/* Center - Story Title */}
            <div className="flex items-center gap-2 text-sm">
              <span className="max-w-[150px] truncate text-muted-foreground sm:max-w-[250px]">
                {chapter.storyTitle}
              </span>
              {chapter.chapterNumber && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <Badge variant="secondary" className="font-normal">
                    Ch. {chapter.chapterNumber}
                  </Badge>
                </>
              )}
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
                  <Button variant="ghost" size="icon" onClick={handleBookmark}>
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isBookmarked ? 'Remove bookmark' : 'Bookmark'}</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit} className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Chapter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCreatePR} className="gap-2">
                    <GitPullRequest className="h-4 w-4" />
                    Create Submit Request
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Report Button */}
              <ReportButton
                reportType="CHAPTER"
                relatedId={chapterId || chapter.id}
                relatedTitle={chapter.title}
              />
            </div>
          </div>
        </header>

        {/* Main Content - optimized reading width */}
        <main className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:py-16">
          <ChapterReader chapter={chapter} variant="full" />

          {/* Action Bar - minimal floating style */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3 py-6">
            {/* Voting */}
            <div className="flex items-center gap-1.5 rounded-full border bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-sm">
              <Button
                variant={userVote === 'up' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleVote('up')}
                className={cn(
                  'h-8 gap-1.5 rounded-full px-3',
                  userVote === 'up' && 'bg-primary/90'
                )}
              >
                <ThumbsUp className={cn('h-3.5 w-3.5', userVote === 'up' && 'fill-current')} />
                <span className="text-sm">{(chapter.stats?.likes || 0) + (userVote === 'up' ? 1 : 0)}</span>
              </Button>

              <Button
                variant={userVote === 'down' ? 'destructive' : 'ghost'}
                size="sm"
                onClick={() => handleVote('down')}
                className="h-8 rounded-full px-3"
              >
                <ThumbsDown className={cn('h-3.5 w-3.5', userVote === 'down' && 'fill-current')} />
              </Button>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-sm">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full px-3">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-sm">{chapter.stats?.comments || 0}</span>
              </Button>
            </div>

            {/* Branch Button */}
            <Button onClick={handleBranch} className="h-9 gap-2 rounded-full px-5 shadow-sm">
              <GitBranch className="h-3.5 w-3.5" />
              Write a Branch
            </Button>
          </div>

          {/* Navigation to Next/Previous Chapters */}
          {chapter.parentChapter && (
            <div className="mt-8 border-t border-border/30 pt-8">
              <Button
                variant="ghost"
                className="flex h-auto w-full flex-col items-start gap-1 rounded-xl border border-border/50 bg-muted/20 p-5 text-left transition-colors hover:bg-muted/40"
                onClick={() => navigate(`/stories/${storyId}/chapter/${chapter.parentChapter?.id}`)}
              >
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                  Previous Chapter
                </span>
                <span className="font-serif text-base font-medium text-foreground">
                  {chapter.parentChapter.title}
                </span>
              </Button>
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}
