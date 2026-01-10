import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { formatDistanceToNow, format } from 'date-fns';
import {
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Plus,
  FileEdit,
  Trash2,
  Check,
  X,
  AlertCircle,
  Eye,
  FileText,
  GitBranch,
  MoreHorizontal,
  Copy,
  Flag,
  ChevronDown,
  ChevronUp,
  Star,
  Edit2,
  CheckCircle,
  Send,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { colors } from '@/constants';
import { getPullRequestById, getCommentsByPRId, getReviewsByPRId } from '@/mock-data/pull-requests';
import type {
  IPRComment,
  IPRReview,
  PRStatus,
  PRType,
  TimelineAction,
} from '@/type/pull-request.type';
import { toast } from 'sonner';
import {
  ReviewDialog,
  CommentDialog,
  MergeDialog,
  CloseDialog,
  RequestChangesDialog,
} from '@/components/submit-requests';

// Status configuration with brand colors
const PR_STATUS_CONFIG: Record<
  PRStatus,
  { icon: React.ElementType; color: string; bgColor: string; label: string }
> = {
  OPEN: {
    icon: GitPullRequest,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    label: 'Open',
  },
  APPROVED: { icon: Check, color: 'text-[#6b7cff]', bgColor: 'bg-[#6b7cff]', label: 'Approved' },
  MERGED: { icon: GitMerge, color: 'text-[#ec4899]', bgColor: 'bg-[#ec4899]', label: 'Merged' },
  REJECTED: { icon: X, color: 'text-red-600', bgColor: 'bg-red-500', label: 'Rejected' },
  CLOSED: {
    icon: GitPullRequestClosed,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500',
    label: 'Closed',
  },
};

// PR Type configuration
const PR_TYPE_CONFIG: Record<PRType, { icon: React.ElementType; label: string; color: string }> = {
  NEW_CHAPTER: {
    icon: Plus,
    label: 'New Chapter',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  EDIT_CHAPTER: {
    icon: FileEdit,
    label: 'Edit Chapter',
    color: 'text-[#6b7cff] bg-[#6b7cff]/10 border-[#6b7cff]/30',
  },
  DELETE_CHAPTER: {
    icon: Trash2,
    label: 'Delete Chapter',
    color: 'text-red-600 bg-red-50 border-red-200',
  },
};

// Timeline action configuration
const TIMELINE_ACTION_CONFIG: Record<
  TimelineAction,
  { icon: React.ElementType; color: string; label: string }
> = {
  CREATED: { icon: Plus, color: 'text-emerald-500', label: 'created this submit request' },
  REVIEW_REQUESTED: { icon: Eye, color: 'text-[#6b7cff]', label: 'requested a review' },
  REVIEW_SUBMITTED: { icon: MessageSquare, color: 'text-[#6b7cff]', label: 'submitted a review' },
  APPROVED: { icon: Check, color: 'text-emerald-500', label: 'approved this request' },
  CHANGES_REQUESTED: { icon: AlertCircle, color: 'text-[#ff9f68]', label: 'requested changes' },
  VOTED: { icon: ThumbsUp, color: 'text-[#ec4899]', label: 'voted on this request' },
  AUTO_APPROVED: { icon: Check, color: 'text-emerald-500', label: 'auto-approved by community' },
  MERGED: { icon: GitMerge, color: 'text-[#ec4899]', label: 'merged this request' },
  CLOSED: { icon: GitPullRequestClosed, color: 'text-slate-500', label: 'closed this request' },
  REOPENED: { icon: GitPullRequest, color: 'text-emerald-500', label: 'reopened this request' },
  MARKED_DRAFT: { icon: FileText, color: 'text-slate-500', label: 'marked as draft' },
  READY_FOR_REVIEW: { icon: Eye, color: 'text-[#6b7cff]', label: 'marked ready for review' },
};

// Animation variants
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function SubmitRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch data
  const pullRequest = id ? getPullRequestById(id) : undefined;
  const comments = useMemo(() => (id ? getCommentsByPRId(id) : []), [id]);
  const reviews = useMemo(() => (id ? getReviewsByPRId(id) : []), [id]);

  const [activeTab, setActiveTab] = useState('conversation');
  const [newComment, setNewComment] = useState('');
  const [showDiff, setShowDiff] = useState(true);
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);

  // Dialog states
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isRequestChangesDialogOpen, setIsRequestChangesDialogOpen] = useState(false);
  const [closeDialogVariant, setCloseDialogVariant] = useState<'close' | 'reject'>('close');

  // Group comments by parent for threading
  const threadedComments = useMemo(() => {
    const rootComments = comments.filter((c) => !c.parentCommentId);
    const replies = comments.filter((c) => c.parentCommentId);

    return rootComments.map((comment) => ({
      ...comment,
      replies: replies.filter((r) => r.parentCommentId === comment._id),
    }));
  }, [comments]);

  if (!pullRequest) {
    return (
      <div className="min-h-screen px-4 py-16" style={{ backgroundColor: colors.background.cream }}>
        <motion.div {...fadeIn()} className="mx-auto max-w-md text-center">
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: `${colors.brand.pink[500]}15` }}
          >
            <GitPullRequest className="h-10 w-10" style={{ color: colors.brand.pink[500] }} />
          </div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: colors.text.primary }}>
            Request Not Found
          </h1>
          <p className="mt-2" style={{ color: colors.text.secondaryOpacity70 }}>
            The submit request you're looking for doesn't exist or has been removed.
          </p>
          <Button
            className="mt-6 gap-2"
            style={{ backgroundColor: colors.brand.blue }}
            onClick={() => navigate('/submit-requests')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Requests
          </Button>
        </motion.div>
      </div>
    );
  }

  const statusConfig = PR_STATUS_CONFIG[pullRequest.status];
  const typeConfig = PR_TYPE_CONFIG[pullRequest.prType];
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;

  const handleVote = (vote: 1 | -1) => {
    setUserVote(userVote === vote ? null : vote);
    toast.success(vote === 1 ? 'Upvoted!' : 'Downvoted!');
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    toast.success('Comment added!');
    setNewComment('');
  };

  const handleMerge = (data: unknown) => {
    console.log('Merging PR with data:', data);
    setIsMergeDialogOpen(false);
    toast.success('Submit request merged successfully!');
  };

  const handleClose = (data: unknown) => {
    console.log('Closing PR with data:', data);
    setIsCloseDialogOpen(false);
    toast.success(
      closeDialogVariant === 'reject' ? 'Submit request rejected' : 'Submit request closed'
    );
  };

  const handleReviewSubmit = (data: unknown) => {
    console.log('Review submitted:', data);
    setIsReviewDialogOpen(false);
    toast.success('Review submitted successfully!');
  };

  const handleCommentSubmit = (data: unknown) => {
    console.log('Comment submitted:', data);
    setIsCommentDialogOpen(false);
    toast.success('Comment added successfully!');
  };

  const handleRequestChanges = (data: unknown) => {
    console.log('Changes requested:', data);
    setIsRequestChangesDialogOpen(false);
    toast.success('Changes requested successfully!');
  };

  const openCloseDialog = (variant: 'close' | 'reject') => {
    setCloseDialogVariant(variant);
    setIsCloseDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen" style={{ backgroundColor: colors.background.cream }}>
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Back Button */}
          <motion.div {...fadeIn()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/submit-requests')}
              className="mb-6 gap-2 font-mono text-sm hover:bg-white/60"
              style={{ color: colors.text.secondaryOpacity75 }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Submit Requests
            </Button>
          </motion.div>

          {/* Header Card */}
          <motion.div
            {...fadeIn(0.05)}
            className="mb-8 overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${statusConfig.bgColor.includes('#') ? statusConfig.bgColor.replace('bg-', '') : ''}15`,
                }}
              >
                <StatusIcon className={cn('h-6 w-6', statusConfig.color)} />
              </div>

              {/* Title & Meta */}
              <div className="min-w-0 flex-1">
                <h1
                  className="font-serif text-2xl leading-tight font-bold"
                  style={{ color: colors.text.primary }}
                >
                  {pullRequest.title}
                  <span
                    className="ml-2 font-mono text-lg font-normal"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    #{pullRequest._id.slice(-4)}
                  </span>
                </h1>

                {/* Badges */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge
                    className={cn(
                      'gap-1 border-0 font-mono text-xs text-white',
                      statusConfig.bgColor
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig.label}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={cn('gap-1 font-mono text-xs', typeConfig.color)}
                  >
                    <TypeIcon className="h-3 w-3" />
                    {typeConfig.label}
                  </Badge>

                  {pullRequest.isDraft && (
                    <Badge variant="secondary" className="gap-1 font-mono text-xs">
                      <FileText className="h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </div>

                {/* Author Line */}
                <p
                  className="mt-3 font-mono text-sm"
                  style={{ color: colors.text.secondaryOpacity70 }}
                >
                  <span style={{ color: colors.text.primary }} className="font-medium">
                    {pullRequest.author?.displayName}
                  </span>{' '}
                  wants to merge into{' '}
                  <span
                    className="rounded px-1.5 py-0.5 font-medium"
                    style={{ backgroundColor: `${colors.brand.blue}15`, color: colors.brand.blue }}
                  >
                    {pullRequest.story?.title}
                  </span>
                </p>
              </div>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-shrink-0 border-black/10 hover:bg-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2 font-mono text-sm">
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 font-mono text-sm">
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 font-mono text-sm"
                    style={{ color: colors.brand.orange }}
                  >
                    <Flag className="h-4 w-4" />
                    Flag for Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <motion.div {...fadeIn(0.1)} className="space-y-6 lg:col-span-2">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="h-auto gap-1 bg-white/50 p-1">
                  <TabsTrigger
                    value="conversation"
                    className="gap-2 font-mono text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Conversation
                    <span
                      className="rounded-full px-1.5 py-0.5 text-xs"
                      style={{
                        backgroundColor: `${colors.brand.pink[500]}15`,
                        color: colors.brand.pink[500],
                      }}
                    >
                      {comments.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="changes"
                    className="gap-2 font-mono text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <FileEdit className="h-4 w-4" />
                    Changes
                    <span className="text-xs">
                      <span className="text-emerald-600">
                        +{pullRequest.changes.additionsCount}
                      </span>
                      {' / '}
                      <span className="text-red-500">
                        -{pullRequest.changes.deletionsCount || 0}
                      </span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="gap-2 font-mono text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Reviews
                    <span
                      className="rounded-full px-1.5 py-0.5 text-xs"
                      style={{
                        backgroundColor: `${colors.brand.blue}15`,
                        color: colors.brand.blue,
                      }}
                    >
                      {reviews.length}
                    </span>
                  </TabsTrigger>
                </TabsList>

                {/* Conversation Tab */}
                <TabsContent value="conversation" className="mt-6 space-y-4">
                  {/* Description Card */}
                  <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4">
                      <Avatar className="h-10 w-10 ring-2 ring-white">
                        <AvatarImage src={pullRequest.author?.avatar} />
                        <AvatarFallback
                          style={{
                            backgroundColor: `${colors.brand.pink[500]}20`,
                            color: colors.brand.pink[500],
                          }}
                        >
                          {pullRequest.author?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium" style={{ color: colors.text.primary }}>
                          {pullRequest.author?.displayName}
                        </span>
                        <span
                          className="ml-2 font-mono text-sm"
                          style={{ color: colors.text.secondaryOpacity65 }}
                        >
                          {formatDistanceToNow(new Date(pullRequest.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p
                        className="leading-relaxed"
                        style={{ color: colors.text.secondaryOpacity75 }}
                      >
                        {pullRequest.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline & Comments */}
                  <div className="space-y-4">
                    {/* Timeline Events */}
                    {pullRequest.timeline.map((event, idx) => {
                      const config = TIMELINE_ACTION_CONFIG[event.action];
                      const EventIcon = config?.icon || GitPullRequest;

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                            <EventIcon className={cn('h-4 w-4', config?.color)} />
                          </div>
                          <div className="flex-1">
                            <span
                              className="font-mono text-sm"
                              style={{ color: colors.text.secondaryOpacity75 }}
                            >
                              <span style={{ color: colors.text.primary }} className="font-medium">
                                {event.performedBy ? 'User' : 'System'}
                              </span>{' '}
                              {config?.label}
                              <span
                                className="ml-2 text-xs"
                                style={{ color: colors.text.secondaryOpacity65 }}
                              >
                                {formatDistanceToNow(new Date(event.performedAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Comments */}
                    {threadedComments.map((comment) => (
                      <CommentCard key={comment._id} comment={comment} />
                    ))}
                  </div>

                  {/* New Comment Box */}
                  <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-white">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser" />
                        <AvatarFallback
                          style={{
                            backgroundColor: `${colors.brand.blue}20`,
                            color: colors.brand.blue,
                          }}
                        >
                          U
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Leave a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px] resize-none border-black/10 bg-white/50 focus:border-[#6b7cff] focus:ring-[#6b7cff]/20"
                        />
                        <div className="mt-3 flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsCommentDialogOpen(true)}
                            className="gap-2 border-black/10 font-mono text-xs hover:bg-white"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Detailed Comment
                          </Button>
                          <Button
                            onClick={handleComment}
                            disabled={!newComment.trim()}
                            className="gap-2 font-mono text-sm"
                            style={{ backgroundColor: colors.brand.pink[500] }}
                          >
                            <Send className="h-4 w-4" />
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Changes Tab */}
                <TabsContent value="changes" className="mt-6">
                  <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 shadow-sm">
                    <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-medium" style={{ color: colors.text.primary }}>
                          {pullRequest.chapter?.title}
                        </span>
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-emerald-600">
                            +{pullRequest.changes.additionsCount || 0} additions
                          </span>
                          <span className="text-red-500">
                            -{pullRequest.changes.deletionsCount || 0} deletions
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDiff(!showDiff)}
                        className="gap-2 border-black/10 font-mono text-xs hover:bg-white"
                      >
                        {showDiff ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        {showDiff ? 'Hide' : 'Show'}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showDiff && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {pullRequest.changes.original && (
                            <div className="border-b border-black/5">
                              <div className="bg-red-50/80 px-5 py-2 font-mono text-xs font-medium text-red-600">
                                Original Content
                              </div>
                              <pre className="bg-red-50/30 p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-red-900/70">
                                {pullRequest.changes.original}
                              </pre>
                            </div>
                          )}
                          <div>
                            <div className="bg-emerald-50/80 px-5 py-2 font-mono text-xs font-medium text-emerald-600">
                              Proposed Content
                            </div>
                            <pre className="bg-emerald-50/30 p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-emerald-900/70">
                              {pullRequest.changes.proposed}
                            </pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6 space-y-4">
                  {reviews.length === 0 ? (
                    <div className="flex flex-col items-center rounded-xl border border-black/5 bg-white/80 py-16 text-center shadow-sm">
                      <div
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${colors.brand.blue}15` }}
                      >
                        <Eye className="h-8 w-8" style={{ color: colors.brand.blue }} />
                      </div>
                      <h3
                        className="font-serif text-lg font-medium"
                        style={{ color: colors.text.primary }}
                      >
                        No reviews yet
                      </h3>
                      <p
                        className="mt-1 font-mono text-sm"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        Reviews will appear here once submitted
                      </p>
                    </div>
                  ) : (
                    reviews.map((review) => <ReviewCard key={review._id} review={review} />)
                  )}

                  {/* Submit Review Card */}
                  <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                    <h3
                      className="font-serif text-lg font-medium"
                      style={{ color: colors.text.primary }}
                    >
                      Submit Your Review
                    </h3>
                    <p
                      className="mt-1 font-mono text-sm"
                      style={{ color: colors.text.secondaryOpacity65 }}
                    >
                      Review this submission and provide feedback to the author.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="gap-2 border-black/10 font-mono text-sm hover:bg-white"
                        style={{ color: colors.brand.orange }}
                        onClick={() => setIsRequestChangesDialogOpen(true)}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Request Changes
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 border-black/10 font-mono text-sm hover:bg-white"
                        style={{ color: colors.brand.blue }}
                        onClick={() => setIsReviewDialogOpen(true)}
                      >
                        <Star className="h-4 w-4" />
                        Write Review
                      </Button>
                      <Button
                        className="gap-2 font-mono text-sm text-white"
                        style={{ backgroundColor: colors.brand.pink[500] }}
                        onClick={() => setIsReviewDialogOpen(true)}
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right Column - Sidebar */}
            <motion.div {...fadeIn(0.15)} className="space-y-4">
              {/* Voting Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3
                  className="mb-4 font-mono text-xs font-medium tracking-wider uppercase"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  Community Votes
                </h3>
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={userVote === 1 ? 'default' : 'outline'}
                        size="lg"
                        onClick={() => handleVote(1)}
                        className={cn(
                          'flex-1 gap-2 font-mono transition-all',
                          userVote === 1
                            ? 'border-0 text-white'
                            : 'border-black/10 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600'
                        )}
                        style={userVote === 1 ? { backgroundColor: '#10b981' } : {}}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span className="text-lg font-bold">{pullRequest.votes.upvotes}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Upvote this request</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={userVote === -1 ? 'destructive' : 'outline'}
                        size="lg"
                        onClick={() => handleVote(-1)}
                        className={cn(
                          'flex-1 gap-2 font-mono transition-all',
                          userVote !== -1 &&
                            'border-black/10 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                        )}
                      >
                        <ThumbsDown className="h-5 w-5" />
                        <span className="text-lg font-bold">{pullRequest.votes.downvotes}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Downvote this request</TooltipContent>
                  </Tooltip>
                </div>
                <div
                  className="mt-3 text-center font-mono text-sm"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  Score:{' '}
                  <span
                    className="font-bold"
                    style={{
                      color:
                        pullRequest.votes.score > 0
                          ? '#10b981'
                          : pullRequest.votes.score < 0
                            ? '#ef4444'
                            : colors.text.primary,
                    }}
                  >
                    {pullRequest.votes.score > 0 ? '+' : ''}
                    {pullRequest.votes.score}
                  </span>
                </div>
              </div>

              {/* Approvals Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3
                  className="mb-4 font-mono text-xs font-medium tracking-wider uppercase"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  Approvals
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span style={{ color: colors.text.secondaryOpacity65 }}>Required</span>
                    <span className="font-medium" style={{ color: colors.text.primary }}>
                      {pullRequest.approvalsStatus.required}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span style={{ color: colors.text.secondaryOpacity65 }}>Received</span>
                    <span
                      className="font-medium"
                      style={{
                        color:
                          pullRequest.approvalsStatus.received >=
                          pullRequest.approvalsStatus.required
                            ? '#10b981'
                            : colors.text.primary,
                      }}
                    >
                      {pullRequest.approvalsStatus.received}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 overflow-hidden rounded-full bg-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          (pullRequest.approvalsStatus.received /
                            pullRequest.approvalsStatus.required) *
                            100,
                          100
                        )}%`,
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor:
                          pullRequest.approvalsStatus.received >=
                          pullRequest.approvalsStatus.required
                            ? '#10b981'
                            : colors.brand.blue,
                      }}
                    />
                  </div>

                  {/* Approvers */}
                  {pullRequest.approvalsStatus.approvers.length > 0 && (
                    <div className="pt-2">
                      <span
                        className="font-mono text-xs"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        Approved by:
                      </span>
                      <div className="mt-2 flex -space-x-2">
                        {pullRequest.approvalsStatus.approvers.map((_, idx) => (
                          <Avatar key={idx} className="h-7 w-7 ring-2 ring-white">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=approver${idx}`}
                            />
                            <AvatarFallback
                              className="text-[10px]"
                              style={{
                                backgroundColor: `${colors.brand.pink[500]}20`,
                                color: colors.brand.pink[500],
                              }}
                            >
                              A
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blockers */}
                  {pullRequest.approvalsStatus.blockers.length > 0 && (
                    <div className="rounded-lg bg-red-50 p-3">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {pullRequest.approvalsStatus.blockers.length} blocking review(s)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Labels Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3
                  className="mb-4 font-mono text-xs font-medium tracking-wider uppercase"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  Labels
                </h3>
                {pullRequest.labels.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {pullRequest.labels.map((label) => (
                      <Badge
                        key={label}
                        variant="outline"
                        className="border-black/10 font-mono text-xs"
                        style={{ color: colors.text.secondaryOpacity75 }}
                      >
                        {label.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p
                    className="font-mono text-sm"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    No labels
                  </p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 w-full gap-1 font-mono text-xs hover:bg-black/5"
                >
                  <Plus className="h-3 w-3" />
                  Add Label
                </Button>
              </div>

              {/* Target Info */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3
                  className="mb-4 font-mono text-xs font-medium tracking-wider uppercase"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  Target
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <GitBranch className="h-4 w-4" style={{ color: colors.brand.blue }} />
                    <span style={{ color: colors.text.secondaryOpacity65 }}>Story:</span>
                    <span className="font-medium" style={{ color: colors.text.primary }}>
                      {pullRequest.story?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <FileText className="h-4 w-4" style={{ color: colors.brand.pink[500] }} />
                    <span style={{ color: colors.text.secondaryOpacity65 }}>Chapter:</span>
                    <span className="font-medium" style={{ color: colors.text.primary }}>
                      {pullRequest.chapter?.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3
                  className="mb-4 font-mono text-xs font-medium tracking-wider uppercase"
                  style={{ color: colors.text.secondaryOpacity65 }}
                >
                  Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span
                      className="flex items-center gap-2"
                      style={{ color: colors.text.secondaryOpacity65 }}
                    >
                      <Eye className="h-4 w-4" />
                      Views
                    </span>
                    <span className="font-medium" style={{ color: colors.text.primary }}>
                      {pullRequest.stats.views}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span
                      className="flex items-center gap-2"
                      style={{ color: colors.text.secondaryOpacity65 }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Comments
                    </span>
                    <span className="font-medium" style={{ color: colors.text.primary }}>
                      {pullRequest.commentCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span
                      className="flex items-center gap-2"
                      style={{ color: colors.text.secondaryOpacity65 }}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Reviews
                    </span>
                    <span className="font-medium" style={{ color: colors.text.primary }}>
                      {pullRequest.stats.reviewsReceived}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {(pullRequest.status === 'OPEN' || pullRequest.status === 'APPROVED') && (
                <div className="space-y-2">
                  {pullRequest.approvalsStatus.canMerge && (
                    <Button
                      className="w-full gap-2 font-mono text-sm text-white"
                      style={{ backgroundColor: colors.brand.pink[500] }}
                      onClick={() => setIsMergeDialogOpen(true)}
                    >
                      <GitMerge className="h-4 w-4" />
                      Merge Request
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-red-200 font-mono text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => openCloseDialog('reject')}
                  >
                    <X className="h-4 w-4" />
                    Reject Request
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-black/10 font-mono text-sm hover:bg-black/5"
                    onClick={() => openCloseDialog('close')}
                  >
                    <GitPullRequestClosed className="h-4 w-4" />
                    Close Request
                  </Button>
                </div>
              )}

              {/* Merged Info */}
              {pullRequest.status === 'MERGED' && pullRequest.mergedAt && (
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${colors.brand.pink[500]}10` }}
                >
                  <div
                    className="flex items-center gap-2 font-mono text-sm"
                    style={{ color: colors.brand.pink[500] }}
                  >
                    <GitMerge className="h-4 w-4" />
                    <span className="font-medium">Merged</span>
                  </div>
                  <p
                    className="mt-1 font-mono text-xs"
                    style={{ color: colors.text.secondaryOpacity65 }}
                  >
                    {format(new Date(pullRequest.mergedAt), 'PPp')}
                  </p>
                </div>
              )}

              {/* Closed/Rejected Info */}
              {(pullRequest.status === 'CLOSED' || pullRequest.status === 'REJECTED') &&
                pullRequest.closedAt && (
                  <div className="rounded-xl bg-slate-100 p-4">
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-700">
                      <GitPullRequestClosed className="h-4 w-4" />
                      <span className="font-medium">
                        {pullRequest.status === 'REJECTED' ? 'Rejected' : 'Closed'}
                      </span>
                    </div>
                    {pullRequest.closeReason && (
                      <p
                        className="mt-1 font-mono text-xs"
                        style={{ color: colors.text.secondaryOpacity65 }}
                      >
                        {pullRequest.closeReason}
                      </p>
                    )}
                  </div>
                )}
            </motion.div>
          </div>

          {/* Dialogs */}
          <MergeDialog
            open={isMergeDialogOpen}
            onOpenChange={setIsMergeDialogOpen}
            onConfirm={handleMerge}
            pullRequest={pullRequest}
          />

          <CloseDialog
            open={isCloseDialogOpen}
            onOpenChange={setIsCloseDialogOpen}
            onConfirm={handleClose}
            variant={closeDialogVariant}
            prTitle={pullRequest.title}
          />

          <ReviewDialog
            open={isReviewDialogOpen}
            onOpenChange={setIsReviewDialogOpen}
            onSubmit={handleReviewSubmit}
            prTitle={pullRequest.title}
          />

          <CommentDialog
            open={isCommentDialogOpen}
            onOpenChange={setIsCommentDialogOpen}
            onSubmit={handleCommentSubmit}
          />

          <RequestChangesDialog
            open={isRequestChangesDialogOpen}
            onOpenChange={setIsRequestChangesDialogOpen}
            onSubmit={handleRequestChanges}
            prTitle={pullRequest.title}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}

// ==================== COMMENT CARD COMPONENT ====================

interface CommentCardProps {
  comment: IPRComment & { replies?: IPRComment[] };
}

function CommentCard({ comment }: CommentCardProps) {
  const [showReplies, setShowReplies] = useState(true);

  const typeColors: Record<string, { bg: string; text: string; border: string }> = {
    APPROVAL: { bg: '#10b98115', text: '#10b981', border: '#10b98130' },
    REQUEST_CHANGES: {
      bg: `${colors.brand.orange}15`,
      text: colors.brand.orange,
      border: `${colors.brand.orange}30`,
    },
    SUGGESTION: {
      bg: `${colors.brand.blue}15`,
      text: colors.brand.blue,
      border: `${colors.brand.blue}30`,
    },
    QUESTION: {
      bg: `${colors.brand.pink[500]}15`,
      text: colors.brand.pink[500],
      border: `${colors.brand.pink[500]}30`,
    },
    GENERAL: { bg: '#64748b15', text: '#64748b', border: '#64748b30' },
  };

  const typeStyle = typeColors[comment.commentType] || typeColors.GENERAL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border border-black/5 bg-white/80 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4">
        <Avatar className="h-8 w-8 ring-2 ring-white">
          <AvatarImage src={comment.user?.avatar} />
          <AvatarFallback
            style={{ backgroundColor: `${colors.brand.blue}20`, color: colors.brand.blue }}
          >
            {comment.user?.displayName?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <span className="font-medium" style={{ color: colors.text.primary }}>
            {comment.user?.displayName}
          </span>
          <span
            className="ml-2 font-mono text-sm"
            style={{ color: colors.text.secondaryOpacity65 }}
          >
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          {comment.isEdited && (
            <span
              className="ml-2 font-mono text-xs"
              style={{ color: colors.text.secondaryOpacity65 }}
            >
              (edited)
            </span>
          )}
        </div>
        <Badge
          variant="outline"
          className="font-mono text-xs"
          style={{
            backgroundColor: typeStyle.bg,
            color: typeStyle.text,
            borderColor: typeStyle.border,
          }}
        >
          {comment.commentType.replace('_', ' ')}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="leading-relaxed" style={{ color: colors.text.secondaryOpacity75 }}>
          {comment.content}
        </p>

        {/* Suggestion Block */}
        {comment.suggestion && comment.suggestion.suggestedText && (
          <div className="mt-4 overflow-hidden rounded-lg border border-black/10">
            <div
              className="bg-black/5 px-4 py-2 font-mono text-xs font-medium"
              style={{ color: colors.text.secondaryOpacity75 }}
            >
              Suggested Change
            </div>
            <div className="space-y-1 p-4 font-mono text-sm">
              {comment.suggestion.originalText && (
                <div className="rounded bg-red-50 p-3 text-red-700">
                  - {comment.suggestion.originalText}
                </div>
              )}
              <div className="rounded bg-emerald-50 p-3 text-emerald-700">
                + {comment.suggestion.suggestedText}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-t border-black/5">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex w-full items-center gap-2 px-5 py-3 font-mono text-xs transition-colors hover:bg-black/5"
            style={{ color: colors.text.secondaryOpacity65 }}
          >
            {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>

          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 bg-black/[0.02] p-5">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex gap-3">
                      <Avatar className="h-6 w-6 ring-1 ring-white">
                        <AvatarImage src={reply.user?.avatar} />
                        <AvatarFallback
                          className="text-[10px]"
                          style={{
                            backgroundColor: `${colors.brand.pink[500]}20`,
                            color: colors.brand.pink[500],
                          }}
                        >
                          {reply.user?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-mono text-sm">
                          <span className="font-medium" style={{ color: colors.text.primary }}>
                            {reply.user?.displayName}
                          </span>
                          <span
                            className="ml-2 text-xs"
                            style={{ color: colors.text.secondaryOpacity65 }}
                          >
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: colors.text.secondaryOpacity75 }}
                        >
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// ==================== REVIEW CARD COMPONENT ====================

interface ReviewCardProps {
  review: IPRReview;
}

function ReviewCard({ review }: ReviewCardProps) {
  const statusConfig: Record<string, { bg: string; border: string; text: string }> = {
    APPROVED: { bg: '#10b98110', border: '#10b98130', text: '#10b981' },
    CHANGES_REQUESTED: {
      bg: `${colors.brand.orange}10`,
      border: `${colors.brand.orange}30`,
      text: colors.brand.orange,
    },
    PENDING_REVIEW: { bg: '#64748b10', border: '#64748b30', text: '#64748b' },
    IN_REVIEW: {
      bg: `${colors.brand.blue}10`,
      border: `${colors.brand.blue}30`,
      text: colors.brand.blue,
    },
    NEEDS_WORK: { bg: '#ef444410', border: '#ef444430', text: '#ef4444' },
    DRAFT: { bg: '#64748b10', border: '#64748b30', text: '#64748b' },
  };

  const config = statusConfig[review.reviewStatus] || statusConfig.PENDING_REVIEW;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border p-5"
      style={{ backgroundColor: config.bg, borderColor: config.border }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-white">
            <AvatarImage src={review.reviewer?.avatar} />
            <AvatarFallback
              style={{
                backgroundColor: `${colors.brand.pink[500]}20`,
                color: colors.brand.pink[500],
              }}
            >
              {review.reviewer?.displayName?.charAt(0) || 'R'}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium" style={{ color: colors.text.primary }}>
              {review.reviewer?.displayName}
            </span>
            <span
              className="ml-2 font-mono text-sm"
              style={{ color: colors.text.secondaryOpacity65 }}
            >
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Badge
          variant="outline"
          className="font-mono text-xs"
          style={{ borderColor: config.border, color: config.text }}
        >
          {review.reviewStatus.replace('_', ' ')}
        </Badge>
      </div>

      {/* Summary */}
      {review.summary && (
        <p className="mt-4 leading-relaxed" style={{ color: colors.text.secondaryOpacity75 }}>
          {review.summary}
        </p>
      )}

      {/* Feedback */}
      {review.feedback.length > 0 && (
        <div className="mt-4 space-y-2">
          {review.feedback.map((fb, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg bg-white/60 p-3">
              <span
                className="font-mono text-sm font-medium"
                style={{ color: colors.text.primary }}
              >
                {fb.section}
              </span>
              {fb.rating && (
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-4 w-4',
                        star <= fb.rating! ? 'fill-amber-400 text-amber-400' : 'text-black/10'
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Overall Rating */}
      {review.overallRating && (
        <div className="mt-4 flex items-center gap-3 border-t border-black/10 pt-4">
          <span className="font-mono text-sm" style={{ color: colors.text.secondaryOpacity65 }}>
            Overall:
          </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-5 w-5',
                  star <= review.overallRating! ? 'fill-amber-400 text-amber-400' : 'text-black/10'
                )}
              />
            ))}
          </div>
          <span className="font-mono font-medium" style={{ color: colors.text.primary }}>
            {review.overallRating}/5
          </span>
        </div>
      )}
    </motion.div>
  );
}
