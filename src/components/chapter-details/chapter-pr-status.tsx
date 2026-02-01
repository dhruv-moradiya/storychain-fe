import { motion } from 'framer-motion';
import { GitPullRequest, Clock, CheckCircle, XCircle, GitMerge, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IChapter } from '@/type/chapter';
import { Badge } from '@/components/ui/badge';

interface ChapterPRStatusProps {
  pullRequest: IChapter['pullRequest'];
  className?: string;
  onViewPR?: () => void;
}

const PR_STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: 'Pending',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  approved: {
    icon: CheckCircle,
    label: 'Approved',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  rejected: {
    icon: XCircle,
    label: 'Rejected',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  merged: {
    icon: GitMerge,
    label: 'Merged',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
} as const;

// Static timeline data
const STATIC_TIMELINE = [
  { label: 'Submitted', time: '2 days ago', completed: true },
  { label: 'Under Review', time: '1 day ago', completed: true },
  { label: 'Approved', time: '12 hours ago', completed: false },
];

export function ChapterPRStatus({ pullRequest, className, onViewPR }: ChapterPRStatusProps) {
  if (!pullRequest.isPR) {
    return null;
  }

  const status = pullRequest.status || 'pending';
  const config = PR_STATUS_CONFIG[status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className={cn('border-border/50 bg-card/50 rounded-lg border', className)}
    >
      {/* Header */}
      <div className="border-border/50 flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <GitPullRequest className="text-brand-pink-500 h-4 w-4" />
          <span className="text-sm font-medium">Pull Request</span>
        </div>
        <Badge
          variant="secondary"
          className={cn('gap-1 text-[10px]', config.color, config.bgColor, config.borderColor)}
        >
          <StatusIcon className="h-3 w-3" />
          {config.label}
        </Badge>
      </div>

      {/* Timeline */}
      <div className="space-y-2 p-3">
        {STATIC_TIMELINE.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                item.completed ? 'bg-green-500' : 'bg-muted-foreground/30'
              )}
            />
            <span
              className={cn(
                'flex-1 text-xs',
                item.completed ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </span>
            <span className="text-muted-foreground text-[10px]">{item.time}</span>
          </div>
        ))}
      </div>

      {/* View PR Link */}
      {onViewPR && (
        <button
          onClick={onViewPR}
          className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 flex w-full items-center justify-center gap-1.5 border-t p-2.5 text-xs transition-colors"
        >
          View Details
          <ExternalLink className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  );
}
