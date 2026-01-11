import { motion } from 'framer-motion';
import {
  FileText,
  GitPullRequest,
  Check,
  GitMerge,
  X,
  MessageSquare,
  UserPlus,
  UserMinus,
  Settings,
  Flag,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HistoryEvent, HistoryEventType } from './history-section.types';

const eventConfig: Record<HistoryEventType, { icon: typeof FileText; color: string; bg: string }> =
  {
    chapter_published: {
      icon: FileText,
      color: 'text-brand-pink-500',
      bg: 'bg-brand-pink-500/10',
    },
    chapter_edited: {
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    pr_submitted: {
      icon: GitPullRequest,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    pr_approved: {
      icon: Check,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    pr_merged: {
      icon: GitMerge,
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
    },
    pr_rejected: {
      icon: X,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    comment: {
      icon: MessageSquare,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
    collaborator_added: {
      icon: UserPlus,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    collaborator_removed: {
      icon: UserMinus,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    setting_changed: {
      icon: Settings,
      color: 'text-gray-500',
      bg: 'bg-gray-500/10',
    },
    report_resolved: {
      icon: Flag,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    story_created: {
      icon: BookOpen,
      color: 'text-brand-pink-500',
      bg: 'bg-brand-pink-500/10',
    },
  };

interface HistoryEventCardProps {
  event: HistoryEvent;
  index: number;
  isLast: boolean;
}

export function HistoryEventCard({ event, index, isLast }: HistoryEventCardProps) {
  const config = eventConfig[event.type];
  const Icon = config.icon;

  const time = event.timestamp.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative flex gap-4"
    >
      {/* Timeline Line */}
      {!isLast && <div className="bg-border/50 absolute top-10 left-5 h-[calc(100%+1rem)] w-0.5" />}

      {/* Icon */}
      <div
        className={cn(
          'relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
          config.bg
        )}
      >
        <Icon size={18} className={config.color} />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        {/* Time */}
        <span className="text-text-secondary-65 text-xs">{time}</span>

        {/* Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="border-border/50 hover:border-brand-pink-500/30 mt-2 rounded-xl border bg-white/80 p-4 shadow-sm transition hover:shadow-md"
        >
          {/* User Info */}
          <div className="flex items-center gap-2">
            <img
              src={event.user.avatarUrl}
              alt={event.user.username}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-brand-pink-500 text-sm font-medium">@{event.user.username}</span>
          </div>

          {/* Title */}
          <h4 className="text-text-primary mt-2 font-medium">{event.title}</h4>

          {/* Description */}
          {event.description && (
            <p className="text-text-secondary-65 mt-1 text-sm">{event.description}</p>
          )}

          {/* Link */}
          {event.link && (
            <a
              href={event.link.href}
              className="text-brand-pink-500 mt-3 inline-flex items-center gap-1 text-sm hover:underline"
            >
              {event.link.label}
              <ArrowRight size={14} />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
