import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LeaderboardUser } from '../leaderboard.types';

interface PodiumProps {
  topThree: LeaderboardUser[];
}

export function Podium({ topThree }: PodiumProps) {
  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  const podiumConfig = [
    { height: 'h-24', delay: 0.2, gradient: 'from-gray-300 to-gray-400', ring: 'ring-gray-300' },
    { height: 'h-32', delay: 0, gradient: 'from-amber-400 to-amber-500', ring: 'ring-amber-400' },
    {
      height: 'h-20',
      delay: 0.3,
      gradient: 'from-orange-300 to-orange-400',
      ring: 'ring-orange-300',
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="flex items-end justify-center gap-3 px-4 pt-8 pb-4 sm:gap-6">
      {podiumOrder.map((user, index) => {
        const config = podiumConfig[index];
        const isFirst = index === 1;

        return (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: config.delay }}
            className="flex flex-col items-center"
          >
            {/* User Avatar & Info */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: config.delay + 0.2 }}
              className="relative mb-3"
            >
              {/* Crown for #1 */}
              {isFirst && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2"
                >
                  <Crown className="h-6 w-6 fill-amber-400 text-amber-500" />
                </motion.div>
              )}

              {/* Avatar */}
              <div
                className={cn('relative rounded-full p-1', `bg-gradient-to-br ${config.gradient}`)}
              >
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className={cn(
                    'ring-cream-95 rounded-full object-cover ring-2',
                    isFirst ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-16 w-16 sm:h-20 sm:w-20'
                  )}
                />

                {/* Rank badge */}
                <div
                  className={cn(
                    'absolute -bottom-1 left-1/2 -translate-x-1/2',
                    'flex items-center justify-center rounded-full',
                    'text-sm font-bold text-white shadow-lg',
                    `bg-gradient-to-br ${config.gradient}`,
                    isFirst ? 'h-8 w-8' : 'h-7 w-7'
                  )}
                >
                  {user.rank}
                </div>
              </div>

              {/* Rank change indicator */}
              <div className="absolute top-0 -right-1">
                {user.rankChange > 0 ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                    <TrendingUp className="h-3 w-3" />
                  </div>
                ) : user.rankChange < 0 ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
                    <TrendingDown className="h-3 w-3" />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-white">
                    <Minus className="h-3 w-3" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Name */}
            <p
              className={cn(
                'text-text-primary mb-1 max-w-[100px] truncate text-center font-semibold',
                isFirst ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              )}
            >
              {user.displayName}
            </p>

            {/* Username */}
            <p className="text-brand-pink-500 mb-2 text-[10px] sm:text-xs">@{user.username}</p>

            {/* Stats */}
            <p className="text-text-secondary-65 mb-3 text-[10px] sm:text-xs">
              {formatNumber(user.stats.totalReads)} reads
            </p>

            {/* Badges */}
            {user.badges.length > 0 && (
              <div className="mb-2 flex gap-1">
                {user.badges.slice(0, 2).map((badge) => (
                  <span key={badge.id} className="text-sm" title={badge.name}>
                    {badge.icon}
                  </span>
                ))}
              </div>
            )}

            {/* Podium */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.4, delay: config.delay + 0.3 }}
              className={cn(
                'w-20 rounded-t-xl sm:w-28',
                config.height,
                `bg-gradient-to-t ${config.gradient}`
              )}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
