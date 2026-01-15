import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NodeProps, Node } from '@xyflow/react';

export interface LoadMorePlaceholderData extends Record<string, unknown> {
  parentChapterId: string;
  storySlug?: string;
  remainingCount?: number;
  onLoadMore?: (parentChapterId: string) => Promise<void>;
}

export type LoadMorePlaceholderProps = NodeProps<Node<LoadMorePlaceholderData>>;

export function LoadMorePlaceholder({ data, selected }: LoadMorePlaceholderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await data.onLoadMore?.(data.parentChapterId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center justify-center transition-all duration-300',
        'h-14 w-14 rounded-2xl',
        'via-cream-95 to-cream-90 bg-gradient-to-br from-white',
        'border border-dashed',
        isLoading && 'pointer-events-none',
        selected
          ? 'border-brand-blue shadow-brand-blue/25 shadow-lg'
          : 'hover:shadow-brand-blue/20 border-black/20 hover:border-transparent hover:shadow-xl'
      )}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!from-brand-blue !to-brand-pink-500 !-top-1 !h-2.5 !w-2.5 !rounded-full !border-2 !border-white !bg-gradient-to-br !shadow-sm"
      />

      {/* Gradient background on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          'from-brand-blue via-brand-pink-500 to-brand-orange bg-gradient-to-br',
          isLoading ? 'opacity-100' : 'group-hover:opacity-100'
        )}
      />

      {/* Icon - Loading or ChevronDown */}
      {isLoading ? (
        <Loader2
          className={cn('relative z-10 h-6 w-6 animate-spin text-white')}
          strokeWidth={2.5}
        />
      ) : (
        <ChevronDown
          className={cn(
            'relative z-10 h-6 w-6 transition-all duration-300',
            'text-text-secondary-65 group-hover:scale-110 group-hover:text-white'
          )}
          strokeWidth={2.5}
        />
      )}

      {/* Remaining count badge */}
      {data.remainingCount && data.remainingCount > 0 && !isLoading && (
        <div
          className={cn(
            'absolute -top-2 -right-2 z-20',
            'flex h-5 w-5 items-center justify-center',
            'bg-brand-blue rounded-full text-[10px] font-bold text-white',
            'shadow-md'
          )}
        >
          {data.remainingCount > 9 ? '9+' : data.remainingCount}
        </div>
      )}

      {/* Tooltip on hover */}
      <div
        className={cn(
          'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap',
          'bg-text-primary rounded-lg px-2.5 py-1',
          'text-[10px] font-medium text-white',
          'opacity-0 transition-all duration-200',
          'group-hover:-bottom-9 group-hover:opacity-100',
          'shadow-lg',
          isLoading && '-bottom-9 opacity-100'
        )}
      >
        <span className="font-sans">
          {isLoading
            ? 'Loading...'
            : `Load More${data.remainingCount ? ` (${data.remainingCount})` : ''}`}
        </span>
        {/* Tooltip arrow */}
        <div className="bg-text-primary absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
      </div>

      {/* Outer glow effect */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-lg transition-opacity duration-300',
          'from-brand-blue/40 via-brand-pink-500/30 to-brand-orange/40 bg-gradient-to-br',
          isLoading ? 'opacity-100' : 'group-hover:opacity-100'
        )}
      />

      {/* Pulse ring animation on hover/loading */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          'ring-2 ring-white/50',
          isLoading
            ? 'animate-pulse opacity-100'
            : 'group-hover:animate-pulse group-hover:opacity-100'
        )}
      />
    </div>
  );
}

export default LoadMorePlaceholder;

// When creating nodes for the tree
// const loadMoreNode: ILoadMorePlaceholderType = {
//   id: 'load-more-1',
//   type: 'loadMorePlaceholder',
//   position: { x: 100, y: 200 },
//   data: {
//     parentChapterId: 'chapter-123',
//     remainingCount: 5,
//     onLoadMore: async (parentId) => {
//       // Fetch more chapters for this parent
//       await fetchMoreChapters(parentId);
//     },
//   },
// };
