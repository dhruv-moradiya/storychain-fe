import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, CheckCircle, Clock, Eye, FileText, Users } from 'lucide-react';
import type { Report, ReportStatus, ReportType } from '../admin.types';

const reportStatusConfig: Record<
  ReportStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  REVIEWED: { label: 'Reviewed', color: 'bg-blue-100 text-blue-800', icon: Eye },
  RESOLVED: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  DISMISSED: { label: 'Dismissed', color: 'bg-slate-100 text-slate-800', icon: AlertTriangle },
};

const reportTypeConfig: Record<ReportType, { label: string; icon: typeof FileText }> = {
  CHAPTER: { label: 'Chapter', icon: FileText },
  COMMENT: { label: 'Comment', icon: FileText },
  USER: { label: 'User', icon: Users },
  STORY: { label: 'Story', icon: FileText },
};

interface ReportCardProps {
  report: Report;
  onAction: (reportId: string, action: ReportStatus) => void;
}

export function ReportCard({ report, onAction }: ReportCardProps) {
  const statusInfo = reportStatusConfig[report.status];
  const typeInfo = reportTypeConfig[report.reportType];
  const StatusIcon = statusInfo.icon;
  const TypeIcon = typeInfo.icon;

  return (
    <div className="border-border/50 bg-cream-95/50 hover:border-brand-pink-500/30 hover:bg-cream-95 rounded-lg border p-4 transition-colors">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <TypeIcon className="h-3 w-3" />
            {typeInfo.label}
          </Badge>
          <Badge variant="secondary">{report.reason.replace('_', ' ')}</Badge>
          <Badge className={statusInfo.color}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusInfo.label}
          </Badge>
        </div>
        <span className="text-text-secondary-65 text-xs">
          {formatDistanceToNow(report.createdAt, { addSuffix: true })}
        </span>
      </div>

      <p className="text-text-primary mb-1 text-sm font-medium">{report.relatedTitle}</p>
      <p className="text-text-secondary-65 mb-3 text-sm">{report.description}</p>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-text-secondary-65 text-xs">Reported by: {report.reporterName}</p>

        {report.status === 'PENDING' && (
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction(report.id, 'REVIEWED')}>
              <Eye className="mr-1 h-4 w-4" />
              Review
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction(report.id, 'DISMISSED')}>
              Dismiss
            </Button>
            <Button size="sm" onClick={() => onAction(report.id, 'RESOLVED')}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Resolve
            </Button>
          </div>
        )}

        {report.status === 'REVIEWED' && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction(report.id, 'DISMISSED')}>
              Dismiss
            </Button>
            <Button size="sm" onClick={() => onAction(report.id, 'RESOLVED')}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Resolve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
