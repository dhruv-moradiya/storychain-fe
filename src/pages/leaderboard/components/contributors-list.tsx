import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CheckCircle, GitBranch, Minus, TrendingDown, TrendingUp, Zap, Target } from 'lucide-react';
import type { TopContributor } from '../leaderboard.types';

interface ContributorsListProps {
  contributors: TopContributor[];
}

export function ContributorsList({ contributors }: ContributorsListProps) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'from-amber-400 to-amber-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-300 to-orange-400';
    return 'from-gray-400/80 to-gray-500/80';
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getAcceptanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-500';
    if (rate >= 70) return 'text-amber-500';
    return 'text-orange-500';
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {contributors.map((contributor, index) => (
        <motion.div
          key={contributor.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-white/60 p-4 shadow-sm backdrop-blur transition-all hover:border-green-500/20 hover:shadow-lg"
        >
          {/* Subtle gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-green-50/30" />

          <div className="relative">
            {/* Top section: Rank and Avatar */}
            <div className="mb-4 flex items-start gap-3">
              {/* Rank Badge with medal */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-md',
                    getRankStyle(contributor.rank)
                  )}
                >
                  {contributor.rank}
                </div>
                {getMedalEmoji(contributor.rank) && (
                  <span className="text-sm">{getMedalEmoji(contributor.rank)}</span>
                )}
              </div>

              {/* Avatar with rank change */}
              <div className="relative">
                <div className="to-brand-blue/20 rounded-full bg-gradient-to-br from-green-500/20 p-0.5">
                  <img
                    src={contributor.avatarUrl}
                    alt={contributor.username}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                </div>

                {/* Rank change indicator */}
                <div className="absolute -right-1 -bottom-1">
                  {contributor.rankChange > 0 ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  ) : contributor.rankChange < 0 ? (
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

              {/* Contributions highlight */}
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1 text-green-500">
                  <GitBranch className="h-4 w-4" />
                  <span className="text-text-tertiary text-xl font-bold">
                    {contributor.contributions}
                  </span>
                </div>
                <span className="text-text-secondary-65 text-[10px]">branches</span>
              </div>
            </div>

            {/* User Info */}
            <div className="mb-3">
              <p className="text-text-tertiary truncate font-semibold transition-colors group-hover:text-green-600">
                @{contributor.username}
              </p>
              <p className="text-text-secondary-65 text-xs">
                Contributed to {contributor.storiesContributed} stories
              </p>
            </div>

            {/* Stats */}
            <div className="bg-cream-90/50 flex items-center justify-between rounded-xl p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                  <Target className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-text-secondary-65 text-[10px]">Stories</p>
                  <p className="text-text-tertiary text-sm font-bold">
                    {contributor.storiesContributed}
                  </p>
                </div>
              </div>

              <div className="bg-border/50 h-8 w-px" />

              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'bg-opacity-10 flex h-8 w-8 items-center justify-center rounded-lg',
                    contributor.acceptanceRate >= 90
                      ? 'bg-green-500/10'
                      : contributor.acceptanceRate >= 70
                        ? 'bg-amber-500/10'
                        : 'bg-orange-500/10'
                  )}
                >
                  <CheckCircle
                    className={cn('h-4 w-4', getAcceptanceColor(contributor.acceptanceRate))}
                  />
                </div>
                <div>
                  <p className="text-text-secondary-65 text-[10px]">Acceptance</p>
                  <p
                    className={cn(
                      'text-sm font-bold',
                      getAcceptanceColor(contributor.acceptanceRate)
                    )}
                  >
                    {contributor.acceptanceRate}%
                  </p>
                </div>
              </div>

              <div className="bg-border/50 h-8 w-px" />

              <div className="flex items-center gap-2">
                <div className="bg-brand-blue/10 flex h-8 w-8 items-center justify-center rounded-lg">
                  <Zap className="text-brand-blue h-4 w-4" />
                </div>
                <div>
                  <p className="text-text-secondary-65 text-[10px]">Avg/Story</p>
                  <p className="text-text-tertiary text-sm font-bold">
                    {contributor.storiesContributed > 0
                      ? Math.round(contributor.contributions / contributor.storiesContributed)
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
