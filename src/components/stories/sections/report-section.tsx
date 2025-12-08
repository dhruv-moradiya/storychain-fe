import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { fadeIn } from '@/lib/utils';
import { generateFakeReports, type Report } from '@/mock-data/reports';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  FileText,
  Flag,
  ListFilter,
  MessageSquare,
  Search,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { ReportTable } from './reports-section';

export default function ReportSection() {
  const [typeFilter, setTypeFilter] = useState<'ALL' | Report['targetType']>('ALL');
  const [query, setQuery] = useState('');

  const reports: Report[] = generateFakeReports(50);

  const filtered = reports.filter((r) => {
    const matchType = typeFilter === 'ALL' || r.targetType === typeFilter;
    const matchQuery =
      r.message?.toLowerCase().includes(query.toLowerCase()) ||
      r.reason.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  const iconForTarget = (t: Report['targetType']) => {
    switch (t) {
      case 'story':
        return <FileText size={14} />;
      case 'chapter':
        return <BookOpen size={14} />;
      case 'comment':
        return <MessageSquare size={14} />;
      case 'user':
        return <User size={14} />;
      default:
        return <Flag size={14} />;
    }
  };

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-6xl space-y-6 pb-14">
      {/* ================= Back Button ================= */}
      <Button
        variant="outline"
        size="sm"
        className="flex cursor-pointer items-center gap-2 shadow-sm"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </Button>

      {/* ================= HEADER ================= */}
      <div className="bg-card flex items-center justify-between rounded-md border-b px-5 py-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium">
          <AlertTriangle size={16} className="text-red-600" />
          <span className="text-foreground">{filtered.length} Reports</span>
        </div>
      </div>

      {/* ================= FILTER BAR ================= */}
      <motion.div
        {...fadeIn(0.15)}
        className="bg-muted/40 flex items-center gap-3 rounded-md border px-5 py-3 shadow-sm"
      >
        {/* Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-muted-foreground/30 flex items-center gap-2 text-xs"
            >
              <ListFilter size={14} />
              <span className="capitalize">
                {typeFilter === 'ALL' ? 'Filter: All Types' : `Type: ${typeFilter}`}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-32 text-xs">
            <DropdownMenuItem onClick={() => setTypeFilter('ALL')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter('story')}>Story</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter('chapter')}>Chapter</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter('comment')}>Comment</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter('user')}>User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className="relative ml-auto w-72">
          <Search
            size={14}
            className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2"
          />
          <Input
            placeholder="Search reports..."
            className="border-muted-foreground/30 rounded-md pl-8 text-xs"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* ================= REPORT LIST ================= */}
      <motion.div {...fadeIn(0.2)} className="divide-border bg-card divide-y rounded-md">
        {/* {filtered.map((rep) => (
          <div key={rep.id} className="hover:bg-muted/30 cursor-pointer px-5 py-4 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{iconForTarget(rep.targetType)}</span>

                  <span className="font-medium capitalize">{rep.reason}</span>

                  <Badge
                    variant="outline"
                    className="text-muted-foreground border-muted-foreground/40 rounded-full px-2 py-0.5 text-[10px] capitalize"
                  >
                    {rep.targetType}
                  </Badge>
                </div>

                <p className="text-muted-foreground truncate text-xs">{rep.message}</p>
              </div>

              <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                <Clock size={14} />
                <span>{timeAgo(rep.createdAt)}</span>
              </div>
            </div>
          </div>
        ))} */}
        <ReportTable data={filtered} />
      </motion.div>
    </motion.section>
  );
}

/* ------------------------------
   Time Ago Formatter
------------------------------- */
function timeAgo(date: Date) {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
