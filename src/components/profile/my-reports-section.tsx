import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Flag,
  Scale,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  FileText,
  MessageSquare,
  Users,
  BookOpen,
  ExternalLink,
  Info,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import AppealDialog from '@/components/common/appeal-dialog';

// Types
type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
type ReportType = 'CHAPTER' | 'COMMENT' | 'USER' | 'STORY';
type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'COPYRIGHT'
  | 'OFF_TOPIC'
  | 'OTHER';

type AppealStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';

interface MyReport {
  id: string;
  reportType: ReportType;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt?: Date;
  relatedTitle: string;
  relatedId: string;
  resolution?: string;
  reviewedAt?: Date;
}

interface MyAppeal {
  id: string;
  banId: string;
  banReason: string;
  bannedAt: Date;
  appealReason: string;
  explanation: string;
  status: AppealStatus;
  createdAt: Date;
  updatedAt?: Date;
  reviewerNotes?: string;
  decision?: string;
}

// Mock data
const mockReports: MyReport[] = [
  {
    id: '1',
    reportType: 'COMMENT',
    reason: 'HARASSMENT',
    description: 'This comment contains offensive language and personal attacks.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    relatedTitle: 'Comment on "The Lost City"',
    relatedId: 'comment_123',
    resolution: 'The comment has been removed and the user has been warned.',
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    id: '2',
    reportType: 'CHAPTER',
    reason: 'COPYRIGHT',
    description: 'This chapter appears to be plagiarized from a published novel.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    relatedTitle: 'Chapter 3: The Beginning',
    relatedId: 'chapter_456',
  },
  {
    id: '3',
    reportType: 'STORY',
    reason: 'INAPPROPRIATE_CONTENT',
    description: 'Story contains explicit content without proper age rating.',
    status: 'REVIEWED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    relatedTitle: 'Dark Secrets',
    relatedId: 'story_789',
  },
  {
    id: '4',
    reportType: 'USER',
    reason: 'SPAM',
    description: 'User is posting promotional links in every comment.',
    status: 'DISMISSED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    relatedTitle: 'User: spammer123',
    relatedId: 'user_spam',
    resolution: 'After review, the reported behavior did not violate our guidelines.',
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
  },
];

const mockAppeals: MyAppeal[] = [
  {
    id: '1',
    banId: 'ban_001',
    banReason: 'Repeated harassment in comments',
    bannedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    appealReason: 'MISUNDERSTANDING',
    explanation:
      'I was having a heated discussion but never intended to harass anyone. I apologize if my words were interpreted that way.',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    reviewerNotes: 'After reviewing the context, the ban has been lifted with a warning.',
    decision: 'Ban lifted. Please be mindful of your tone in future discussions.',
  },
  {
    id: '2',
    banId: 'ban_002',
    banReason: 'Posting copyrighted content',
    bannedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    appealReason: 'WRONGFUL_BAN',
    explanation:
      'The content I posted was my own original work. I can provide proof of authorship.',
    status: 'UNDER_REVIEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];

// Status configurations
const reportStatusConfig: Record<
  ReportStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
  },
  REVIEWED: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Eye,
  },
  RESOLVED: {
    label: 'Resolved',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  DISMISSED: {
    label: 'Dismissed',
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: XCircle,
  },
};

