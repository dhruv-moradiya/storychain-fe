import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { Pencil } from 'lucide-react';

import { ChapterReader, type ChapterData } from '@/components/common/chapter-reader';
import {
  ChapterDetailsHeader,
  ChapterDeleteDialog,
  ChapterDetailsSkeleton,
  ChapterDetailsError,
  ChapterInfoCard,
  ChapterPRStatus,
  ChapterVoteActions,
  ChapterBranchInfo,
} from '@/components/chapter-details';
import { useGetChapterById } from '@/hooks/chapter/chapter.queries';
import { useDeleteChapter } from '@/hooks/chapter/chapter.mutations';
import { Button } from '@/components/ui/button';

export default function ChapterDetailsPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch chapter data
  const { data: chapterResponse, isLoading, error, refetch } = useGetChapterById(chapterId || '');

  const deleteChapter = useDeleteChapter();

  const chapter = chapterResponse?.data;
  const isAuthor = chapter && user?.id === chapter.authorId;

  // Handlers
  const handleBack = () => {
    navigate(-1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleEdit = () => {
    if (!chapter) return;
    navigate(`/builder?autoSaveId=${chapter._id}`);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!chapterId) return;

    deleteChapter.mutate(chapterId, {
      onSuccess: () => {
        toast.success('Chapter deleted successfully');
        setIsDeleteDialogOpen(false);
        navigate('/dashboard');
      },
      onError: (err) => {
        toast.error(err.message || 'Failed to delete chapter');
      },
    });
  };

  // Loading state
  if (isLoading) {
    return <ChapterDetailsSkeleton />;
  }

  // Error state
  if (error || !chapter) {
    return <ChapterDetailsError error={error} onRetry={() => refetch()} onBack={handleBack} />;
  }

  // Transform chapter data for ChapterReader component
  const chapterData: ChapterData = {
    id: chapter._id,
    title: chapter.title,
    content: chapter.content,
    author: {
      id: chapter.author?.clerkId || chapter.authorId,
      name: chapter.author?.username || 'Unknown Author',
      avatar: undefined,
    },
    storyTitle: chapter.story?.title,
    chapterNumber: chapter.chapterNumber,
    createdAt: chapter.createdAt,
    updatedAt: chapter.updatedAt,
    status: chapter.status === 'published' ? 'published' : 'draft',
    stats: {
      views: chapter.stats.reads,
      likes: chapter.votes.upvotes,
      comments: chapter.stats.comments,
    },
  };

  const handleNavigateToParent = () => {
    if (chapter.parentChapterId) {
      navigate(`/chapters/${chapter.parentChapterId}`);
    }
  };

  const handleViewPR = () => {
    if (chapter.pullRequest?.prId) {
      navigate(`/submit-requests/${chapter.pullRequest.prId}`);
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-bg-cream min-h-screen">
        {/* Header */}
        <ChapterDetailsHeader
          chapter={chapter}
          storyTitle={chapter.story?.title}
          storySlug={chapter.story?.slug}
          isBookmarked={isBookmarked}
          isAuthor={isAuthor}
          onBack={handleBack}
          onBookmark={handleBookmark}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Main Content - Two Column Layout */}
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left Column - Main Content */}
            <div className="min-w-0 flex-1">
              {/* Author Notice */}
              {isAuthor && (
                <div className="border-brand-pink-500/20 bg-brand-pink-500/5 mb-6 flex items-center justify-between rounded-lg border p-3">
                  <p className="text-brand-pink-600 text-sm">This is your chapter</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-pink-500/30 text-brand-pink-600 hover:bg-brand-pink-500/10 gap-1.5"
                    onClick={handleEdit}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>
              )}

              {/* Chapter Content */}
              <ChapterReader
                chapter={chapterData}
                variant="full"
                showHeader={true}
                showStats={false}
              />
            </div>

            {/* Right Column - Sidebar */}
            <aside className="w-full space-y-3 lg:w-72 lg:shrink-0">
              {/* Chapter Info */}
              <ChapterInfoCard
                chapter={chapter}
                storyTitle={chapter.story?.title}
                storySlug={chapter.story?.slug}
              />

              {/* Votes Display */}
              <ChapterVoteActions votes={chapter.votes} />

              {/* PR Status */}
              {chapter.pullRequest?.isPR && (
                <ChapterPRStatus pullRequest={chapter.pullRequest} onViewPR={handleViewPR} />
              )}

              {/* Branch Info */}
              <ChapterBranchInfo chapter={chapter} onNavigateToParent={handleNavigateToParent} />
            </aside>
          </div>
        </main>

        {/* Delete Confirmation Dialog */}
        <ChapterDeleteDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          chapterTitle={chapter.title}
          isDeleting={deleteChapter.isPending}
          onConfirm={confirmDelete}
        />
      </div>
    </TooltipProvider>
  );
}
