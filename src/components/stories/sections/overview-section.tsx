import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Eye,
  FileEdit,
  Star,
  Users,
  Heart,
  Share2,
  Bell,
  MessageSquare,
  Calendar,
  RefreshCw,
  Info,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { OverviewSectionError, OverviewSectionLoading } from './overview-section/index';
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

  // Static inline statistics
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

  return (
    <motion.div
      {...fadeIn(0)}
      className="mx-auto max-w-3xl space-y-10 px-4 pb-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* TOP BAR */}
      <motion.div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>

        <div className="flex items-center gap-4 text-sm">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Bell size={18} className="cursor-pointer" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex cursor-pointer items-center gap-1"
          >
            <Heart size={18} /> {inlineStats.totalVotes}
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Share2 size={18} className="cursor-pointer" />
          </motion.div>
        </div>
      </motion.div>

      {/* COVER IMAGE */}
      <motion.div
        className="relative max-h-56 w-full overflow-hidden rounded-xl shadow-md"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <img
          src={story.coverImage ? story.coverImage.url : '/images/placeholder-cover.png'}
          alt={story.title}
          className="aspect-[18/8] w-full object-cover"
        />
      </motion.div>

      {/* HEADER */}
      <motion.header
        className="space-y-2"
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
      >
        <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
          {story.slug}
        </div>
        <h1 className="font-libreBaskerville text-3xl leading-snug font-bold">{story.title}</h1>

        <div className="flex flex-wrap gap-2 text-xs">
          <Tag>{story.status}</Tag>
          <Tag>{story.genre}</Tag>
          <Tag>{story.contentRating}</Tag>
        </div>
      </motion.header>

      {/* ABOUT + STATS */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ABOUT */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
        >
          <h2 className="font-libreBaskerville flex items-center gap-2 text-[15px] font-semibold">
            <BookOpen size={16} /> About This Story
          </h2>

          <p
            className="text-muted-foreground text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story.description }}
          />
          <div className="text-muted-foreground space-y-2 text-xs">
            <div className="group-hover:text-primary flex items-center gap-1.5 transition">
              <Calendar size={12} className="opacity-70 transition group-hover:opacity-100" />
              <span>Started: {inlineStats.startedAt}</span>
            </div>

            <div className="group-hover:text-primary flex items-center gap-1.5 transition">
              <RefreshCw size={12} className="opacity-70 transition group-hover:opacity-100" />
              <span>Updated: {inlineStats.updatedAgo}</span>
            </div>

            <div className="group-hover:text-primary flex items-center gap-1.5 transition">
              <Info size={12} className="opacity-70 transition group-hover:opacity-100" />
              <span>Status: {story.status}</span>
            </div>
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32, ease: 'easeOut' }}
        >
          <h2 className="font-libreBaskerville flex items-center gap-2 text-[15px] font-semibold">
            <Star size={16} /> Statistics
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <StatMini
              label="Chapters"
              value={inlineStats.totalChapters}
              icon={<BookOpen size={14} />}
            />
            <StatMini label="Reads" value={inlineStats.totalReads} icon={<Eye size={14} />} />
            <StatMini label="Votes" value={inlineStats.totalVotes} icon={<Heart size={14} />} />
            <StatMini
              label="Contributors"
              value={inlineStats.totalContributors}
              icon={<Users size={14} />}
            />
          </div>

          <div className="text-muted-foreground pt-1 text-xs">
            ⭐ Rating: {inlineStats.rating} ({inlineStats.ratingVotes} votes)
          </div>

          {/* PROGRESS */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <motion.div
                className="h-full w-[80%] bg-amber-500"
                initial={{ width: '0%' }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.2, delay: 0.45, ease: 'easeOut' }}
              />
            </div>
            <p className="text-muted-foreground pt-1 text-[11px]">
              Progress: {inlineStats.progressPercent}% (Est. {inlineStats.estimatedChapters}{' '}
              chapters)
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* COLLABORATORS */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
      >
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <Users size={16} /> Creators & Collaborators
        </h2>

        {/* OWNER */}
        <div
          onClick={() => storyOwner && navigate(`/profile/${storyOwner.clerkId}`)}
          className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition hover:opacity-80"
        >
          <motion.img
            src={storyOwner?.avatarUrl || '/images/placeholder-avatar.png'}
            alt={storyOwner?.username}
            className="h-8 w-8 rounded-full object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />

          <div className="flex flex-col">
            <span className="text-sm font-medium">{storyOwner?.username}</span>
            <span className="text-muted-foreground text-xs">Owner</span>
          </div>

          <Button variant="ghost" size="sm" className="ml-auto text-xs">
            Following ✓
          </Button>
        </div>

        {/* LIST */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {collaborators.slice(0, 3).map((c) => (
            <motion.div
              key={c.clerkId}
              onClick={() => navigate(`/profile/${c.clerkId}`)}
              className="min-w-[120px] cursor-pointer rounded-lg border p-2"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2">
                <img src={c.avatarUrl} className="h-5 w-5 rounded-full object-cover" />
                <span className="truncate text-[11px] font-medium">{c.username}</span>
              </div>
              <p className="text-muted-foreground pt-1 text-[10px]">{c.role}</p>
            </motion.div>
          ))}

          {collaborators.length > 3 && (
            <Button
              variant="link"
              className="min-w-max text-xs"
              onClick={() => navigate(`/story/${slug}/contributors`)}
            >
              +{collaborators.length - 3} more
            </Button>
          )}
        </div>
      </motion.div>

      {/* CHAPTERS */}
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold">Latest Chapters</h2>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => navigate(`/story/${slug}/chapters`)}
          >
            View All Chapters →
          </Button>
        </div>

        {[
          { t: 'Ch. 47: The Final Confrontation', r: '1.2K', c: 45, l: 234, d: '2 days ago' },
          { t: 'Ch. 46: Betrayal at Dawn', r: '2.1K', c: 89, l: 456, d: '5 days ago' },
        ].map((ch, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }}
          >
            <ChapterCard
              title={ch.t}
              reads={ch.r}
              comments={ch.c}
              likes={ch.l}
              date={ch.d}
              authorAvatar="https://i.pinimg.com/474x/33/fb/eb/33fbeb45315109aa81ed6a7d1551552c.jpg"
              authorName="Azure"
              authorRole="Modarator"
              key={1}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* FOOTER */}
      <motion.footer
        className="text-muted-foreground flex items-center gap-1 pt-2 text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <FileEdit size={12} /> Updated {format(new Date(story.lastActivityAt), 'MMM dd, yyyy')}
      </motion.footer>
    </motion.div>
  );
};