const appealStatusConfig: Record<
  AppealStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Eye,
  },
  APPROVED: {
    label: 'Approved',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

const reportTypeConfig: Record<ReportType, { label: string; icon: typeof FileText }> = {
  CHAPTER: { label: 'Chapter', icon: FileText },
  COMMENT: { label: 'Comment', icon: MessageSquare },
  USER: { label: 'User', icon: Users },
  STORY: { label: 'Story', icon: BookOpen },
};

export function MyReportsSection() {
  const [reports] = useState(mockReports);
  const [appeals] = useState(mockAppeals);
  const [reportFilter, setReportFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [appealFilter, setAppealFilter] = useState<AppealStatus | 'ALL'>('ALL');

  const filteredReports = reports.filter(
    (r) => reportFilter === 'ALL' || r.status === reportFilter
  );

  const filteredAppeals = appeals.filter(
    (a) => appealFilter === 'ALL' || a.status === appealFilter
  );

  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter((r) => r.status === 'PENDING' || r.status === 'REVIEWED').length,
    resolvedReports: reports.filter((r) => r.status === 'RESOLVED').length,
    totalAppeals: appeals.length,
    pendingAppeals: appeals.filter((a) => a.status === 'PENDING' || a.status === 'UNDER_REVIEW')
      .length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">My Reports & Appeals</h1>
        <p className="text-muted-foreground text-sm">
          Track the status of reports you've submitted and any ban appeals
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <Flag className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalReports}</p>
                <p className="text-muted-foreground text-sm">Total Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-yellow-500/10 p-3">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pendingReports}</p>
                <p className="text-muted-foreground text-sm">Pending Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-500/10 p-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.resolvedReports}</p>
                <p className="text-muted-foreground text-sm">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-purple-500/10 p-3">
                <Scale className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalAppeals}</p>
                <p className="text-muted-foreground text-sm">Appeals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports" className="gap-2">
            <Flag className="h-4 w-4" />
            My Reports
            {stats.pendingReports > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {stats.pendingReports}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="appeals" className="gap-2">
            <Scale className="h-4 w-4" />
            My Appeals
            {stats.pendingAppeals > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {stats.pendingAppeals}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Reports You've Submitted</CardTitle>
                  <CardDescription>Track the status of content you've reported</CardDescription>
                </div>
                <Select
                  value={reportFilter}
                  onValueChange={(v) => setReportFilter(v as ReportStatus | 'ALL')}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Reports</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REVIEWED">Under Review</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="DISMISSED">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filteredReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                  {filteredReports.length === 0 && (
                    <EmptyState
                      icon={Flag}
                      title="No reports found"
                      description={
                        reportFilter === 'ALL'
                          ? "You haven't submitted any reports yet"
                          : `No reports with status "${reportStatusConfig[reportFilter as ReportStatus].label}"`
                      }
                    />
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appeals Tab */}
        <TabsContent value="appeals" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Your Ban Appeals</CardTitle>
                  <CardDescription>Track the status of appeals you've submitted</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={appealFilter}
                    onValueChange={(v) => setAppealFilter(v as AppealStatus | 'ALL')}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Appeals</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <AppealDialog
                    trigger={
                      <Button size="sm" className="gap-2">
                        <Scale className="h-4 w-4" />
                        New Appeal
                      </Button>
                    }
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filteredAppeals.map((appeal) => (
                    <AppealCard key={appeal.id} appeal={appeal} />
                  ))}
                  {filteredAppeals.length === 0 && (
                    <EmptyState
                      icon={Scale}
                      title="No appeals found"
                      description={
                        appealFilter === 'ALL'
                          ? "You haven't submitted any appeals"
                          : `No appeals with status "${appealStatusConfig[appealFilter as AppealStatus].label}"`
                      }
                    />
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Appeal Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5" />
                About Appeals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground space-y-4 text-sm">
                <p>
                  If you believe your account was banned unfairly, you can submit an appeal for
                  review by our moderation team.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-foreground mb-1 font-medium">Response Time</p>
                    <p>Appeals are typically reviewed within 48-72 hours.</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-foreground mb-1 font-medium">One Appeal Per Ban</p>
                    <p>You can only submit one appeal per ban. Make it count!</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-foreground mb-1 font-medium">Provide Evidence</p>
                    <p>Include any relevant context or evidence to support your case.</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-foreground mb-1 font-medium">Final Decision</p>
                    <p>The moderation team's decision after review is final.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ReportCardProps {
  report: MyReport;
}

function ReportCard({ report }: ReportCardProps) {
  const statusInfo = reportStatusConfig[report.status];
  const typeInfo = reportTypeConfig[report.reportType];
  const StatusIcon = statusInfo.icon;
  const TypeIcon = typeInfo.icon;

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <TypeIcon className="h-3 w-3" />
            {typeInfo.label}
          </Badge>
          <Badge variant="secondary">{report.reason.replace(/_/g, ' ')}</Badge>
          <Badge variant="outline" className={cn('gap-1', statusInfo.color)}>
            <StatusIcon className="h-3 w-3" />
            {statusInfo.label}
          </Badge>
        </div>
        <span className="text-muted-foreground shrink-0 text-xs">
          {formatDistanceToNow(report.createdAt, { addSuffix: true })}
        </span>
      </div>

      <p className="mb-1 flex items-center gap-2 text-sm font-medium">
        {report.relatedTitle}
        <ExternalLink className="text-muted-foreground h-3 w-3" />
      </p>
      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">{report.description}</p>

      {/* Resolution (if any) */}
      {report.resolution && (
        <div className="bg-muted/50 mt-3 rounded-lg p-3">
          <p className="mb-1 flex items-center gap-1 text-xs font-medium">
            <CheckCircle className="h-3 w-3 text-green-500" />
            Resolution
          </p>
          <p className="text-muted-foreground text-sm">{report.resolution}</p>
          {report.reviewedAt && (
            <p className="text-muted-foreground mt-1 text-xs">
              Reviewed {formatDistanceToNow(report.reviewedAt, { addSuffix: true })}
            </p>
          )}
        </div>
      )}

      {/* Pending Status Message */}
      {report.status === 'PENDING' && (
        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/20">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Your report is in the queue and will be reviewed by our moderation team soon.
          </p>
        </div>
      )}

      {report.status === 'REVIEWED' && (
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/20">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            A moderator is currently investigating your report.
          </p>
        </div>
      )}
    </div>
  );
}

