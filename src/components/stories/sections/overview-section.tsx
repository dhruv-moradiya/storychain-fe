import { Button } from '@/components/ui/button';
import { useGetStoryOverviewBySlug } from '@/hooks/story/story.queries';
import { fadeIn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Eye, FileEdit, Globe, Lock, Star, Users } from 'lucide-react';
import { useParams } from 'react-router';
import { OverviewSectionLoading, OverviewSectionError } from './overview-section/index';
import { format } from 'date-fns';

const OverviewSection = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetStoryOverviewBySlug(slug ?? '');
  const story = data?.data;

  console.log('story :>> ', story);

  if (isLoading) {
    return <OverviewSectionLoading />;
  }

  if (error) {
    return <OverviewSectionError message={error.message} />;
  }

  if (!story) {
    return <OverviewSectionError message="Story not found." />;
  }

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-xl space-y-10 pb-14">
      <Button variant="outline" size="sm" className="flex cursor-pointer items-center gap-2">
        <ArrowLeft size={16} />
        <span>Back</span>
      </Button>

      {/* ===== IMAGE ===== */}
      <motion.div {...fadeIn(0.1)}>
        <img
          src={story.coverImage ? story.coverImage.url : '/images/placeholder-cover.png'}
          alt={story.title}
          className="h-64 w-full rounded-xl object-cover shadow-md"
        />
      </motion.div>

      {/* ===== HEADER ===== */}
      <motion.header {...fadeIn(0.2)} className="space-y-2">
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          {/* {story. ? <Globe size={14} className="text-green-600" /> : <Lock size={14} />}/ */}
          {story.slug}
        </div>
        <h1 className="text-3xl leading-snug font-bold">{story.title}</h1>
        <div className="flex gap-2 text-xs">
          <Tag>{story.status}</Tag>
          <Tag>{story.genre}</Tag>
          <Tag>{story.contentRating}</Tag>
        </div>
      </motion.header>

      {/* ===== SUMMARY ===== */}
      <motion.div {...fadeIn(0.3)} className="leading-relaxed">
        <h2 className="mb-1 text-[15px] font-semibold">Summary</h2>
        <p
          className="text-muted-foreground text-sm"
          dangerouslySetInnerHTML={{ __html: story.description }}
        ></p>
      </motion.div>

      {/* ===== STATS ===== */}
      <motion.div {...fadeIn(0.4)} className="space-y-3">
        <h2 className="text-[15px] font-semibold">Statistics</h2>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-3"
        >
          <StatCard
            icon={<BookOpen size={18} />}
            label="Chapters"
            value={story.stats.totalChapters}
          />
          <StatCard icon={<Eye size={18} />} label="Reads" value={story.stats.totalReads} />
          <StatCard icon={<Star size={18} />} label="Votes" value={story.stats.totalVotes} />
          <StatCard
            icon={<Users size={18} />}
            label="Contributors"
            value={story.stats.uniqueContributors}
          />
        </motion.div>
      </motion.div>

      {/* FOOT */}
      <motion.footer {...fadeIn(0.6)} className="text-muted-foreground flex gap-1 pt-2 text-[11px]">
        <FileEdit size={12} /> Updated {format(new Date(story.lastActivityAt), 'MMM dd, yyyy')}
      </motion.footer>
    </motion.section>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <div className="bg-muted/40 hover:bg-muted hover:border-foreground/20 flex items-center justify-between rounded-md border px-3 py-2.5 transition-colors">
    <div className="text-muted-foreground flex items-center gap-2 text-sm">
      {icon} {label}
    </div>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-accent/50 rounded px-2 py-0.5 text-[10px] font-medium">{children}</span>
);

export default OverviewSection;
