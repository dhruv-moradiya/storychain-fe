import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, GitBranch, CheckCircle, BookOpen } from 'lucide-react';
import type { TopContributor } from '../leaderboard.types';

interface ContributorsListProps {
  contributors: TopContributor[];
}

export function ContributorsList({ contributors }: ContributorsListProps) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-amber-400 to-amber-500 text-white';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-br from-orange-300 to-orange-400 text-white';
    return 'bg-cream-90 text-text-secondary-65';
  };

  return (
    <div className="space-y-2">
      {contributors.map((contributor, index) => (
        <motion.div
          key={contributor.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group border-border/50 bg-cream-95 hover:border-brand-pink-500/30 flex items-center gap-3 rounded-xl border px-3 py-3 transition-all hover:shadow-sm sm:gap-4 sm:px-4"
        >
          {/* Rank */}
          <div
            className={cn(
              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold',
              getRankStyle(contributor.rank)
            )}
          >
            {contributor.rank}
          </div>

          {/* Rank Change */}
          <div className="flex w-5 flex-shrink-0 items-center justify-center">
            {contributor.rankChange > 0 ? (
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4" />
              </div>
            ) : contributor.rankChange < 0 ? (
              <div className="flex items-center text-red-500">
                <TrendingDown className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center text-gray-400">
                <Minus className="h-4 w-4" />
              </div>
            )}
          </div>

          {/* Avatar */}
          <img
            src={contributor.avatarUrl}
            alt={contributor.username}
            className="ring-border/50 h-10 w-10 flex-shrink-0 rounded-full object-cover ring-2 sm:h-12 sm:w-12"
          />

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="text-text-primary truncate font-semibold">@{contributor.username}</p>
            <p className="text-text-secondary-65 text-xs">
              Contributed to {contributor.storiesContributed} stories
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="text-brand-blue flex items-center gap-1">
                <GitBranch className="h-4 w-4" />
                <span className="text-text-primary text-sm font-bold">
                  {contributor.contributions}
                </span>
              </div>
              <span className="text-text-secondary-65 text-[10px]">branches</span>
            </div>

            <div className="hidden flex-col items-center sm:flex">
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <span className="text-text-primary text-sm font-bold">
                  {contributor.acceptanceRate}%
                </span>
              </div>
              <span className="text-text-secondary-65 text-[10px]">accepted</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
