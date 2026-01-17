import type { IStoryCollaboratorWithUser } from '@/type/story';
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

import {
  CheckCircle,
  Clock,
  Crown,
  Eye,
  Handshake,
  MoreHorizontal,
  PenTool,
  Shield,
  XCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { createBadge } from '@/components/common/badge';
import type { BadgeColorKey } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ICollaboratorTableProps {
  data: IStoryCollaboratorWithUser[];
  search: string;
}

const columnHelper = createColumnHelper<IStoryCollaboratorWithUser>();

// Role configuration with icons and colors
const ROLE_CONFIG: Record<string, { icon: typeof Crown; color: BadgeColorKey; label: string }> = {
  OWNER: { icon: Crown, color: 'amber', label: 'Owner' },
  CO_AUTHOR: { icon: PenTool, color: 'purple', label: 'Co-Author' },
  MODERATOR: { icon: Shield, color: 'blue', label: 'Moderator' },
  REVIEWER: { icon: Eye, color: 'cyan', label: 'Reviewer' },
  CONTRIBUTOR: { icon: Handshake, color: 'gray', label: 'Contributor' },
};

// Status configuration
const STATUS_CONFIG: Record<
  string,
  { icon: typeof CheckCircle; color: BadgeColorKey; label: string }
> = {
  ACCEPTED: { icon: CheckCircle, color: 'success', label: 'Accepted' },
  PENDING: { icon: Clock, color: 'warning', label: 'Pending' },
  DECLINED: { icon: XCircle, color: 'error', label: 'Declined' },
  REMOVED: { icon: XCircle, color: 'gray', label: 'Removed' },
};

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
        header: 'Collaborator',
        cell: ({ row }) => {
          const collaborator = row.original;
          const roleConfig = ROLE_CONFIG[collaborator.role];

          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={collaborator.user.avatarUrl} alt={collaborator.user.username} />
                <AvatarFallback className="bg-brand-blue/10 text-brand-blue font-medium">
                  {collaborator.user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-text-primary text-sm font-semibold">
                    @{collaborator.user.username}
                  </span>
                  {roleConfig && (
                    <roleConfig.icon
                      className={cn(
                        'h-4 w-4',
                        collaborator.role === 'OWNER' && 'text-amber-500',
                        collaborator.role === 'CO_AUTHOR' && 'text-purple-500',
                        collaborator.role === 'MODERATOR' && 'text-blue-500',
                        collaborator.role === 'REVIEWER' && 'text-cyan-500',
                        collaborator.role === 'CONTRIBUTOR' && 'text-gray-500'
                      )}
                    />
                  )}
                </div>
                <span className="text-text-secondary-65 text-xs">
                  Joined {formatDate(collaborator.invitedAt)}
                </span>
              </div>
            </div>
          );
        },
      }),

      // ========== ROLE ==============
      columnHelper.accessor('role', {
        header: 'Role',
        cell: (info) => {
          const value = info.getValue();
          const config = ROLE_CONFIG[value];

          if (!config) return null;

          return createBadge({
            label: config.label,
            icon: config.icon,
            color: config.color,
            size: 'sm',
            shape: 'pill',
            style: 'soft',
          });
        },
      }),

      // ========== STATUS ==============
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          const config = STATUS_CONFIG[status];

          if (!config) return null;

          return createBadge({
            label: config.label,
            icon: config.icon,
            color: config.color,
            size: 'sm',
            shape: 'pill',
            style: 'soft',
          });
        },
      }),

      // ========== CONTRIBUTIONS ==============
      columnHelper.display({
        id: 'contributions',
        header: 'Contributions',
        cell: () => {
          // const collaborator = row.original;
          // Mock contribution count - would come from API in real app
          const contributions = Math.floor(Math.random() * 20);

          return <span className="text-text-secondary-65 text-sm">{contributions} chapters</span>;
        },
      }),

      // ========== LAST ACTIVE ==============
      columnHelper.display({
        id: 'lastActive',
        header: 'Last Active',
        cell: ({ row }) => {
          const collaborator = row.original;

          return (
            <span className="text-text-secondary-65 text-sm">
              {formatRelativeTime(collaborator.updatedAt ?? collaborator.invitedAt)}
            </span>
          );
        },
      }),

      // ========== ACTIONS ==============
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: ({ row }) => {
          const collaborator = row.original;

          // Don't show actions for owner
          if (collaborator.role === 'OWNER') return null;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-secondary-65 hover:text-text-primary h-8 w-8"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Change Role</DropdownMenuItem>
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Remove Collaborator
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="border-border/50 overflow-hidden rounded-xl border"
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted/30 hover:bg-muted/30 border-border/30 border-b"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-text-secondary-65 px-4 py-3 text-xs font-semibold tracking-wider uppercase"
                >
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
              className="group hover:bg-muted/30 border-border/30 border-b transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="px-4 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </motion.tr>
          ))}
        </TableBody>
      </Table>

      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-text-secondary-65 text-sm">
            No collaborators found matching "{search}"
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CollaboratorTable;

/* ------------------------------
   Date Formatters
------------------------------ */
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}
