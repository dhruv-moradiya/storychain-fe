import { useMemo } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Clock, MessageSquare, BookOpen, User, FileText, Flag } from 'lucide-react';
import type { Report } from '@/mock-data/reports';

export default function ReportTable({ data }: { data: Report[] }) {
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

  const columns = useMemo<ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: 'reason',
        header: () => <span className="text-xs font-medium">Reason</span>,
        cell: ({ row }) => {
          const rep = row.original;
          return (
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
          );
        },
      },

      {
        accessorKey: 'message',
        header: () => <span className="text-xs font-medium">Message</span>,
        cell: ({ getValue }) => (
          <p className="text-muted-foreground max-w-xs truncate text-xs">{String(getValue())}</p>
        ),
      },

      {
        accessorKey: 'createdAt',
        header: () => <span className="text-xs font-medium">Reported</span>,
        cell: ({ row }) => {
          const date = row.original.createdAt;
          return (
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <Clock size={14} />
              <span>{timeAgo(date)}</span>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="rounded-md shadow-sm">
      <TableHeader className="bg-muted/40">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="h-9">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="px-4 py-2 text-xs font-medium">
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
          <TableRow key={row.id} className="hover:bg-muted/30 cursor-pointer transition">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="px-5 py-4 align-middle">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ------------------------------
   Time Ago Helper
------------------------------- */
function timeAgo(date: Date) {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
