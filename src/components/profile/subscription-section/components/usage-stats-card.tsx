import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, FileText, GitBranch, Users, TrendingUp } from 'lucide-react';
import type { UsageStats } from '../subscription.types';

interface UsageStatsCardProps {
  stats: UsageStats;
}

const statConfig = [
  {
    key: 'stories',
    label: 'Stories',
    icon: BookOpen,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500',
    lightBg: 'bg-brand-pink-500/10',
    hoverBorder: 'hover:border-brand-pink-500/30',
  },
  {
    key: 'chapters',
    label: 'Chapters',
    icon: FileText,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue',
    lightBg: 'bg-brand-blue/10',
    hoverBorder: 'hover:border-brand-blue/30',
  },
  {
    key: 'branches',
    label: 'Branches',
    icon: GitBranch,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange',
    lightBg: 'bg-brand-orange/10',
    hoverBorder: 'hover:border-brand-orange/30',
  },
  {
    key: 'collaborators',
    label: 'Collaborators',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500',
    lightBg: 'bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/30',
  },
] as const;

export function UsageStatsCard({ stats }: UsageStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="group border-border/50 bg-cream-95 hover:border-brand-pink-500/30 rounded-xl border p-5 transition-all duration-300 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Usage This Month</h3>
        <div className="text-text-secondary-65 flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs">Stats</span>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {statConfig.map((config, index) => {
          const stat = stats[config.key];
          const Icon = config.icon;
          const percentage = stat.limit ? Math.round((stat.used / stat.limit) * 100) : 0;
          const isUnlimited = stat.limit === null;
          const isNearLimit = percentage >= 80;

          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'border-border/50 bg-cream-90/50 rounded-lg border p-3 transition-all duration-200',
                config.hoverBorder,
                'hover:bg-cream-90 hover:shadow-sm'
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg',
                      config.lightBg
                    )}
                  >
                    <Icon className={cn('h-4 w-4', config.color)} />
                  </div>
                  <span className="text-text-primary text-sm font-medium">{config.label}</span>
                </div>
                <span className="text-text-secondary-65 text-sm">
                  {stat.used}
                  {!isUnlimited && <span className="text-text-secondary-65/60">/{stat.limit}</span>}
                  {isUnlimited && <span className="ml-1 text-xs">∞</span>}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isUnlimited ? '100%' : `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                  className={cn(
                    'h-full rounded-full transition-colors',
                    isNearLimit && !isUnlimited ? 'bg-amber-500' : config.bgColor
                  )}
                />
              </div>
              {!isUnlimited && percentage >= 80 && (
                <p className="mt-1.5 text-xs text-amber-600">
                  {percentage >= 100 ? 'Limit reached' : 'Almost at limit'}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
