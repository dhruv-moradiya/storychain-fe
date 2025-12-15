import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import {
  Flag,
  BookOpen,
  MessageSquare,
  User,
  Book,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  type IReport,
  type ReportType,
  REPORT_STATUS_CONFIG,
  REPORT_REASONS,
} from '@/type/report.type';

const REPORT_TYPE_ICONS: Record<ReportType, React.ElementType> = {
  CHAPTER: BookOpen,
  COMMENT: MessageSquare,
  USER: User,
  STORY: Book,
};

interface ReportCardProps {
  report: IReport;
  onView?: (report: IReport) => void;
  onResolve?: (report: IReport) => void;
  onDismiss?: (report: IReport) => void;
  isAdmin?: boolean;
}

export function ReportCard({
  report,
  onView,
  onResolve,
  onDismiss,
  isAdmin = false,
}: ReportCardProps) {
  const TypeIcon = REPORT_TYPE_ICONS[report.reportType];
  const statusConfig = REPORT_STATUS_CONFIG[report.status];
  const reasonLabel = REPORT_REASONS.find((r) => r.value === report.reason)?.label || report.reason;

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group relative rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
      >
        {/* Status indicator bar */}
      <div
        className={cn(
          'absolute left-0 top-0 h-full w-1 rounded-l-xl transition-all group-hover:w-1.5',
          report.status === 'PENDING' && 'bg-amber-500',
          report.status === 'REVIEWED' && 'bg-blue-500',
          report.status === 'RESOLVED' && 'bg-green-500',
          report.status === 'DISMISSED' && 'bg-slate-400'
        )}
      />

      <div className="flex items-start justify-between gap-4">
        {/* Left side - Reporter info */}
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={report.reporterAvatar} />
            <AvatarFallback>
              {report.reporterName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">{report.reporterName || 'Anonymous'}</span>
              <span className="text-muted-foreground">reported</span>
              <Badge variant="outline" className="gap-1">
                <TypeIcon className="h-3 w-3" />
                {report.reportType.charAt(0) + report.reportType.slice(1).toLowerCase()}
              </Badge>
            </div>

            {report.relatedTitle && (
              <p className="mt-0.5 text-sm text-muted-foreground truncate max-w-[300px]">
                "{report.relatedTitle}"
              </p>
            )}
          </div>
        </div>

        {/* Right side - Status & Actions */}
        <div className="flex items-center gap-2">
          <Badge className={cn('shrink-0', statusConfig.color)}>
            {statusConfig.label}
          </Badge>

          {isAdmin && report.status === 'PENDING' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView?.(report)} className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onResolve?.(report)} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Mark Resolved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDismiss?.(report)} className="gap-2 text-muted-foreground">
                  <XCircle className="h-4 w-4" />
                  Dismiss
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Report reason and description */}
      <div className="mt-3 space-y-2">
        <Badge variant="secondary" className="gap-1.5">
          <Flag className="h-3 w-3" />
          {reasonLabel}
        </Badge>

        <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
      </div>

      {/* Evidence links */}
      {report.evidenceUrls && report.evidenceUrls.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Evidence:</span>
          <div className="flex items-center gap-1">
            {report.evidenceUrls.slice(0, 3).map((url) => (
              <Tooltip key={url}>
                <TooltipTrigger asChild>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-6 w-6 items-center justify-center rounded bg-muted hover:bg-muted/80"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[200px] truncate text-xs">{url}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {report.evidenceUrls.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{report.evidenceUrls.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
        </div>

        {report.reviewedBy && (
          <span>Reviewed by {report.reviewerName || 'Admin'}</span>
        )}
      </div>

        {/* Resolution note */}
        {report.resolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 rounded-lg bg-muted/50 p-3 text-sm"
          >
            <p className="font-medium text-xs text-muted-foreground mb-1">Resolution:</p>
            <p>{report.resolution}</p>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
}
