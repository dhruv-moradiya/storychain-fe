import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ExpandedState,
} from '@tanstack/react-table';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  Flag,
  GitBranch,
  GitMerge,
  MessageSquare,
  Minus,
  Trash,
  XCircle,
} from 'lucide-react';

import { fadeIn } from '@/lib/utils';
import { chaptersData, type IChapter } from '@/mock-data/chapters';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
const columnHelper = createColumnHelper<IChapter>();

function expandAllRows(rows: IChapter[], path: string[] = [], acc: ExpandedState = {}) {
  rows.forEach((_row, idx) => {
    const rowId = [...path, String(idx)].join('.');

    (acc as Record<string, boolean>)[rowId] = true;

    // if (row.childChapters?.length) {
    //   expandAllRows(row.childChapters, [...path, String(idx)], acc);
    // }
  });

  return acc;
}

export default function ChaptersSection() {
  const [data] = useState(() => [...chaptersData]);
  const [expanded, setExpanded] = useState<ExpandedState>(() => expandAllRows(chaptersData));

  const columns = useMemo(
    () => [
      // =============== Expand Button ===============
      columnHelper.display({
        id: 'expand',
        header: ({ table }) => (
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <button
              onClick={table.getToggleAllRowsExpandedHandler()}
              className="border-border hover:bg-muted flex h-6 w-6 items-center justify-center rounded border transition"
            >
              {table.getIsAllRowsExpanded() ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
            Expand
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center" style={{ paddingLeft: `${row.depth * 0.85}rem` }}>
            {row.getCanExpand() ? (
              <button
                onClick={row.getToggleExpandedHandler()}
                className="hover:bg-muted flex h-6 w-6 items-center justify-center rounded transition"
              >
                {row.getIsExpanded() ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <span className="text-muted-foreground pl-2 text-xs">•</span>
            )}
          </div>
        ),
      }),

      // =============== BASIC DATA ===============
      columnHelper.accessor('chapterNumber', {
        header: 'No.',
        cell: (info) => (
          <span className="text-muted-foreground text-xs font-medium">
            {info.getValue() ?? '-'}
          </span>
        ),
      }),

      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => (
          <span className="text-secondary cursor-pointer text-sm font-medium hover:underline">
            {info.getValue()}
          </span>
        ),
      }),

      columnHelper.accessor('authorId', {
        header: 'Author',
        cell: (info) => (
          <span className="text-muted-foreground text-xs font-normal">{info.getValue()}</span>
        ),
      }),

      // =============== STATUS (GitHub badge style) ===============
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const value = info.getValue();

          const badgeBase =
            'text-xs px-2 py-0.5 rounded-full border border-border bg-muted flex items-center gap-1 w-fit';

          return (
            <span className={badgeBase}>
              {value === 'PUBLISHED' && <CheckCircle size={12} className="text-green-600" />}
              {value === 'PENDING_APPROVAL' && <Clock size={12} className="text-yellow-600" />}
              {value === 'REJECTED' && <XCircle size={12} className="text-red-600" />}
              {value === 'DELETED' && <Trash size={12} className="text-red-600" />}
              {value}
            </span>
          );
        },
      }),

      // =============== VOTES (GitHub minimal icons) ===============
      columnHelper.display({
        id: 'votes',
        header: 'Votes',
        cell: ({ row }) => {
          const { upvotes, downvotes, score } = row.original.votes;

          return (
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-green-700">
                <ArrowUp size={14} /> {upvotes}
              </span>
              <span className="flex items-center gap-1 text-red-700">
                <ArrowDown size={14} /> {downvotes}
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <BarChart2 size={14} /> {score}
              </span>
            </div>
          );
        },
      }),

      // =============== STATS (GitHub Issue-style subtle icons) ===============
      columnHelper.display({
        id: 'stats',
        header: 'Stats',
        cell: ({ row }) => {
          const s = row.original.stats;

          return (
            <div className="text-muted-foreground flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Eye size={14} /> {s.reads}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} /> {s.comments}
              </span>
              <span className="flex items-center gap-1">
                <GitBranch size={14} /> {s.childBranches}
              </span>
            </div>
          );
        },
      }),

      // =============== PR BADGE (GitHub pull request style) ===============
      columnHelper.display({
        id: 'pullRequest',
        header: 'PR',
        cell: ({ row }) => {
          const pr = row.original.pullRequest;

          if (!pr.isPR) return <span className="text-muted-foreground text-xs">—</span>;

          const icon =
            pr.status === 'APPROVED' ? (
              <CheckCircle size={14} className="text-green-600" />
            ) : pr.status === 'PENDING' ? (
              <Clock size={14} className="text-yellow-600" />
            ) : pr.status === 'REJECTED' ? (
              <XCircle size={14} className="text-red-600" />
            ) : (
              <GitMerge size={14} className="text-purple-600" />
            );

          return (
            <div className="flex flex-col text-xs">
              <span className="text-muted-foreground font-mono">#{pr.prId}</span>
              <span className="border-border bg-muted flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[11px]">
                {icon}
                {pr.status}
              </span>
            </div>
          );
        },
      }),

      // =============== REPORTS + FLAG (clean GitHub style) ===============
      columnHelper.accessor('reportCount', {
        header: 'Reports',
        cell: (info) => (
          <div className="flex items-center gap-1 text-xs text-red-600">
            <AlertTriangle size={14} /> {info.getValue()}
          </div>
        ),
      }),

      columnHelper.accessor('isFlagged', {
        header: 'Flag',
        cell: (info) =>
          info.getValue() ? (
            <Flag size={14} className="text-red-600" />
          ) : (
            <Minus size={12} className="text-muted-foreground" />
          ),
      }),

      // =============== CHILD COUNT ===============
      columnHelper.accessor('childChapters', {
        header: 'Children',
        cell: (info) => <span className="text-sm font-medium">{info.getValue().length}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.childChapters,
  });

  return (
    <motion.section {...fadeIn(0)} className="mx-auto max-w-6xl space-y-10 pb-14">
      <Button variant="outline" size="sm" className="flex cursor-pointer items-center gap-2">
        <ArrowLeft size={16} />
        <span>Back</span>
      </Button>

      <motion.div {...fadeIn(0.15)} className="rounded-xl border shadow-sm">
        <Table>
          {/* <TableCaption className="mb-3">Chapter hierarchy view.</TableCaption> */}

          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-3 text-sm">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="hover:bg-muted/30 border-b"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </motion.section>
  );
}
