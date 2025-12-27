import type { IStoryCollaboratorWithUser } from '@/type/story.type';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CheckCircle, Clock, MinusCircle, Reply, ShieldCheck, User, XCircle } from 'lucide-react';

import { cn, fadeIn } from '@/lib/utils';
import { motion } from 'framer-motion';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ICollaboratorTableProps {
  data: IStoryCollaboratorWithUser[];
  search: string;
}

const columnHelper = createColumnHelper<IStoryCollaboratorWithUser>();

const CollaboratorTable = ({ data, search }: ICollaboratorTableProps) => {
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((d) => d.user.username.toLowerCase().includes(search.toLowerCase()));
  }, [search, data]);

  const columns = useMemo(
    () => [
      // ========== USER INFO ==============
      columnHelper.display({
        id: 'user',
        header: 'User',
        cell: ({ row }) => {
          const collaborator = row.original;

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-3">
                    <div className="bg-muted text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full">
                      <User size={16} />
                    </div>

                    <div className="flex flex-col leading-snug">
                      <span className="text-sm font-medium capitalize">
                        {collaborator.user.username}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>

                <TooltipContent className="text-xs">
                  <p className="capitalize">User ID: {collaborator.user.username}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
      }),

      // ========== ROLE ==============
      columnHelper.accessor('role', {
        header: 'Role',
        cell: (info) => {
          const value = info.getValue();

          const ROLE_STYLES: Record<string, string> = {
            OWNER: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-600/30',
            CO_AUTHOR: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-600/30',
            MODERATOR: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-600/40',
            REVIEWER: 'bg-green-500/15 text-green-700 dark:text-green-300 border-green-600/30',
            CONTRIBUTOR: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-600/30',
          };

          return (
            <span
              className={cn(
                'cursor-pointer rounded-full border px-2 py-0.5 text-[11px] font-medium shadow-sm',
                ROLE_STYLES[value]
              )}
            >
              {value.replace('_', ' ')}
            </span>
          );
        },
      }),

      // ========== STATUS ==============
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();

          const ICON =
            status === 'ACCEPTED' ? (
              <CheckCircle size={12} />
            ) : status === 'PENDING' ? (
              <Clock size={12} />
            ) : status === 'DECLINED' ? (
              <XCircle size={12} />
            ) : (
              <MinusCircle size={12} />
            );

          const STATUS_STYLES: Record<string, string> = {
            ACCEPTED: 'bg-green-500/15 text-green-700 dark:text-green-300 border-green-600/30',
            PENDING: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-600/30',
            DECLINED: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-600/30',
            REMOVED: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-600/30',
          };

          return (
            <span
              className={cn(
                'flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium shadow-sm',
                STATUS_STYLES[status]
              )}
            >
              {ICON}
              {status}
            </span>
          );
        },
      }),

      // ========== INVITED INFO ==============
      columnHelper.display({
        id: 'invited',
        header: 'Invited',
        cell: ({ row }) => {
          const col = row.original;

          return (
            <div className="text-muted-foreground flex flex-col gap-1 text-xs leading-snug">
              <span className="flex items-center gap-1">
                <Reply size={12} />
                by {col.invitedBy?.slice(0, 10)}...
              </span>

              <span className="flex items-center gap-1">
                <Clock size={12} />
                {formatDate(col.invitedAt)}
              </span>
            </div>
          );
        },
      }),

      // ========== ACCEPTED ==============
      columnHelper.display({
        id: 'accepted',
        header: 'Accepted',
        cell: ({ row }) => {
          const col = row.original;

          if (!col.acceptedAt) return <span className="text-muted-foreground text-xs">—</span>;

          return (
            <span className="flex items-center gap-1 text-xs text-green-700">
              <ShieldCheck size={12} />
              {formatDate(col.acceptedAt)}
            </span>
          );
        },
      }),

      // ========== UPDATED ==============
      columnHelper.accessor('updatedAt', {
        header: 'Updated',
        cell: (info) => (
          <span className="text-muted-foreground text-xs">
            {formatDate(info.getValue() ?? new Date())}
          </span>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div {...fadeIn(0.15)} className="overflow-hidden rounded-xl border shadow-sm">
      <Table>
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
          {table.getRowModel().rows.map((row, idx) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: idx * 0.03 }}
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
  );
};

export default CollaboratorTable;

/* ------------------------------
   Date Formatter
------------------------------ */
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString();
}
