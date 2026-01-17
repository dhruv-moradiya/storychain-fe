import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Crown, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import type { LeaderboardUser } from '../leaderboard.types';

interface PodiumProps {
  topThree: LeaderboardUser[];
}

export function Podium({ topThree }: PodiumProps) {
  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  const podiumConfig = [
    {
      height: 'h-20 sm:h-24',
      delay: 0.2,
      gradient: 'from-gray-300 to-gray-400',
      bgGradient: 'from-gray-200/50 to-gray-300/50',
      ring: 'ring-gray-300',
      medal: '🥈',
    },
    {
      height: 'h-28 sm:h-32',
      delay: 0,
      gradient: 'from-amber-400 to-amber-500',
      bgGradient: 'from-amber-100/50 to-amber-200/50',
      ring: 'ring-amber-400',
      medal: '🥇',
    },
    {
      height: 'h-16 sm:h-20',
      delay: 0.3,
      gradient: 'from-orange-300 to-orange-400',
      bgGradient: 'from-orange-100/50 to-orange-200/50',
      ring: 'ring-orange-300',
      medal: '🥉',
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="relative px-4 pt-10 pb-6 sm:px-8 sm:pt-12">
      {/* Decorative sparkles for winner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2"
      >
        <Sparkles className="h-5 w-5 text-amber-400/60" />
      </motion.div>

      <div className="flex items-end justify-center gap-4 sm:gap-8">
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
                className="relative mb-4"
              >
                {/* Crown for #1 */}
                {isFirst && (
                  <motion.div
                    initial={{ y: -20, opacity: 0, rotate: -10 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2"
                  >
                    <Crown className="h-7 w-7 fill-amber-400 text-amber-500 drop-shadow-md" />
                  </motion.div>
                )}

                {/* Glowing ring behind avatar */}
                {isFirst && (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-500/30 blur-md"
                    style={{ transform: 'scale(1.2)' }}
                  />
                )}

                {/* Avatar */}
                <div
                  className={cn(
                    'relative rounded-full p-1 shadow-lg',
                    `bg-gradient-to-br ${config.gradient}`
                  )}
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className={cn(
                      'rounded-full border-2 border-white object-cover',
                      isFirst ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-16 w-16 sm:h-20 sm:w-20'
                    )}
                  />

                  {/* Rank badge */}
                  <div
                    className={cn(
                      'absolute -bottom-2 left-1/2 -translate-x-1/2',
                      'flex items-center justify-center rounded-full shadow-lg',
                      'text-sm font-bold text-white',
                      `bg-gradient-to-br ${config.gradient}`,
                      isFirst ? 'h-9 w-9' : 'h-7 w-7'
                    )}
                  >
                    {user.rank}
                  </div>
                </div>

                {/* Rank change indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: config.delay + 0.4 }}
                  className="absolute -top-1 -right-1"
                >
                  {user.rankChange > 0 ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                  ) : user.rankChange < 0 ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md">
                      <TrendingDown className="h-3.5 w-3.5" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-white shadow-md">
                      <Minus className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Name */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: config.delay + 0.3 }}
                className={cn(
                  'text-text-tertiary mb-0.5 max-w-[100px] truncate text-center font-semibold',
                  isFirst ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                )}
              >
                {user.displayName}
              </motion.p>

              {/* Username */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: config.delay + 0.35 }}
                className="text-brand-pink-500 mb-2 text-[10px] sm:text-xs"
              >
                @{user.username}
              </motion.p>

              {/* Stats */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: config.delay + 0.4 }}
                className="text-text-secondary-65 mb-3 text-[10px] sm:text-xs"
              >
                {formatNumber(user.stats.totalReads)} reads
              </motion.p>

              {/* Badges */}
              {user.badges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: config.delay + 0.45 }}
                  className="mb-3 flex gap-1"
                >
                  {user.badges.slice(0, 2).map((badge) => (
                    <span key={badge.id} className="text-base" title={badge.name}>
                      {badge.icon}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Podium Stand */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.5, delay: config.delay + 0.3 }}
                className={cn(
                  'w-24 rounded-t-2xl sm:w-32',
                  config.height,
                  `bg-gradient-to-t ${config.bgGradient}`,
                  'border border-b-0 border-white/50 shadow-inner'
                )}
              >
                {/* Medal emoji centered in podium */}
                <div className="flex h-full items-center justify-center">
                  <span className="text-2xl opacity-60">{config.medal}</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
