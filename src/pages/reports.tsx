import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flag,
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
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
import { toast } from 'sonner';
import { cn, fadeIn } from '@/lib/utils';
import {
  ReportCard,
  ReportsLoading,
  ReportsError,
  ReportsEmpty,
} from '@/components/report-appeal/index';
import {
  type IReport,
  type ReportStatus,
  type ReportType,
  REPORT_STATUS_CONFIG,
} from '@/type/report.type';

// Mock data - replace with actual API
const MOCK_REPORTS: IReport[] = [
  {
    _id: '1',
    reporterId: 'user-1',
    reporterName: 'John Doe',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    reportType: 'CHAPTER',
    relatedChapterId: 'ch-1',
    relatedTitle: 'Chapter 5: The Dark Forest',
    reason: 'INAPPROPRIATE_CONTENT',
    description: 'This chapter contains violent content that is not suitable for the story rating.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    _id: '2',
    reporterId: 'user-2',
    reporterName: 'Jane Smith',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    reportType: 'COMMENT',
    relatedCommentId: 'comment-1',
    relatedTitle: 'Great chapter!',
    reason: 'HARASSMENT',
    description: 'This comment contains personal attacks against the author.',
    status: 'REVIEWED',
    reviewedBy: 'admin-1',
    reviewerName: 'Admin',
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: '3',
    reporterId: 'user-3',
    reporterName: 'Bob Wilson',
    reporterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    reportType: 'USER',
    relatedUserId: 'user-bad',
    relatedTitle: '@troublemaker',
    reason: 'SPAM',
    description: 'This user is posting promotional content across multiple stories.',
    status: 'RESOLVED',
    reviewedBy: 'admin-1',
    reviewerName: 'Admin',
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    resolution: 'User has been warned and promotional content removed.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

type FilterStatus = 'all' | ReportStatus;

export default function ReportsPage() {
  const [reports] = useState<IReport[]>(MOCK_REPORTS);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ReportType | 'all'>('all');

  const [selectedReport, setSelectedReport] = useState<IReport | null>(null);
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false);
  const [resolution, setResolution] = useState('');
  const [resolveAction, setResolveAction] = useState<'resolve' | 'dismiss'>('resolve');

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Status filter
      if (statusFilter !== 'all' && report.status !== statusFilter) return false;

      // Type filter
      if (typeFilter !== 'all' && report.reportType !== typeFilter) return false;

      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          report.reporterName?.toLowerCase().includes(query) ||
          report.relatedTitle?.toLowerCase().includes(query) ||
          report.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [reports, statusFilter, typeFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === 'PENDING').length,
      reviewed: reports.filter((r) => r.status === 'REVIEWED').length,
      resolved: reports.filter((r) => r.status === 'RESOLVED').length,
      dismissed: reports.filter((r) => r.status === 'DISMISSED').length,
    };
  }, [reports]);

  const handleResolve = (report: IReport) => {
    setSelectedReport(report);
    setResolveAction('resolve');
    setResolution('');
    setIsResolveDialogOpen(true);
  };

  const handleDismiss = (report: IReport) => {
    setSelectedReport(report);
    setResolveAction('dismiss');
    setResolution('');
    setIsResolveDialogOpen(true);
  };

  const handleSubmitResolution = () => {
    if (!selectedReport) return;

    // TODO: API call
    toast.success(resolveAction === 'resolve' ? 'Report marked as resolved' : 'Report dismissed');
    setIsResolveDialogOpen(false);
    setSelectedReport(null);
    setResolution('');
  };

  if (error) {
    return <ReportsError message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <motion.div {...fadeIn()} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
            <Flag className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Review and manage content reports</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeIn(0.1)} className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: 'Total', value: stats.total, icon: Flag, color: 'text-foreground' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500' },
          { label: 'Reviewed', value: stats.reviewed, icon: Eye, color: 'text-blue-500' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Dismissed', value: stats.dismissed, icon: XCircle, color: 'text-slate-500' },
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
          <TabsList>
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
            <TabsTrigger value="REVIEWED">Reviewed</TabsTrigger>
            <TabsTrigger value="RESOLVED">Resolved</TabsTrigger>
            <TabsTrigger value="DISMISSED">Dismissed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and type filter */}
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ReportType | 'all')}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CHAPTER">Chapter</SelectItem>
              <SelectItem value="COMMENT">Comment</SelectItem>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="STORY">Story</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Reports List */}
      <motion.div {...fadeIn(0.2)}>
        {isLoading ? (
          <ReportsLoading count={5} />
        ) : filteredReports.length === 0 ? (
          <ReportsEmpty
            title={searchQuery || statusFilter !== 'all' ? 'No matching reports' : 'No reports yet'}
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : "When users report content, it'll appear here"
            }
          />
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ReportCard
                    report={report}
                    isAdmin={true}
                    onView={(r) => toast.info(`Viewing report: ${r._id}`)}
                    onResolve={handleResolve}
                    onDismiss={handleDismiss}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Resolve/Dismiss Dialog */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {resolveAction === 'resolve' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Resolve Report
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-slate-500" />
                  Dismiss Report
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {resolveAction === 'resolve'
                ? 'Describe the action taken to resolve this report'
                : 'Provide a reason for dismissing this report'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Resolution note</Label>
              <Textarea
                placeholder={
                  resolveAction === 'resolve'
                    ? 'e.g., Content removed and user warned'
                    : 'e.g., Report does not violate guidelines'
                }
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitResolution}
              variant={resolveAction === 'resolve' ? 'default' : 'secondary'}
              disabled={!resolution.trim()}
            >
              {resolveAction === 'resolve' ? 'Mark Resolved' : 'Dismiss Report'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
