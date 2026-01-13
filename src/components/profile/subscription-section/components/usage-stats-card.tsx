import { cn } from '@/lib/utils';
import { BookOpen, FileText, GitBranch, Users } from 'lucide-react';
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
  },
  {
    key: 'chapters',
    label: 'Chapters',
    icon: FileText,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue',
  },
  {
    key: 'branches',
    label: 'Branches',
    icon: GitBranch,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange',
  },
  {
    key: 'collaborators',
    label: 'Collaborators',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500',
  },
] as const;

export function UsageStatsCard({ stats }: UsageStatsCardProps) {
  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <h3 className="text-text-primary mb-4 font-semibold">Usage This Month</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {statConfig.map((config) => {
          const stat = stats[config.key];
          const Icon = config.icon;
          const percentage = stat.limit ? Math.round((stat.used / stat.limit) * 100) : 0;
          const isUnlimited = stat.limit === null;
          const isNearLimit = percentage >= 80;

          return (
            <div key={config.key} className="rounded-lg bg-white/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn('h-4 w-4', config.color)} />
                  <span className="text-text-primary text-sm font-medium">{config.label}</span>
                </div>
                <span className="text-text-secondary-65 text-sm">
                  {stat.used}
                  {!isUnlimited && <span className="text-text-secondary-65/60">/{stat.limit}</span>}
                  {isUnlimited && <span className="ml-1 text-xs">∞</span>}
                </span>
              </div>
              {!isUnlimited && (
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      isNearLimit ? 'bg-amber-500' : config.bgColor
                    )}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              )}
              {isUnlimited && (
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn('h-full rounded-full', config.bgColor)}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
