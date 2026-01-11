import { motion } from 'framer-motion';
import { BookOpen, FileText, Award, Users, Pencil, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  type: string;
  title: string;
  date: Date;
}

interface UserProfileActivityProps {
  activities: Activity[];
}

const activityConfig: Record<string, { icon: typeof BookOpen; color: string; bg: string }> = {
  chapter: {
    icon: FileText,
    color: 'text-brand-pink-500',
    bg: 'bg-brand-pink-500/10',
  },
  story: {
    icon: BookOpen,
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
  },
  badge: {
    icon: Award,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  collab: {
    icon: Users,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  edit: {
    icon: Pencil,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  comment: {
    icon: MessageSquare,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
};

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function UserProfileActivity({ activities }: UserProfileActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="border-border/50 rounded-xl border p-5"
    >
      <h3 className="text-text-primary mb-4 font-semibold">Recent Activity</h3>

      <div className="space-y-3">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type] || activityConfig.story;
          const Icon = config.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
                  config.bg
                )}
              >
                <Icon className={cn('h-4 w-4', config.color)} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-text-secondary text-sm">{activity.title}</p>
                <p className="text-text-secondary-65 text-xs">
                  {formatRelativeDate(activity.date)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-text-secondary-65 text-sm">No recent activity</p>
        </div>
      )}

      {activities.length > 0 && (
        <button className="text-brand-pink-500 mt-4 w-full text-center text-xs hover:underline">
          View full activity →
        </button>
      )}
    </motion.div>
  );
}

export { UserProfileActivity };
