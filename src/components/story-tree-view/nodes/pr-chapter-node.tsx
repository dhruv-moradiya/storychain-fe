import { Handle, Position } from '@xyflow/react';
import {
  GitPullRequest,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PRChapterNodeProps } from '../story-tree-view.types';

export function PRChapterNode({ data, selected }: PRChapterNodeProps) {
  const getStatusConfig = () => {
    switch (data.prStatus) {
      case 'open':
        return {
          label: 'Open',
          bgColor: 'bg-badge-info-bg',
          textColor: 'text-badge-info',
          borderColor: 'border-badge-info-border',
          icon: GitPullRequest,
        };
      case 'approved':
        return {
          label: 'Approved',
          bgColor: 'bg-badge-success-bg',
          textColor: 'text-badge-success',
          borderColor: 'border-badge-success-border',
          icon: CheckCircle,
        };
      case 'changes_requested':
        return {
          label: 'Changes',
          bgColor: 'bg-badge-warning-bg',
          textColor: 'text-badge-warning',
          borderColor: 'border-badge-warning-border',
          icon: AlertCircle,
        };
      default:
        return {
          label: 'Open',
          bgColor: 'bg-badge-info-bg',
          textColor: 'text-badge-info',
          borderColor: 'border-badge-info-border',
          icon: GitPullRequest,
        };
    }
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <div
      className={cn(
        'group relative w-[280px] rounded-2xl border-2 border-dashed p-4 transition-all duration-300',
        'to-cream-95 bg-gradient-to-br from-white',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-shadow25 shadow-lg'
          : 'border-black/15 hover:border-black/25 hover:shadow-md'
      )}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-brand-pink-500 !-top-1 !h-2 !w-2 !rounded-full !border-2 !border-white"
      />

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-brand-pink-500 !-bottom-1 !h-2 !w-2 !rounded-full !border-2 !border-white"
      />

      {/* PR Badge */}
      <div className="absolute -top-3 left-4">
        <div
          className={cn(
            'flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium',
            status.bgColor,
            status.textColor,
            status.borderColor
          )}
        >
          <StatusIcon className="h-3 w-3" />
          PR #{data.prNumber}
        </div>
      </div>

      {/* Header */}
      <div className="mt-2 flex items-start gap-3">
        {/* Chapter Number with PR icon */}
        <div className="bg-brand-pink-500/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <GitPullRequest className="text-brand-pink-500 h-5 w-5" />
        </div>

        {/* Title & Author */}
        <div className="min-w-0 flex-1">
          <h3 className="text-text-primary truncate text-sm font-semibold">{data.title}</h3>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-text-secondary-65 text-xs">by {data.author.name}</p>
            <span className="text-text-secondary-65">·</span>
            <span className="text-text-secondary-65 font-mono text-[10px]">
              Ch. {data.chapterNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Status & Voting */}
      <div className="mt-4 flex items-center justify-between">
        {/* Status Badge */}
        <div
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-2.5 py-1',
            status.bgColor,
            status.borderColor
          )}
        >
          <StatusIcon className={cn('h-3.5 w-3.5', status.textColor)} />
          <span className={cn('text-xs font-medium', status.textColor)}>{status.label}</span>
        </div>

        {/* Votes */}
        <div className="flex items-center gap-2">
          <div className="bg-badge-success-bg flex items-center gap-1 rounded-md px-2 py-1">
            <ThumbsUp className="text-badge-success h-3.5 w-3.5" />
            <span className="text-badge-success font-mono text-xs font-medium">
              {data.votes.up}
            </span>
          </div>
          <div className="bg-badge-error-bg flex items-center gap-1 rounded-md px-2 py-1">
            <ThumbsDown className="text-badge-error h-3.5 w-3.5" />
            <span className="text-badge-error font-mono text-xs font-medium">
              {data.votes.down}
            </span>
          </div>
        </div>
      </div>

      {/* Time */}
      <div className="text-text-secondary-65 mt-3 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span className="font-mono text-[10px]">
          {new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300',
          'from-brand-pink-500/20 via-brand-blue/20 to-brand-orange/20 bg-gradient-to-br',
          'group-hover:opacity-100'
        )}
      />
    </div>
  );
}
