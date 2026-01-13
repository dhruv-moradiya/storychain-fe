import { ShieldCheck, AlertTriangle, Ban, CheckCircle } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    totalModerators: number;
    pendingReports: number;
    bannedUsers: number;
    resolvedToday: number;
  };
}

export function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <ShieldCheck className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-text-primary text-xl font-bold">{stats.totalModerators}</p>
            <p className="text-text-secondary-65 text-xs">Moderators</p>
          </div>
        </div>
      </div>

      <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-500/10 p-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-500">{stats.pendingReports}</p>
            <p className="text-text-secondary-65 text-xs">Pending</p>
          </div>
        </div>
      </div>

      <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-red-500/10 p-2">
            <Ban className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-red-500">{stats.bannedUsers}</p>
            <p className="text-text-secondary-65 text-xs">Banned</p>
          </div>
        </div>
      </div>

      <div className="border-border/50 bg-cream-95 rounded-xl border p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-500/10 p-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xl font-bold text-green-500">{stats.resolvedToday}</p>
            <p className="text-text-secondary-65 text-xs">Resolved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
