import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  Star,
  UserPlus,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { AnalyticsData } from '../analytics.types';

interface OverviewStatsProps {
  data: AnalyticsData['overview'];
}

const statConfig = [
  {
    key: 'totalReads',
    label: 'Reads',
    icon: Eye,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
    changeKey: 'readsChange',
    format: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()),
  },
  {
    key: 'totalVotes',
    label: 'Votes',
    icon: ThumbsUp,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    changeKey: 'votesChange',
    format: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()),
  },
  {
    key: 'totalComments',
    label: 'Comments',
    icon: MessageSquare,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    changeKey: 'commentsChange',
    format: (v: number) => v.toString(),
  },
  {
    key: 'rating',
    label: 'Rating',
    icon: Star,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    changeKey: 'ratingChange',
    format: (v: number) => v.toFixed(1),
    isRating: true,
  },
  {
    key: 'newSubscribers',
    label: 'New Subs',
    icon: UserPlus,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    changeKey: 'subscribersChange',
    format: (v: number) => v.toString(),
  },
] as const;

export function OverviewStats({ data }: OverviewStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <h3 className="text-text-primary mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
        <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
        Overview
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statConfig.map((config, index) => {
          const Icon = config.icon;
          const value = data[config.key as keyof typeof data] as number;
          const change = data[config.changeKey as keyof typeof data] as number;
          const isPositive = change >= 0;

          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group border-border/50 bg-cream-90/50 hover:border-brand-pink-500/30 hover:bg-cream-90 rounded-lg border p-3 transition-all hover:shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    config.bgColor
                  )}
                >
                  <Icon className={cn('h-4 w-4', config.color)} />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-medium',
                    isPositive ? 'text-green-600' : 'text-red-500'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}
                    {config.color ? change.toFixed(1) : `${change}%`}
                  </span>
                </div>
              </div>
              <p className="text-text-primary text-xl font-bold">{config.format(value)}</p>
              <p className="text-text-secondary-65 text-xs">{config.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
