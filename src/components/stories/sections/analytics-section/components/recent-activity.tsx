import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, MessageSquare, ThumbsUp, UserPlus, GitBranch, Clock } from 'lucide-react';
import type { RecentActivityItem } from '../analytics.types';

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

const activityConfig: Record<
  RecentActivityItem['type'],
  { icon: typeof Eye; color: string; bgColor: string }
> = {
  read: { icon: Eye, color: 'text-brand-pink-500', bgColor: 'bg-brand-pink-500/10' },
  comment: { icon: MessageSquare, color: 'text-brand-orange', bgColor: 'bg-brand-orange/10' },
  vote: { icon: ThumbsUp, color: 'text-brand-blue', bgColor: 'bg-brand-blue/10' },
  subscribe: { icon: UserPlus, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  branch: { icon: GitBranch, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <div className="bg-brand-orange h-1 w-1 rounded-full" />
          Recent Activity
        </h3>
        <Clock className="text-text-secondary-65 h-4 w-4" />
      </div>

      <div className="space-y-2">
        {activities.slice(0, 6).map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.04 }}
              className="group hover:bg-cream-90/60 flex items-center gap-3 rounded-lg px-2 py-2 transition-all"
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg',
                  config.bgColor
                )}
              >
                <Icon className={cn('h-3.5 w-3.5', config.color)} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-text-primary truncate text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-text-secondary-65">{activity.action}</span>
                </p>
                {activity.target && (
                  <p className="text-text-secondary-65 truncate text-xs">{activity.target}</p>
                )}
              </div>

              {/* Time */}
              <span className="text-text-secondary-65 flex-shrink-0 text-[10px]">
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
