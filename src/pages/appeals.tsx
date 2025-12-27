import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { cn, fadeIn } from '@/lib/utils';
import { AppealCard, AppealsLoading, AppealsError, AppealsEmpty } from '@/components/report-appeal';
import {
  type IAppeal,
  type AppealStatus,
  type AppealPriority,
  type ReviewDecision,
} from '@/type/appeal.type';

// Mock data - replace with actual API
const MOCK_APPEALS: IAppeal[] = [
  {
    _id: '1',
    banHistoryId: 'ban-1',
    userId: 'user-1',
    userName: 'Alex Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    userEmail: 'alex@example.com',
    appealReason: 'Wrongful spam detection',
    explanation:
      'My account was flagged for spam after posting multiple chapters quickly. I was just excited to share my story and uploaded several chapters at once. This was my first story on the platform and I did not know about the rate limits.',
    evidenceUrls: ['https://example.com/screenshot1.png'],
    status: 'PENDING',
    priority: 'NORMAL',
    reviewCount: 0,
    banReason: 'Automated spam detection',
    banType: 'TEMPORARY',
    banExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: '2',
    banHistoryId: 'ban-2',
    userId: 'user-2',
    userName: 'Maria Garcia',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    userEmail: 'maria@example.com',
    appealReason: 'Content was misunderstood',
    explanation:
      'My story chapter included a scene that was flagged as inappropriate, but it was actually a metaphorical representation of overcoming depression. The imagery was symbolic, not literal violence. I can provide context from the full story arc.',
    evidenceUrls: [],
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    assignedTo: 'admin-1',
    assignedToName: 'Content Team',
    assignedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    reviewCount: 1,
    banReason: 'Inappropriate content',
    banType: 'CONTENT_REMOVAL',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    _id: '3',
    banHistoryId: 'ban-3',
    userId: 'user-3',
    userName: 'David Kim',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    appealReason: 'False harassment report',
    explanation:
      'I was reported for harassment by another user, but this was actually a misunderstanding during a collaborative writing project. We had a creative disagreement that was taken out of context. The other user has since apologized privately.',
    evidenceUrls: ['https://example.com/dm-screenshot.png', 'https://example.com/apology.png'],
    status: 'APPROVED',
    priority: 'NORMAL',
    reviewedBy: 'admin-2',
    reviewerName: 'Senior Mod',
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    reviewDecision: 'APPROVE',
    responseMessage:
      'After reviewing the evidence provided, we have determined this was a misunderstanding. Your account restrictions have been lifted.',
    reviewCount: 2,
    banReason: 'Harassment',
    banType: 'TEMPORARY',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    _id: '4',
    banHistoryId: 'ban-4',
    userId: 'user-4',
    userName: 'Sarah Brown',
    appealReason: 'Account hacked',
    explanation:
      'My account was compromised and someone posted spam content. I have since recovered my account and changed my password. Please review the IP logs - the spam was posted from a different location than my usual access.',
    evidenceUrls: [],
    status: 'ESCALATED',
    priority: 'URGENT',
    escalatedTo: 'security-team',
    escalatedToName: 'Security Team',
    escalatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    escalationReason: 'Security concern - potential account compromise',
    reviewCount: 3,
    banReason: 'Spam activity',
    banType: 'PERMANENT',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

type FilterStatus = 'all' | AppealStatus;

export default function AppealsPage() {
  const [appeals] = useState<IAppeal[]>(MOCK_APPEALS);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<AppealPriority | 'all'>('all');

  const [selectedAppeal, setSelectedAppeal] = useState<IAppeal | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<ReviewDecision>('APPROVE');
  const [responseMessage, setResponseMessage] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [escalationReason, setEscalationReason] = useState('');

  // Filter appeals
  const filteredAppeals = useMemo(() => {
    return appeals.filter((appeal) => {
      // Status filter
      if (statusFilter !== 'all' && appeal.status !== statusFilter) return false;

      // Priority filter
      if (priorityFilter !== 'all' && appeal.priority !== priorityFilter) return false;

      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          appeal.userName?.toLowerCase().includes(query) ||
          appeal.userEmail?.toLowerCase().includes(query) ||
          appeal.appealReason.toLowerCase().includes(query) ||
          appeal.explanation.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [appeals, statusFilter, priorityFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: appeals.length,
      pending: appeals.filter((a) => a.status === 'PENDING').length,
      underReview: appeals.filter((a) => a.status === 'UNDER_REVIEW').length,
      approved: appeals.filter((a) => a.status === 'APPROVED').length,
      rejected: appeals.filter((a) => a.status === 'REJECTED').length,
      escalated: appeals.filter((a) => a.status === 'ESCALATED').length,
      urgent: appeals.filter((a) => a.priority === 'URGENT').length,
    };
  }, [appeals]);

  const openReviewDialog = (appeal: IAppeal, decision: ReviewDecision) => {
    setSelectedAppeal(appeal);
    setReviewDecision(decision);
    setResponseMessage('');
    setInternalNotes('');
    setEscalationReason('');
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!selectedAppeal) return;

    if (!responseMessage.trim()) {
      toast.error('Please provide a response message');
      return;
    }

    if (reviewDecision === 'ESCALATE' && !escalationReason.trim()) {
      toast.error('Please provide an escalation reason');
      return;
    }

    // TODO: API call
    toast.success(
      reviewDecision === 'APPROVE'
        ? 'Appeal approved'
        : reviewDecision === 'REJECT'
          ? 'Appeal rejected'
          : 'Appeal escalated'
    );
    setIsReviewDialogOpen(false);
    setSelectedAppeal(null);
  };

  if (error) {
    return <AppealsError message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <motion.div {...fadeIn()} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
            <Scale className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Appeals</h1>
            <p className="text-muted-foreground">Review and process user appeals</p>
          </div>
        </div>

        {/* Urgent badge */}
        {stats.urgent > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-4"
          >
            <Badge variant="destructive" className="gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              {stats.urgent} urgent appeal{stats.urgent > 1 ? 's' : ''} require attention
            </Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        {...fadeIn(0.1)}
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6"
      >
        {[
          { label: 'Total', value: stats.total, icon: Scale, color: 'text-foreground' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500' },
          { label: 'In Review', value: stats.underReview, icon: Eye, color: 'text-blue-500' },
          { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-500' },
          {
            label: 'Escalated',
            value: stats.escalated,
            icon: ArrowUpRight,
            color: 'text-purple-500',
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-card rounded-xl border p-4"
          >
            <div className="flex items-center gap-2">
              <stat.icon className={cn('h-4 w-4', stat.color)} />
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeIn(0.15)} className="mb-6 space-y-4">
        {/* Status tabs */}
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
          <TabsList className="h-auto flex-wrap gap-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="PENDING" className="gap-1">
              <Clock className="h-3.5 w-3.5" />
              Pending
              {stats.pending > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                  {stats.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="UNDER_REVIEW">In Review</TabsTrigger>
            <TabsTrigger value="ESCALATED" className="gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              Escalated
            </TabsTrigger>
            <TabsTrigger value="APPROVED">Approved</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and priority filter */}
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search appeals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={priorityFilter}
            onValueChange={(v) => setPriorityFilter(v as AppealPriority | 'all')}
          >
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="NORMAL">Normal</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Appeals List */}
      <motion.div {...fadeIn(0.2)}>
        {isLoading ? (
          <AppealsLoading count={5} />
        ) : filteredAppeals.length === 0 ? (
          <AppealsEmpty
            title={searchQuery || statusFilter !== 'all' ? 'No matching appeals' : 'No appeals yet'}
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'When users submit appeals, they will appear here'
            }
            isUserView={false}
          />
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredAppeals.map((appeal, index) => (
                <motion.div
                  key={appeal._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AppealCard
                    appeal={appeal}
                    isAdmin={true}
                    onView={(a) => toast.info(`Viewing appeal: ${a._id}`)}
                    onApprove={(a) => openReviewDialog(a, 'APPROVE')}
                    onReject={(a) => openReviewDialog(a, 'REJECT')}
                    onEscalate={(a) => openReviewDialog(a, 'ESCALATE')}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {reviewDecision === 'APPROVE' && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Approve Appeal
                </>
              )}
              {reviewDecision === 'REJECT' && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Reject Appeal
                </>
              )}
              {reviewDecision === 'ESCALATE' && (
                <>
                  <ArrowUpRight className="h-5 w-5 text-purple-500" />
                  Escalate Appeal
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {reviewDecision === 'APPROVE' &&
                'The user will be notified and restrictions will be lifted'}
              {reviewDecision === 'REJECT' && 'The user will be notified of the decision'}
              {reviewDecision === 'ESCALATE' && 'This will be sent to senior moderators for review'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Decision selector */}
            <div className="space-y-2">
              <Label>Decision</Label>
              <RadioGroup
                value={reviewDecision}
                onValueChange={(v) => setReviewDecision(v as ReviewDecision)}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="APPROVE" id="approve" />
                  <Label htmlFor="approve" className="cursor-pointer font-normal text-green-600">
                    Approve
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="REJECT" id="reject" />
                  <Label htmlFor="reject" className="cursor-pointer font-normal text-red-600">
                    Reject
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="ESCALATE" id="escalate" />
                  <Label htmlFor="escalate" className="cursor-pointer font-normal text-purple-600">
                    Escalate
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Response message */}
            <div className="space-y-2">
              <Label>Response to user</Label>
              <Textarea
                placeholder="This message will be sent to the user..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={3}
              />
            </div>

            {/* Escalation reason */}
            {reviewDecision === 'ESCALATE' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label>Escalation reason</Label>
                <Textarea
                  placeholder="Why does this need senior review?"
                  value={escalationReason}
                  onChange={(e) => setEscalationReason(e.target.value)}
                  rows={2}
                />
              </motion.div>
            )}

            {/* Internal notes */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Internal notes (optional)</Label>
              <Textarea
                placeholder="Notes for other moderators..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={2}
                className="bg-muted/30"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              variant={
                reviewDecision === 'APPROVE'
                  ? 'default'
                  : reviewDecision === 'REJECT'
                    ? 'destructive'
                    : 'secondary'
              }
            >
              {reviewDecision === 'APPROVE' && 'Approve Appeal'}
              {reviewDecision === 'REJECT' && 'Reject Appeal'}
              {reviewDecision === 'ESCALATE' && 'Escalate Appeal'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
