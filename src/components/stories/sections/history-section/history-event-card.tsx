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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ x: 2 }}
      className={cn(
        'group relative flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors',
        'hover:bg-cream-90/60'
      )}
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="bg-border/40 absolute top-10 left-[22px] h-[calc(100%-16px)] w-0.5" />
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
          config.bg
        )}
      >
        <Icon size={14} className={config.color} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Header row: user + time */}
        <div className="flex items-center gap-2">
          <img
            src={event.user.avatarUrl}
            alt={event.user.username}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-brand-pink-500 text-xs font-medium">@{event.user.username}</span>
          <span className="text-text-secondary-65 text-[10px]">·</span>
          <span className="text-text-secondary-65 text-[10px]">{time}</span>
        </div>

        {/* Title + Description inline */}
        <div className="mt-1">
          <span className="text-text-primary text-sm font-medium">{event.title}</span>
          {event.description && (
            <span className="text-text-secondary-65 ml-1.5 text-sm">{event.description}</span>
          )}
        </div>

        {/* Link */}
        {event.link && (
          <a
            href={event.link.href}
            className="text-brand-pink-500 mt-1 inline-flex items-center gap-1 text-xs hover:underline"
          >
            {event.link.label}
            <ArrowRight size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