const StatMini = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) => (
  <motion.div
    className="flex items-center justify-between rounded-md border px-2.5 py-2"
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
      {icon} {label}
    </div>
    <span className="text-[12px] font-semibold">{value}</span>
  </motion.div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="bg-accent/50 rounded px-2 py-0.5 text-[10px] font-medium"
    initial={{ opacity: 0, y: 3 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.span>
);

const ChapterCard = ({
  title,
  reads,
  comments,
  likes,
  date,
  authorName,
  authorRole,
  authorAvatar,
}: {
  title: string;
  reads: string;
  comments: number;
  likes: number;
  date: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    whileHover={{ y: -2, scale: 1.005 }}
    className="group border-muted/50 hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/10 relative space-y-3 rounded-2xl border bg-white/30 p-4 shadow-sm backdrop-blur-sm transition"
  >
    {/* tree connector line */}
    <div className="bg-muted/40 group-hover:bg-primary/60 absolute top-1/2 -left-2 h-[1px] w-2 transition" />

    {/* AUTHOR DETAILS */}
    <div className="flex items-center gap-2">
      <motion.img
        src={authorAvatar}
        alt={authorName}
        className="border-primary/20 h-7 w-7 rounded-full border object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2 }}
      />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-xs font-semibold">{authorName}</span>
        <span className="text-muted-foreground truncate text-[10px]">{authorRole}</span>
      </div>
    </div>

    {/* CHAPTER TITLE */}
    <h3 className="text-base leading-snug font-bold">{title}</h3>

    {/* DATE */}
    <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{date}</p>

    {/* STATS */}
    <div className="text-muted-foreground flex items-center gap-3 text-[12px]">
      <span className="flex items-center gap-1">
        <Eye size={14} /> {reads}
      </span>
      <span className="text-muted-foreground/30">•</span>
      <span className="flex items-center gap-1">
        <MessageSquare size={14} /> {comments}
      </span>
      <span className="text-muted-foreground/30">•</span>
      <span className="flex items-center gap-1">
        <Heart size={14} /> {likes}
      </span>
    </div>
  </motion.div>
);

export default OverviewSection;
