import type { IChapterNodeProps } from '@/type/story-canvas.type';
import { Handle, Position } from '@xyflow/react';
import {
  Clock,
  Eye,
  Flag,
  GitBranch,
  Heart,
  MessageCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Static preview excerpts for chapters
const CHAPTER_EXCERPTS = [
  'The door creaked open, revealing shadows that danced in the flickering candlelight...',
  'She never expected to find the letter hidden beneath the old oak tree...',
  'Time seemed to stop as their eyes met across the crowded marketplace...',
  'The ancient map held secrets that would change everything they knew...',
  'In the silence of the night, a single melody echoed through the halls...',
  'What they discovered in the ruins would rewrite history itself...',
];

const CustomCardNode = ({ id, data, selected }: IChapterNodeProps) => {
  const chapterNum = data.depth + 1;
  const excerpt = CHAPTER_EXCERPTS[data.depth % CHAPTER_EXCERPTS.length];
  const readTime = Math.max(2, Math.floor(chapterNum * 1.5 + 2));
  const isPopular = data.stats.reads > 500 || data.votes.upvotes > 50;

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  return (
    <div
      className={cn(
        'group bg-bg-cream relative w-[280px] rounded-xl transition-all duration-300',
        'border shadow-sm',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-500/10 shadow-md'
          : 'border-brand-pink-500/20 hover:border-brand-pink-500/40 hover:shadow-md'
      )}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!border-bg-cream !bg-brand-pink-500 !-top-1.5 !h-2.5 !w-2.5 !rounded-full !border-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-bg-cream !bg-brand-pink-500 !-bottom-1.5 !h-2.5 !w-2.5 !rounded-full !border-2"
      />

      {/* Card Content */}
      <div className="relative z-10 p-3.5">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          {/* Chapter Badge */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-blue/8 flex items-center gap-1.5 rounded-full px-2 py-0.5">
              <BookOpen className="text-brand-blue h-3 w-3" />
              <span className="text-brand-blue text-[10px] font-semibold">
                Chapter {chapterNum}
              </span>
            </div>
            {isPopular && (
              <div className="from-brand-orange/15 to-brand-pink-500/15 flex items-center gap-0.5 rounded-full bg-gradient-to-r px-1.5 py-0.5">
                <Sparkles className="text-brand-orange h-2.5 w-2.5" />
              </div>
            )}
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-1.5">
            {data.stats.childBranches > 0 && (
              <div className="bg-badge-purple/8 text-badge-purple flex items-center gap-0.5 rounded-full px-1.5 py-0.5">
                <GitBranch className="h-2.5 w-2.5" />
                <span className="text-[9px] font-medium">{data.stats.childBranches}</span>
              </div>
            )}
            {data.isEnding && (
              <div className="bg-badge-success/10 text-badge-success flex items-center gap-0.5 rounded-full px-1.5 py-0.5">
                <Flag className="h-2.5 w-2.5" />
                <span className="text-[9px] font-semibold">End</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-libreBaskerville text-text-primary mt-2.5 line-clamp-1 text-[14px] leading-snug font-semibold">
          {data.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary-65 mt-1.5 line-clamp-2 font-serif text-[11px] leading-relaxed italic">
          "{excerpt}"
        </p>

        {/* Divider */}
        <div className="bg-border/50 my-3 h-px" />

        {/* Footer Row */}
        <div className="flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 ring-1 ring-black/5">
              <AvatarImage src={data.author.avatarUrl} alt={data.author.username} />
              <AvatarFallback className="from-brand-blue/20 to-brand-pink-500/20 text-text-primary bg-gradient-to-br text-[9px] font-semibold">
                {data.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-text-primary text-[11px] font-medium">
                {data.author.username}
              </span>
              <span className="text-text-secondary-65 flex items-center gap-1 text-[9px]">
                <Clock className="h-2.5 w-2.5" />
                {formatTimeAgo(data.createdAt)} · {readTime} min
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2.5">
            <div className="text-text-secondary-65 hover:text-brand-blue flex items-center gap-1 transition-colors">
              <Eye className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium">{formatNumber(data.stats.reads)}</span>
            </div>
            <button
              onClick={() => data.onCommentClick(id)}
              className="text-text-secondary-65 hover:text-brand-pink-500 flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium">{formatNumber(data.stats.comments)}</span>
            </button>
            <div className="text-text-secondary-65 flex items-center gap-1 transition-colors hover:text-red-500">
              <Heart className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium">{formatNumber(data.votes.upvotes)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCardNode;