interface AppealCardProps {
  appeal: MyAppeal;
}

function AppealCard({ appeal }: AppealCardProps) {
  const statusInfo = appealStatusConfig[appeal.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn('gap-1', statusInfo.color)}>
            <StatusIcon className="h-3 w-3" />
            {statusInfo.label}
          </Badge>
          <Badge variant="secondary">{appeal.appealReason.replace(/_/g, ' ')}</Badge>
        </div>
        <span className="text-muted-foreground text-xs">
          {formatDistanceToNow(appeal.createdAt, { addSuffix: true })}
        </span>
      </div>

      {/* Ban Info */}
      <div className="bg-destructive/5 border-destructive/20 mb-3 rounded-lg border p-3">
        <p className="text-destructive mb-1 text-xs font-medium">Original Ban Reason</p>
        <p className="text-sm">{appeal.banReason}</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Banned on {appeal.bannedAt.toLocaleDateString()}
        </p>
      </div>

      {/* Appeal Explanation */}
      <div className="mb-3">
        <p className="mb-1 text-xs font-medium">Your Explanation</p>
        <p className="text-muted-foreground line-clamp-3 text-sm">{appeal.explanation}</p>
      </div>

      {/* Decision (if any) */}
      {appeal.decision && (
        <div
          className={cn(
            'mt-3 rounded-lg p-3',
            appeal.status === 'APPROVED'
              ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
              : 'border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
          )}
        >
          <p
            className={cn(
              'mb-1 text-xs font-medium',
              appeal.status === 'APPROVED'
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
            )}
          >
            {appeal.status === 'APPROVED' ? 'Appeal Approved' : 'Appeal Rejected'}
          </p>
          <p
            className={cn(
              'text-sm',
              appeal.status === 'APPROVED'
                ? 'text-green-700 dark:text-green-300'
                : 'text-red-700 dark:text-red-300'
            )}
          >
            {appeal.decision}
          </p>
          {appeal.updatedAt && (
            <p className="text-muted-foreground mt-1 text-xs">
              Decided {formatDistanceToNow(appeal.updatedAt, { addSuffix: true })}
            </p>
          )}
        </div>
      )}

      {/* Pending Status Message */}
      {appeal.status === 'PENDING' && (
        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950/20">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Your appeal is waiting to be assigned to a moderator for review.
          </p>
        </div>
      )}

      {appeal.status === 'UNDER_REVIEW' && (
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/20">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            A moderator is currently reviewing your appeal. You'll be notified of the decision.
          </p>
        </div>
      )}

      {/* View Details Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mt-3 gap-2">
            <Eye className="h-4 w-4" />
            View Full Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Appeal Details</DialogTitle>
            <DialogDescription>
              Submitted {formatDistanceToNow(appeal.createdAt, { addSuffix: true })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="mb-1 text-sm font-medium">Status</p>
              <Badge variant="outline" className={cn('gap-1', statusInfo.color)}>
                <StatusIcon className="h-3 w-3" />
                {statusInfo.label}
              </Badge>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Ban Reason</p>
              <p className="text-muted-foreground text-sm">{appeal.banReason}</p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Appeal Reason</p>
              <p className="text-muted-foreground text-sm">
                {appeal.appealReason.replace(/_/g, ' ')}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Your Explanation</p>
              <p className="text-muted-foreground text-sm">{appeal.explanation}</p>
            </div>
            {appeal.decision && (
              <div>
                <p className="mb-1 text-sm font-medium">Decision</p>
                <p className="text-muted-foreground text-sm">{appeal.decision}</p>
              </div>
            )}
            {appeal.reviewerNotes && (
              <div>
                <p className="mb-1 text-sm font-medium">Reviewer Notes</p>
                <p className="text-muted-foreground text-sm">{appeal.reviewerNotes}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface EmptyStateProps {
  icon: typeof Flag;
  title: string;
  description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <Icon className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default MyReportsSection;
