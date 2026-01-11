import { motion } from 'framer-motion';
import { BookOpen, Eye, Heart, Users, Star, Calendar, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryStatsProps {
  description: string;
  stats: {
    totalChapters: number;
    totalReads: string;
    totalVotes: string;
    totalContributors: number;
    rating: string;
    ratingVotes: number;
    progressPercent: number;
    estimatedChapters: number;
    startedAt: string;
    updatedAgo: string;
  };
  status: string;
}

export function StoryStats({ description, stats, status }: StoryStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-border/50 space-y-4 rounded-xl border p-5"
      >
        <h2 className="text-text-primary flex items-center gap-2 font-semibold">
          <BookOpen size={18} className="text-brand-pink-500" />
          About This Story
        </h2>

        <div
          className="text-text-secondary prose-p:font-serif prose-p:text-[1.125rem] prose-p:leading-[1.9] prose-p:tracking-[0.01em] prose prose-lg prose-gray dark:prose-invert text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="text-text-secondary-65 space-y-2 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-pink-500/70" />
            <span>Started: {stats.startedAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className="text-brand-pink-500/70" />
            <span>Updated: {stats.updatedAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-brand-pink-500/70" />
            <span>Status: {status}</span>
          </div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="border-border/50 space-y-4 rounded-xl border p-5"
      >
        <h2 className="text-text-primary flex items-center gap-2 font-semibold">
          <Star size={18} className="text-brand-orange" />
          Statistics
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<BookOpen size={16} />}
            label="Chapters"
            value={stats.totalChapters}
            color="pink"
          />
          <StatCard icon={<Eye size={16} />} label="Reads" value={stats.totalReads} color="blue" />
          <StatCard icon={<Heart size={16} />} label="Votes" value={stats.totalVotes} color="red" />
          <StatCard
            icon={<Users size={16} />}
            label="Contributors"
            value={stats.totalContributors}
            color="purple"
          />
        </div>

        {/* Rating */}
        <div className="text-text-secondary-65 flex items-center gap-2 text-sm">
          <span className="text-yellow-500">⭐</span>
          <span>
            Rating: <strong className="text-text-primary">{stats.rating}</strong> (
            {stats.ratingVotes} votes)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="bg-muted/50 h-2 w-full overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.progressPercent}%` }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="from-brand-pink-500 to-brand-orange h-full bg-gradient-to-r"
            />
          </div>
          <p className="text-text-secondary-65 text-xs">
            Progress: {stats.progressPercent}% (Est. {stats.estimatedChapters} chapters)
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color: 'pink' | 'blue' | 'red' | 'purple';
}) {
  const colorStyles = {
    pink: 'text-brand-pink-500 border-brand-pink-500/30',
    blue: 'text-blue-500 border-blue-500/30',
    red: 'text-red-500 border-red-500/30',
    purple: 'text-purple-500 border-purple-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={cn('flex items-center justify-between rounded-lg border p-3', colorStyles[color])}
    >
      <div className="text-text-secondary-65 flex items-center gap-2 text-xs">
        <span className={cn(colorStyles[color].split(' ')[0])}>{icon}</span>
        {label}
      </div>
      <span className="text-text-primary text-sm font-bold">{value}</span>
    </motion.div>
  );
}
