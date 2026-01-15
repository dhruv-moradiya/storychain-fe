import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Eye, BookOpen, ThumbsUp } from 'lucide-react';
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

  // Skip first 3 as they're on the podium
  const listWriters = writers.slice(3);

  return (
    <div className="space-y-2">
      {listWriters.map((writer, index) => (
        <motion.div
          key={writer.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={cn(
            'group flex items-center gap-3 rounded-xl px-3 py-3 transition-all sm:gap-4 sm:px-4',
            writer.isCurrentUser
              ? 'border-brand-pink-500/30 bg-brand-pink-500/5 border'
              : 'hover:bg-cream-90/60'
          )}
        >
          {/* Rank */}
          <div className="flex w-8 flex-shrink-0 items-center justify-center">
            <span className="text-text-secondary-65 text-lg font-bold">{writer.rank}</span>
          </div>

          {/* Rank Change */}
          <div className="flex w-5 flex-shrink-0 items-center justify-center">
            {writer.rankChange > 0 ? (
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4" />
              </div>
            ) : writer.rankChange < 0 ? (
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
            src={writer.avatarUrl}
            alt={writer.username}
            className="ring-border/50 h-10 w-10 flex-shrink-0 rounded-full object-cover ring-2 sm:h-12 sm:w-12"
          />

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-text-primary truncate font-semibold">{writer.displayName}</p>
              {writer.isCurrentUser && (
                <span className="bg-brand-pink-500 rounded-full px-2 py-0.5 text-[10px] font-medium text-white">
                  You
                </span>
              )}
              {writer.badges.slice(0, 2).map((badge) => (
                <span key={badge.id} className="text-sm" title={badge.name}>
                  {badge.icon}
                </span>
              ))}
            </div>
            <p className="text-text-secondary-65 text-xs">@{writer.username}</p>
          </div>

          {/* Stats */}
          <div className="hidden items-center gap-4 text-xs sm:flex">
            <div className="text-text-secondary-65 flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{formatNumber(writer.stats.totalReads)}</span>
            </div>
            <div className="text-text-secondary-65 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{writer.stats.storiesWritten}</span>
            </div>
            <div className="text-text-secondary-65 flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{formatNumber(writer.stats.upvotesReceived)}</span>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="flex flex-col items-end sm:hidden">
            <span className="text-text-primary text-sm font-semibold">
              {formatNumber(writer.stats.totalReads)}
            </span>
            <span className="text-text-secondary-65 text-[10px]">reads</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
