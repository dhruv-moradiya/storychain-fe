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
  { icon: React.ElementType; color: string; bgColor: string; bgColorLight: string; label: string }
> = {
  OPEN: {
    icon: GitPullRequest,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    bgColorLight: 'bg-emerald-500/15',
    label: 'Open',
  },
  APPROVED: {
    icon: Check,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue',
    bgColorLight: 'bg-brand-blue/15',
    label: 'Approved',
  },
  MERGED: {
    icon: GitMerge,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500',
    bgColorLight: 'bg-brand-pink-500/15',
    label: 'Merged',
  },
  REJECTED: {
    icon: X,
    color: 'text-red-600',
    bgColor: 'bg-red-500',
    bgColorLight: 'bg-red-500/15',
    label: 'Rejected',
  },
  CLOSED: {
    icon: GitPullRequestClosed,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500',
    bgColorLight: 'bg-slate-500/15',
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
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/30',
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
  REVIEW_REQUESTED: { icon: Eye, color: 'text-brand-blue', label: 'requested a review' },
  REVIEW_SUBMITTED: { icon: MessageSquare, color: 'text-brand-blue', label: 'submitted a review' },
  APPROVED: { icon: Check, color: 'text-emerald-500', label: 'approved this request' },
  CHANGES_REQUESTED: { icon: AlertCircle, color: 'text-brand-orange', label: 'requested changes' },
  VOTED: { icon: ThumbsUp, color: 'text-brand-pink-500', label: 'voted on this request' },
  AUTO_APPROVED: { icon: Check, color: 'text-emerald-500', label: 'auto-approved by community' },
  MERGED: { icon: GitMerge, color: 'text-brand-pink-500', label: 'merged this request' },
  CLOSED: { icon: GitPullRequestClosed, color: 'text-slate-500', label: 'closed this request' },
  REOPENED: { icon: GitPullRequest, color: 'text-emerald-500', label: 'reopened this request' },
  MARKED_DRAFT: { icon: FileText, color: 'text-slate-500', label: 'marked as draft' },
  READY_FOR_REVIEW: { icon: Eye, color: 'text-brand-blue', label: 'marked ready for review' },
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
      <div className="bg-bg-cream min-h-screen px-4 py-16">
        <motion.div {...fadeIn()} className="mx-auto max-w-md text-center">
          <div className="bg-brand-pink-500/15 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <GitPullRequest className="text-brand-pink-500 h-10 w-10" />
          </div>
          <h1 className="text-text-primary font-serif text-2xl font-bold">Request Not Found</h1>
          <p className="text-text-secondary-70 mt-2">
            The submit request you're looking for doesn't exist or has been removed.
          </p>
          <Button
            className="bg-brand-blue hover:bg-brand-blue-alt mt-6 gap-2"
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
      <div className="bg-bg-cream min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Back Button */}
          <motion.div {...fadeIn()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/submit-requests')}
              className="text-text-secondary-75 mb-6 gap-2 font-mono text-sm hover:bg-white/60"
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
                className={cn(
                  'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl',
                  statusConfig.bgColorLight
                )}
              >
                <StatusIcon className={cn('h-6 w-6', statusConfig.color)} />
              </div>

              {/* Title & Meta */}
              <div className="min-w-0 flex-1">
                <h1 className="text-text-primary font-serif text-2xl leading-tight font-bold">
                  {pullRequest.title}
                  <span className="text-text-secondary-65 ml-2 font-mono text-lg font-normal">
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
                <p className="text-text-secondary-70 mt-3 font-mono text-sm">
                  <span className="text-text-primary font-medium">
                    {pullRequest.author?.displayName}
                  </span>{' '}
                  wants to merge into{' '}
                  <span className="bg-brand-blue/15 text-brand-blue rounded px-1.5 py-0.5 font-medium">
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
                  <DropdownMenuItem className="text-brand-orange gap-2 font-mono text-sm">
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
                    <span className="bg-brand-pink-500/15 text-brand-pink-500 rounded-full px-1.5 py-0.5 text-xs">
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
                    <span className="bg-brand-blue/15 text-brand-blue rounded-full px-1.5 py-0.5 text-xs">
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
                        <AvatarFallback className="bg-brand-pink-500/20 text-brand-pink-500">
                          {pullRequest.author?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-text-primary font-medium">
                          {pullRequest.author?.displayName}
                        </span>
                        <span className="text-text-secondary-65 ml-2 font-mono text-sm">
                          {formatDistanceToNow(new Date(pullRequest.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-text-secondary-75 leading-relaxed">
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
                            <span className="text-text-secondary-75 font-mono text-sm">
                              <span className="text-text-primary font-medium">
                                {event.performedBy ? 'User' : 'System'}
                              </span>{' '}
                              {config?.label}
                              <span className="text-text-secondary-65 ml-2 text-xs">
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
                        <AvatarFallback className="bg-brand-blue/20 text-brand-blue">
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
                            className="bg-brand-pink-500 gap-2 font-mono text-sm"
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
                        <span className="text-text-primary font-medium">
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
                      <div className="bg-brand-blue/15 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                        <Eye className="text-brand-blue h-8 w-8" />
                      </div>
                      <h3 className="text-text-primary font-serif text-lg font-medium">
                        No reviews yet
                      </h3>
                      <p className="text-text-secondary-65 mt-1 font-mono text-sm">
                        Reviews will appear here once submitted
                      </p>
                    </div>
                  ) : (
                    reviews.map((review) => <ReviewCard key={review._id} review={review} />)
                  )}

                  {/* Submit Review Card */}
                  <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                    <h3 className="text-text-primary font-serif text-lg font-medium">
                      Submit Your Review
                    </h3>
                    <p className="text-text-secondary-65 mt-1 font-mono text-sm">
                      Review this submission and provide feedback to the author.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="text-brand-orange gap-2 border-black/10 font-mono text-sm hover:bg-white"
                        onClick={() => setIsRequestChangesDialogOpen(true)}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Request Changes
                      </Button>
                      <Button
                        variant="outline"
                        className="text-brand-blue gap-2 border-black/10 font-mono text-sm hover:bg-white"
                        onClick={() => setIsReviewDialogOpen(true)}
                      >
                        <Star className="h-4 w-4" />
                        Write Review
                      </Button>
                      <Button
                        className="bg-brand-pink-500 gap-2 font-mono text-sm text-white"
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
                <h3 className="text-text-secondary-65 mb-4 font-mono text-xs font-medium tracking-wider uppercase">
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
                <div className="text-text-secondary-65 mt-3 text-center font-mono text-sm">
                  Score:{' '}
                  <span
                    className={cn(
                      'font-bold',
                      pullRequest.votes.score > 0
                        ? 'text-emerald-500'
                        : pullRequest.votes.score < 0
                          ? 'text-red-500'
                          : 'text-text-primary'
                    )}
                  >
                    {pullRequest.votes.score > 0 ? '+' : ''}
                    {pullRequest.votes.score}
                  </span>
                </div>
              </div>

              {/* Approvals Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3 className="text-text-secondary-65 mb-4 font-mono text-xs font-medium tracking-wider uppercase">
                  Approvals
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="text-text-secondary-65">Required</span>
                    <span className="text-text-primary font-medium">
                      {pullRequest.approvalsStatus.required}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="text-text-secondary-65">Received</span>
                    <span
                      className={cn(
                        'font-medium',
                        pullRequest.approvalsStatus.received >= pullRequest.approvalsStatus.required
                          ? 'text-emerald-500'
                          : 'text-text-primary'
                      )}
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
                      className={cn(
                        'h-full rounded-full',
                        pullRequest.approvalsStatus.received >= pullRequest.approvalsStatus.required
                          ? 'bg-emerald-500'
                          : 'bg-brand-blue'
                      )}
                    />
                  </div>

                  {/* Approvers */}
                  {pullRequest.approvalsStatus.approvers.length > 0 && (
                    <div className="pt-2">
                      <span className="text-text-secondary-65 font-mono text-xs">Approved by:</span>
                      <div className="mt-2 flex -space-x-2">
                        {pullRequest.approvalsStatus.approvers.map((_, idx) => (
                          <Avatar key={idx} className="h-7 w-7 ring-2 ring-white">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=approver${idx}`}
                            />
                            <AvatarFallback className="bg-brand-pink-500/20 text-brand-pink-500 text-[10px]">
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
                <h3 className="text-text-secondary-65 mb-4 font-mono text-xs font-medium tracking-wider uppercase">
                  Labels
                </h3>
                {pullRequest.labels.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {pullRequest.labels.map((label) => (
                      <Badge
                        key={label}
                        variant="outline"
                        className="text-text-secondary-75 border-black/10 font-mono text-xs"
                      >
                        {label.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary-65 font-mono text-sm">No labels</p>
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
                <h3 className="text-text-secondary-65 mb-4 font-mono text-xs font-medium tracking-wider uppercase">
                  Target
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <GitBranch className="text-brand-blue h-4 w-4" />
                    <span className="text-text-secondary-65">Story:</span>
                    <span className="text-text-primary font-medium">
                      {pullRequest.story?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <FileText className="text-brand-pink-500 h-4 w-4" />
                    <span className="text-text-secondary-65">Chapter:</span>
                    <span className="text-text-primary font-medium">
                      {pullRequest.chapter?.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/80 p-5 shadow-sm">
                <h3 className="text-text-secondary-65 mb-4 font-mono text-xs font-medium tracking-wider uppercase">
                  Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="text-text-secondary-65 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Views
                    </span>
                    <span className="text-text-primary font-medium">{pullRequest.stats.views}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="text-text-secondary-65 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comments
                    </span>
                    <span className="text-text-primary font-medium">
                      {pullRequest.commentCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="text-text-secondary-65 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Reviews
                    </span>
                    <span className="text-text-primary font-medium">
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
                      className="bg-brand-pink-500 w-full gap-2 font-mono text-sm text-white"
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
                <div className="bg-brand-pink-500/10 rounded-xl p-4">
                  <div className="text-brand-pink-500 flex items-center gap-2 font-mono text-sm">
                    <GitMerge className="h-4 w-4" />
                    <span className="font-medium">Merged</span>
                  </div>
                  <p className="text-text-secondary-65 mt-1 font-mono text-xs">
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
                      <p className="text-text-secondary-65 mt-1 font-mono text-xs">
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

  const typeColorClasses: Record<string, string> = {
    APPROVAL: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    REQUEST_CHANGES: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    SUGGESTION: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30',
    QUESTION: 'bg-brand-pink-500/15 text-brand-pink-500 border-brand-pink-500/30',
    GENERAL: 'bg-slate-500/15 text-slate-500 border-slate-500/30',
  };

  const typeClasses = typeColorClasses[comment.commentType] || typeColorClasses.GENERAL;

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
          <AvatarFallback className="bg-brand-blue/20 text-brand-blue">
            {comment.user?.displayName?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <span className="text-text-primary font-medium">{comment.user?.displayName}</span>
          <span className="text-text-secondary-65 ml-2 font-mono text-sm">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          {comment.isEdited && (
            <span className="text-text-secondary-65 ml-2 font-mono text-xs">(edited)</span>
          )}
        </div>
        <Badge variant="outline" className={cn('font-mono text-xs', typeClasses)}>
          {comment.commentType.replace('_', ' ')}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-text-secondary-75 leading-relaxed">{comment.content}</p>

        {/* Suggestion Block */}
        {comment.suggestion && comment.suggestion.suggestedText && (
          <div className="mt-4 overflow-hidden rounded-lg border border-black/10">
            <div className="text-text-secondary-75 bg-black/5 px-4 py-2 font-mono text-xs font-medium">
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
            className="text-text-secondary-65 flex w-full items-center gap-2 px-5 py-3 font-mono text-xs transition-colors hover:bg-black/5"
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
                        <AvatarFallback className="bg-brand-pink-500/20 text-brand-pink-500 text-[10px]">
                          {reply.user?.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-mono text-sm">
                          <span className="text-text-primary font-medium">
                            {reply.user?.displayName}
                          </span>
                          <span className="text-text-secondary-65 ml-2 text-xs">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-text-secondary-75 mt-1 text-sm">{reply.content}</p>
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
  const statusClasses: Record<string, { card: string; badge: string }> = {
    APPROVED: {
      card: 'bg-emerald-500/10 border-emerald-500/30',
      badge: 'border-emerald-500/30 text-emerald-500',
    },
    CHANGES_REQUESTED: {
      card: 'bg-brand-orange/10 border-brand-orange/30',
      badge: 'border-brand-orange/30 text-brand-orange',
    },
    PENDING_REVIEW: {
      card: 'bg-slate-500/10 border-slate-500/30',
      badge: 'border-slate-500/30 text-slate-500',
    },
    IN_REVIEW: {
      card: 'bg-brand-blue/10 border-brand-blue/30',
      badge: 'border-brand-blue/30 text-brand-blue',
    },
    NEEDS_WORK: {
      card: 'bg-red-500/10 border-red-500/30',
      badge: 'border-red-500/30 text-red-500',
    },
    DRAFT: {
      card: 'bg-slate-500/10 border-slate-500/30',
      badge: 'border-slate-500/30 text-slate-500',
    },
  };

  const config = statusClasses[review.reviewStatus] || statusClasses.PENDING_REVIEW;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('overflow-hidden rounded-xl border p-5', config.card)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-white">
            <AvatarImage src={review.reviewer?.avatar} />
            <AvatarFallback className="bg-brand-pink-500/20 text-brand-pink-500">
              {review.reviewer?.displayName?.charAt(0) || 'R'}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="text-text-primary font-medium">{review.reviewer?.displayName}</span>
            <span className="text-text-secondary-65 ml-2 font-mono text-sm">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Badge variant="outline" className={cn('font-mono text-xs', config.badge)}>
          {review.reviewStatus.replace('_', ' ')}
        </Badge>
      </div>

      {/* Summary */}
      {review.summary && (
        <p className="text-text-secondary-75 mt-4 leading-relaxed">{review.summary}</p>
      )}

      {/* Feedback */}
      {review.feedback.length > 0 && (
        <div className="mt-4 space-y-2">
          {review.feedback.map((fb, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg bg-white/60 p-3">
              <span className="text-text-primary font-mono text-sm font-medium">{fb.section}</span>
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
          <span className="text-text-secondary-65 font-mono text-sm">Overall:</span>
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
          <span className="text-text-primary font-mono font-medium">{review.overallRating}/5</span>
        </div>
      )}
    </motion.div>
  );
}
