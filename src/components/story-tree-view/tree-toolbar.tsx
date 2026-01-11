import { GitPullRequest, Route, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeToolbarProps {
  showPRNodes: boolean;
  onTogglePRNodes: () => void;
  highlightMostRead: boolean;
  onToggleHighlightMostRead: () => void;
}

export function TreeToolbar({
  showPRNodes,
  onTogglePRNodes,
  highlightMostRead,
  onToggleHighlightMostRead,
}: TreeToolbarProps) {
  return (
    <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/90 px-2 py-2 shadow-lg backdrop-blur-md">
        {/* Show PR Nodes Toggle */}
        <button
          onClick={onTogglePRNodes}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all',
            showPRNodes
              ? 'bg-brand-pink-500 shadow-brand-pink-shadow25 text-white shadow-md'
              : 'text-text-secondary-75 bg-black/5 hover:bg-black/10'
          )}
        >
          {showPRNodes ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          <GitPullRequest className="h-4 w-4" />
          <span>Open PRs</span>
          {showPRNodes && (
            <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">3</span>
          )}
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-black/10" />

        {/* Highlight Most Read Path Toggle */}
        <button
          onClick={onToggleHighlightMostRead}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all',
            highlightMostRead
              ? 'bg-brand-orange text-white shadow-md'
              : 'text-text-secondary-75 bg-black/5 hover:bg-black/10'
          )}
        >
          <Route className="h-4 w-4" />
          <span>Most Read Path</span>
        </button>
      </div>
    </div>
  );
}
