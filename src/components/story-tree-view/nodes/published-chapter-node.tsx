import { Handle, Position } from '@xyflow/react';
import { BookOpen, MessageCircle, Heart, Eye, Crown, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublishedChapterNodeProps } from '../story-tree-view.types';

export function PublishedChapterNode({ data, selected }: PublishedChapterNodeProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div
      className={cn(
        'group relative w-[280px] rounded-2xl border-2 bg-white p-4 transition-all duration-300',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-shadow25 shadow-lg'
          : 'border-black/10 hover:border-black/20 hover:shadow-md',
        data.isMostRead && 'ring-brand-orange/30 ring-2 ring-offset-2'
      )}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-brand-blue !-top-1 !h-2 !w-2 !rounded-full !border-2 !border-white"
      />

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-brand-blue !-bottom-1 !h-2 !w-2 !rounded-full !border-2 !border-white"
      />

      {/* Most Read Badge */}
      {data.isMostRead && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-brand-orange flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
            <Crown className="h-3 w-3" />
            Most Read
          </div>
        </div>
      )}

      {/* Ending Badge */}
      {data.isEnding && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-badge-success flex h-6 w-6 items-center justify-center rounded-full text-white shadow-sm">
            <Flag className="h-3 w-3" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Chapter Number */}
        <div className="bg-brand-blue/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <span className="text-brand-blue font-mono text-sm font-bold">{data.chapterNumber}</span>
        </div>

        {/* Title & Author */}
        <div className="min-w-0 flex-1">
          <h3 className="text-text-primary truncate text-sm font-semibold">{data.title}</h3>
          <p className="text-text-secondary-65 mt-0.5 text-xs">by {data.author.name}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-text-secondary-65 flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span className="font-mono text-xs">{formatNumber(data.stats.reads)}</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="font-mono text-xs">{formatNumber(data.stats.comments)}</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            <span className="font-mono text-xs">{formatNumber(data.stats.likes)}</span>
          </div>
        </div>

        {/* Read Button */}
        <button className="bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
          <BookOpen className="h-3.5 w-3.5" />
          Read
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-300',
          'from-brand-blue/20 via-brand-pink-500/20 to-brand-orange/20 bg-gradient-to-br',
          'group-hover:opacity-100'
        )}
      />
    </div>
  );
}
