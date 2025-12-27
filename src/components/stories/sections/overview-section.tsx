import { Button } from '@/components/ui/button';
import { useGetStoryOverviewBySlug } from '@/hooks/story/story.queries';
import { fadeIn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Eye, FileEdit, Globe, Lock, Star, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { OverviewSectionLoading, OverviewSectionError } from './overview-section/index';
import { format } from 'date-fns';
import { useState } from 'react';

const staticCreator = {
  id: 99,
  name: 'Dhruv',
  avatar: 'https://i.pinimg.com/1200x/ac/01/cc/ac01cc2a6b2fccf2b97bcb131c21b9a9.jpg',
  role: 'Author • Creator • Universe Architect',
  bio: 'Dreams stories into existence.',
};

const staticCollaborators = [
  {
    id: 1,
    name: 'Aarav',
    avatar: 'https://i.pinimg.com/1200x/ac/01/cc/ac01cc2a6b2fccf2b97bcb131c21b9a9.jpg',
    role: 'Co-Writer',
  },
  {
    id: 2,
    name: 'Meera',
    avatar: 'https://i.pinimg.com/1200x/ac/01/cc/ac01cc2a6b2fccf2b97bcb131c21b9a9.jpg',
    role: 'Editor',
  },
  {
    id: 3,
    name: 'Ishaan',
    avatar: 'https://i.pinimg.com/1200x/ac/01/cc/ac01cc2a6b2fccf2b97bcb131c21b9a9.jpg',
    role: 'Reviewer',
  },
];

const OverviewSection = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetStoryOverviewBySlug(slug ?? '');
  const story = data?.data;

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

      {/* ===== PEOPLE ===== */}
      <motion.div {...fadeIn(0.35)} className="space-y-4">
        <h2 className="text-base font-semibold">People</h2>

        {/* Creator */}
        <div
          onClick={() => navigate(`/profile/${staticCreator.id}`)}
          className="flex cursor-pointer items-center gap-3 transition hover:opacity-70"
        >
          <img
            src={staticCreator.avatar}
            alt={staticCreator.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{staticCreator.name}</span>
            <span className="text-muted-foreground text-xs">{staticCreator.role}</span>
          </div>
        </div>

        {/* Contributors */}
        <div className="space-y-2">
          {staticCollaborators.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/profile/${c.id}`)}
              className="flex cursor-pointer items-center gap-3 transition hover:opacity-70"
            >
              <img src={c.avatar} alt={c.name} className="h-7 w-7 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-sm">{c.name}</span>
                <span className="text-muted-foreground text-xs">{c.role}</span>
              </div>

              {/* Follow (static) */}
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Follow clicked for', c.name);
                }}
              >
                Follow
              </Button>
            </div>
          ))}
        </div>

        {/* View all contributors link */}
        <Button
          variant="link"
          className="h-auto p-0 text-xs"
          onClick={() => navigate(`/story/${slug}/contributors`)}
        >
          Show all contributors →
        </Button>
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
