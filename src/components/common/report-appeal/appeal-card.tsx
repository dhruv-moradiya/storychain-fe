import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import {
  Scale,
  Clock,
  User,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
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
  type IAppeal,
  APPEAL_STATUS_CONFIG,
  APPEAL_PRIORITY_CONFIG,
} from '@/type/appeal.type';

interface AppealCardProps {
  appeal: IAppeal;
  onView?: (appeal: IAppeal) => void;
  onApprove?: (appeal: IAppeal) => void;
  onReject?: (appeal: IAppeal) => void;
  onEscalate?: (appeal: IAppeal) => void;
  isAdmin?: boolean;
  isUserView?: boolean;
}

export function AppealCard({
  appeal,
  onView,
  onApprove,
  onReject,
  onEscalate,
  isAdmin = false,
  isUserView = false,
}: AppealCardProps) {
  const statusConfig = APPEAL_STATUS_CONFIG[appeal.status];
  const priorityConfig = APPEAL_PRIORITY_CONFIG[appeal.priority];

  const isPending = appeal.status === 'PENDING' || appeal.status === 'UNDER_REVIEW';

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group relative rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
      >
        {/* Priority indicator */}
        {appeal.priority === 'URGENT' && (
          <motion.div
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-white" />
          </motion.div>
        )}

        {/* Status indicator bar */}
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-1 rounded-l-xl transition-all group-hover:w-1.5',
            statusConfig.dotColor
          )}
        />

        <div className="flex items-start justify-between gap-4">
          {/* Left side - User info */}
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={appeal.userAvatar} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{appeal.userName || 'User'}</span>
                {appeal.userEmail && (
                  <span className="text-xs text-muted-foreground">{appeal.userEmail}</span>
                )}
              </div>

              <p className="mt-0.5 text-sm font-medium">{appeal.appealReason}</p>
            </div>
          </div>

          {/* Right side - Status & Priority */}
          <div className="flex items-center gap-2 shrink-0">
            <Badge className={cn(priorityConfig.color)}>{priorityConfig.label}</Badge>
            <Badge className={cn('gap-1', statusConfig.color)}>
              <span className={cn('h-1.5 w-1.5 rounded-full', statusConfig.dotColor)} />
              {statusConfig.label}
            </Badge>

            {isAdmin && isPending && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView?.(appeal)} className="gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onApprove?.(appeal)} className="gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Approve Appeal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onReject?.(appeal)} className="gap-2 text-red-600">
                    <XCircle className="h-4 w-4" />
                    Reject Appeal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEscalate?.(appeal)} className="gap-2 text-purple-600">
                    <AlertTriangle className="h-4 w-4" />
                    Escalate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Explanation preview */}
        <div className="mt-3">
          <p className="text-sm text-muted-foreground line-clamp-3">{appeal.explanation}</p>
        </div>

        {/* Evidence links */}
        {appeal.evidenceUrls && appeal.evidenceUrls.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Evidence:</span>
            <div className="flex items-center gap-1">
              {appeal.evidenceUrls.slice(0, 3).map((url, i) => (
                <Tooltip key={i}>
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
              {appeal.evidenceUrls.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{appeal.evidenceUrls.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Ban context */}
        {(appeal.banReason || appeal.banType) && (
          <div className="mt-3 rounded-lg bg-muted/50 p-2 text-xs">
            <span className="text-muted-foreground">Ban: </span>
            <span>{appeal.banType}</span>
            {appeal.banReason && <span> - {appeal.banReason}</span>}
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(appeal.createdAt), { addSuffix: true })}
            </div>

            {appeal.reviewCount > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {appeal.reviewCount} review(s)
              </div>
            )}
          </div>

          {appeal.assignedToName && (
            <span>Assigned to {appeal.assignedToName}</span>
          )}
        </div>

        {/* Response message */}
        {appeal.responseMessage && !isUserView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={cn(
              'mt-3 rounded-lg p-3 text-sm',
              appeal.status === 'APPROVED'
                ? 'bg-green-50 dark:bg-green-950/30'
                : appeal.status === 'REJECTED'
                  ? 'bg-red-50 dark:bg-red-950/30'
                  : 'bg-muted/50'
            )}
          >
            <p className="font-medium text-xs text-muted-foreground mb-1">Response:</p>
            <p>{appeal.responseMessage}</p>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
}
