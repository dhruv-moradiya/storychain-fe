import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import {
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Plus,
  FileEdit,
  Trash2,
  FileText,
  Check,
  AlertCircle,
  Tag,
  type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';

/* -------------------------------- Config -------------------------------- */

const STATUS: Record<PRStatus, { icon: LucideIcon; color: string }> = {
  OPEN: { icon: GitPullRequest, color: 'text-green-500' },
  APPROVED: { icon: Check, color: 'text-blue-500' },
  MERGED: { icon: GitMerge, color: 'text-purple-500' },
  REJECTED: { icon: GitPullRequestClosed, color: 'text-red-500' },
  CLOSED: { icon: GitPullRequestClosed, color: 'text-muted-foreground' },
};

const TYPE_ICON: Record<PRType, LucideIcon> = {
  NEW_CHAPTER: Plus,
  EDIT_CHAPTER: FileEdit,
  DELETE_CHAPTER: Trash2,
};

/* -------------------------------- Component -------------------------------- */

interface PRCardProps {
  pullRequest: IPullRequest;
  onClick?: () => void;
}

export function PRCard({ pullRequest, onClick }: PRCardProps) {
  const StatusIcon = STATUS[pullRequest.status].icon;
  const TypeIcon = TYPE_ICON[pullRequest.prType];

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ backgroundColor: 'var(--muted)' }}
        transition={{ duration: 0.1 }}
        onClick={onClick}
        className="group cursor-pointer rounded-lg px-4 py-3"
      >
        <div className="flex items-start gap-3">
          {/* Status */}
          <StatusIcon className={cn('mt-1 h-5 w-5', STATUS[pullRequest.status].color)} />

          {/* Main */}
          <div className="min-w-0 flex-1">
            {/* Title */}
            <h3 className="text-foreground truncate text-sm font-medium">{pullRequest.title}</h3>

            {/* Meta */}
            <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
              <span>
                #{pullRequest._id.slice(-4)} ·{' '}
                <span className="text-foreground">
                  {pullRequest.author?.displayName || pullRequest.author?.username}
                </span>
              </span>
              <span className="opacity-40">·</span>
              <span className="truncate">
                {pullRequest.story?.title} / {pullRequest.chapter?.title}
              </span>
            </div>

            {/* Minimal indicators */}
            <div className="mt-2 flex items-center gap-2">
              {/* Type */}
              <Tooltip>
                <TooltipTrigger>
                  <TypeIcon className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>{pullRequest.prType.replace('_', ' ')}</TooltipContent>
              </Tooltip>

              {/* Draft */}
              {pullRequest.isDraft && (
                <Tooltip>
                  <TooltipTrigger>
                    <FileText className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>Draft</TooltipContent>
                </Tooltip>
              )}

              {/* Labels */}
              {pullRequest.labels.length > 0 && (
                <Tooltip>
                  <TooltipTrigger>
                    <Tag className="text-muted-foreground h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {pullRequest.labels.map((l) => l.replace('_', ' ')).join(', ')}
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Flagged */}
              {pullRequest.flaggedForReview && (
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent>Flagged for moderation</TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Footer */}
            <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(pullRequest.createdAt), {
                  addSuffix: true,
                })}
              </span>

              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {pullRequest.commentCount}
              </span>

              {/* Hover details */}
              <div className="hidden items-center gap-3 group-hover:flex">
                <span className="text-green-600">+{pullRequest.changes.additionsCount}</span>
                <span className="text-red-600">-{pullRequest.changes.deletionsCount || 0}</span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {pullRequest.votes.upvotes}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsDown className="h-3 w-3" />
                  {pullRequest.votes.downvotes}
                </span>
              </div>
            </div>
          </div>

          {/* Approvals */}
          <div className="flex items-center gap-1">
            {pullRequest.approvalsStatus.approvers.slice(0, 3).map((_, i) => (
              <Avatar key={i} className="border-background h-5 w-5 border">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
              </Avatar>
            ))}

            {pullRequest.approvalsStatus.blockers.length > 0 && (
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                </TooltipTrigger>
                <TooltipContent>
                  {pullRequest.approvalsStatus.blockers.length} blocking review(s)
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
