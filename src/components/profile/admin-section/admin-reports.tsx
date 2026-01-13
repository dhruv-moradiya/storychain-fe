import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import type { Report, ReportStatus } from './admin.types';
import { ReportCard } from './components/report-card';

// Mock data
const mockReports: Report[] = [
  {
    id: '1',
    reporterId: 'user1',
    reporterName: 'Alice',
    reportType: 'COMMENT',
    reason: 'HARASSMENT',
    description: 'This comment contains offensive language targeted at another user.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    relatedTitle: 'Comment on "The Lost City"',
  },
  {
    id: '2',
    reporterId: 'user2',
    reporterName: 'Bob',
    reportType: 'CHAPTER',
    reason: 'COPYRIGHT',
    description: 'This chapter appears to be copied from a published book.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    relatedTitle: 'Chapter 5: The Beginning',
  },
  {
    id: '3',
    reporterId: 'user3',
    reporterName: 'Charlie',
    reportType: 'STORY',
    reason: 'INAPPROPRIATE_CONTENT',
    description: 'Story contains explicit content without proper rating.',
    status: 'REVIEWED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    relatedTitle: 'Dark Secrets',
    assignedTo: 'sarahmod',
  },
  {
    id: '4',
    reporterId: 'user4',
    reporterName: 'Diana',
    reportType: 'USER',
    reason: 'SPAM',
    description: 'User is posting promotional links in comments.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    relatedTitle: 'User: spammer123',
  },
];

export function AdminReports() {
  const [reports, setReports] = useState(mockReports);
  const [reportFilter, setReportFilter] = useState<ReportStatus | 'ALL'>('ALL');

  const handleReportAction = (reportId: string, action: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: action } : r)));
    toast.success(`Report marked as ${action.toLowerCase()}`);
  };

  const filteredReports = reports.filter((report) => {
    return reportFilter === 'ALL' || report.status === reportFilter;
  });

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'PENDING').length,
    reviewed: reports.filter((r) => r.status === 'REVIEWED').length,
    resolved: reports.filter((r) => r.status === 'RESOLVED').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
          <p className="text-text-primary text-xl font-bold">{stats.total}</p>
          <p className="text-text-secondary-65 text-xs">Total Reports</p>
        </div>
        <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
          <p className="text-xl font-bold text-yellow-500">{stats.pending}</p>
          <p className="text-text-secondary-65 text-xs">Pending</p>
        </div>
        <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
          <p className="text-xl font-bold text-blue-500">{stats.reviewed}</p>
          <p className="text-text-secondary-65 text-xs">Reviewed</p>
        </div>
        <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
          <p className="text-xl font-bold text-green-500">{stats.resolved}</p>
          <p className="text-text-secondary-65 text-xs">Resolved</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-text-primary text-base font-semibold">Content Reports</h2>
            <p className="text-text-secondary-65 text-sm">Review and manage reported content</p>
          </div>
          <Select
            value={reportFilter}
            onValueChange={(v) => setReportFilter(v as ReportStatus | 'ALL')}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Reports</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REVIEWED">Reviewed</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="DISMISSED">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} onAction={handleReportAction} />
            ))}
            {filteredReports.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/50 mb-4 rounded-full p-4">
                  <ShieldAlert className="text-text-secondary-65 h-8 w-8" />
                </div>
                <h3 className="text-text-primary mb-1 font-medium">No reports found</h3>
                <p className="text-text-secondary-65 text-sm">All caught up!</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default AdminReports;
