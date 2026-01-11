import { motion } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { FileEdit } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import {
  OverviewSectionError,
  OverviewSectionLoading,
  StoryHero,
  StoryStats,
  CollaboratorsPreview,
  ChapterPreview,
} from './overview-section/index';
import { StoryCollaboratorRole } from '@/type/story.type';
import { useGetStoryOverviewBySlug } from '@/hooks/story/story.queries';

const OverviewSection = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetStoryOverviewBySlug(slug ?? '');
  const story = data?.data;

  if (isLoading) return <OverviewSectionLoading />;
  if (error) return <OverviewSectionError message={error.message} />;
  if (!story) return <OverviewSectionError message="Story not found." />;

  const storyOwner = story.collaborators.find((c) => c.role === StoryCollaboratorRole.OWNER);
  const collaborators = story.collaborators.filter((c) => c.role !== StoryCollaboratorRole.OWNER);

  // Static inline statistics (would come from API in real app)
  const inlineStats = {
    totalChapters: 47,
    totalReads: '12.5K',
    totalVotes: '2.3K',
    totalContributors: 23,
    rating: '4.7/5',
    ratingVotes: 342,
    progressPercent: 80,
    estimatedChapters: 60,
    startedAt: 'Jan 2024',
    updatedAgo: formatDistanceToNow(new Date(story.lastActivityAt), { addSuffix: true }),
  };

  // Mock chapter data
  const latestChapters = [
    {
      title: 'Ch. 47: The Final Confrontation',
      reads: '1.2K',
      comments: 45,
      likes: 234,
      date: '2 days ago',
      authorName: 'Azure',
      authorRole: 'Moderator',
      authorAvatar: 'https://i.pinimg.com/474x/33/fb/eb/33fbeb45315109aa81ed6a7d1551552c.jpg',
    },
    {
      title: 'Ch. 46: Betrayal at Dawn',
      reads: '2.1K',
      comments: 89,
      likes: 456,
      date: '5 days ago',
      authorName: 'Fantasy Writer',
      authorRole: 'Owner',
      authorAvatar: 'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl space-y-8 px-4 pb-14"
    >
      {/* Hero Section */}
      <StoryHero
        coverImage={story.coverImage?.url}
        title={story.title}
        slug={story.slug}
        status={story.status}
        genre={story.genre}
        contentRating={story.contentRating}
        totalVotes={inlineStats.totalVotes}
        onBack={() => navigate('/')}
      />

      {/* Stats Section */}
      <StoryStats description={story.description} stats={inlineStats} status={story.status} />

      {/* Collaborators Section */}
      <CollaboratorsPreview
        owner={storyOwner}
        collaborators={collaborators}
        onOwnerClick={(clerkId) => navigate(`/profile/${clerkId}`)}
        onCollaboratorClick={(clerkId) => navigate(`/profile/${clerkId}`)}
        onViewAll={() => navigate(`/stories/${slug}/collaborators`)}
      />

      {/* Chapters Section */}
      <ChapterPreview
        chapters={latestChapters}
        onViewAll={() => navigate(`/stories/${slug}/chapters`)}
        onStartReading={() => navigate(`/stories/${slug}/chapter/1`)}
        onContinueReading={() => navigate(`/stories/${slug}/chapter/23`)}
        continueChapter="Ch. 23: The Escape"
      />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-border/30 text-text-secondary-65 flex items-center gap-2 border-t pt-4 text-xs"
      >
        <FileEdit size={14} />
        <span>Last updated {format(new Date(story.lastActivityAt), 'MMM dd, yyyy')}</span>
      </motion.footer>
    </motion.div>
  );
};

export default OverviewSection;
