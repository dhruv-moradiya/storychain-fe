import { motion } from 'framer-motion';
import {
  Hash,
  GitBranch,
  Layers,
  Flag,
  AlertTriangle,
  CheckCircle,
  History,
  BookOpen,
  Eye,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IChapter } from '@/type/chapter';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ChapterInfoCardProps {
  chapter: IChapter;
  storyTitle?: string;
  storySlug?: string;
  className?: string;
}

export function ChapterInfoCard({
  chapter,
  storyTitle,
  storySlug,
  className,
}: ChapterInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={cn('space-y-3', className)}
    >
      {/* Story Link */}
      {storyTitle && (
        <a
          href={storySlug ? `/stories/${storySlug}` : '#'}
          className="group border-border/50 bg-card/50 hover:bg-card flex items-center gap-3 rounded-lg border p-3 transition-colors"
        >
          <div className="bg-brand-pink-500/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
            <BookOpen className="text-brand-pink-500 h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-[10px]">Part of story</p>
            <p className="text-foreground group-hover:text-brand-pink-500 truncate text-sm font-medium transition-colors">
              {storyTitle}
            </p>
          </div>
        </a>
      )}

      {/* Quick Stats Row */}
      <div className="border-border/50 bg-card/50 flex items-center gap-4 rounded-lg border px-4 py-3">
        <div className="flex items-center gap-1.5">
          <Eye className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-sm font-medium">{chapter.stats.reads}</span>
        </div>
        <div className="bg-border/50 h-4 w-px" />
        <div className="flex items-center gap-1.5">
          <MessageSquare className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-sm font-medium">{chapter.stats.comments}</span>
        </div>
        <div className="bg-border/50 h-4 w-px" />
        <div className="flex items-center gap-1.5">
          <GitBranch className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-sm font-medium">{chapter.stats.childBranches}</span>
        </div>
      </div>

      {/* Chapter Details */}
      <div className="border-border/50 bg-card/50 rounded-lg border p-3">
        <div className="grid grid-cols-2 gap-3">
          <InfoItem
            icon={Hash}
            label="Chapter"
            value={chapter.chapterNumber ? `#${chapter.chapterNumber}` : 'N/A'}
          />
          <InfoItem icon={Layers} label="Depth" value={`Level ${chapter.depth}`} />
          <InfoItem icon={History} label="Version" value={`v${chapter.version}`} />
          <InfoItem
            icon={Clock}
            label="Updated"
            value={formatDistanceToNow(new Date(chapter.updatedAt), { addSuffix: true })}
          />
        </div>
      </div>

      {/* Status Flags */}
      {(chapter.isEnding || chapter.isFlagged || chapter.reportCount > 0) && (
        <div className="flex flex-wrap gap-2">
          {chapter.isEnding && (
            <Badge
              variant="secondary"
              className="gap-1.5 border-green-200 bg-green-50 text-green-700"
            >
              <CheckCircle className="h-3 w-3" />
              Ending
            </Badge>
          )}
          {chapter.isFlagged && (
            <Badge
              variant="secondary"
              className="gap-1.5 border-yellow-200 bg-yellow-50 text-yellow-700"
            >
              <Flag className="h-3 w-3" />
              Flagged
            </Badge>
          )}
          {chapter.reportCount > 0 && (
            <Badge variant="secondary" className="gap-1.5 border-red-200 bg-red-50 text-red-600">
              <AlertTriangle className="h-3 w-3" />
              {chapter.reportCount} Report{chapter.reportCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-muted-foreground h-3.5 w-3.5" />
      <div className="min-w-0">
        <p className="text-muted-foreground text-[10px]">{label}</p>
        <p className="text-foreground truncate text-xs font-medium">{value}</p>
      </div>
    </div>
  );
}
