import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Minus, ThumbsUp, TrendingDown, TrendingUp } from 'lucide-react';
import type { LeaderboardUser } from '../leaderboard.types';

interface WritersListProps {
  writers: LeaderboardUser[];
}

export function WritersList({ writers }: WritersListProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getRankStyle = (rank: number) => {
    if (rank === 4) return 'from-purple-400 to-purple-500';
    if (rank === 5) return 'from-blue-400 to-blue-500';
    return 'from-gray-400 to-gray-500';
  };

  // Skip first 3 as they're on the podium
  const listWriters = writers.slice(3);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {listWriters.map((writer, index) => (
        <motion.div
          key={writer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={cn(
            'group relative cursor-pointer overflow-hidden rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur transition-all hover:shadow-lg',
            writer.isCurrentUser
              ? 'border-brand-pink-500/30 ring-brand-pink-500/20 ring-2'
              : 'hover:border-brand-pink-500/20 border-black/5'
          )}
        >
          {/* Subtle gradient background */}
          <div className="to-cream-90/30 pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent" />

          {/* Current user indicator */}
          {writer.isCurrentUser && (
            <div className="absolute top-3 right-3">
              <span className="bg-brand-pink-500 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                You
              </span>
            </div>
          )}

          <div className="relative">
            {/* Top section: Avatar and rank */}
            <div className="mb-4 flex items-start gap-3">
              {/* Rank Badge */}
              <div
                className={cn(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white shadow-md',
                  getRankStyle(writer.rank)
                )}
              >
                {writer.rank}
              </div>

              {/* Avatar with ring */}
              <div className="relative">
                <div className="from-brand-pink-500/20 to-brand-blue/20 rounded-full bg-gradient-to-br p-0.5">
                  <img
                    src={writer.avatarUrl}
                    alt={writer.username}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                </div>

                {/* Rank change indicator */}
                <div className="absolute -right-1 -bottom-1">
                  {writer.rankChange > 0 ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  ) : writer.rankChange < 0 ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
                      <TrendingDown className="h-3 w-3" />
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-white shadow-sm">
                      <Minus className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>

              {/* Badges */}
              {writer.badges.length > 0 && (
                <div className="ml-auto flex gap-1">
                  {writer.badges.slice(0, 3).map((badge) => (
                    <span key={badge.id} className="text-base drop-shadow-sm" title={badge.name}>
                      {badge.icon}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="mb-3">
              <p className="text-text-tertiary group-hover:text-brand-pink-500 truncate font-semibold transition-colors">
                {writer.displayName}
              </p>
              <p className="text-brand-pink-500 text-xs font-medium">@{writer.username}</p>
            </div>

            {/* Stats Grid */}
            <div className="bg-cream-90/50 grid grid-cols-3 gap-2 rounded-xl p-2.5">
              <div className="flex flex-col items-center">
                <div className="text-brand-pink-500 flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span className="text-text-tertiary text-sm font-bold">
                    {formatNumber(writer.stats.totalReads)}
                  </span>
                </div>
                <span className="text-text-secondary-65 text-[10px]">reads</span>
              </div>
              <div className="border-border/30 flex flex-col items-center border-x">
                <div className="text-brand-blue flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="text-text-tertiary text-sm font-bold">
                    {writer.stats.storiesWritten}
                  </span>
                </div>
                <span className="text-text-secondary-65 text-[10px]">stories</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-amber-500">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="text-text-tertiary text-sm font-bold">
                    {formatNumber(writer.stats.upvotesReceived)}
                  </span>
                </div>
                <span className="text-text-secondary-65 text-[10px]">votes</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
