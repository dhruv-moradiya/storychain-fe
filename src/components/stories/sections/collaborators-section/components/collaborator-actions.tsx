import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Crown, Eye, Handshake, PenTool, Plus, Search, Shield, Users } from 'lucide-react';

// Role filter tabs
const ROLE_FILTERS = [
  { key: 'all', label: 'All', icon: Users },
  { key: 'OWNER', label: 'Owners', icon: Crown },
  { key: 'CO_AUTHOR', label: 'Co-Authors', icon: PenTool },
  { key: 'MODERATOR', label: 'Moderators', icon: Shield },
  { key: 'REVIEWER', label: 'Reviewers', icon: Eye },
  { key: 'CONTRIBUTOR', label: 'Contributors', icon: Handshake },
] as const;

interface CollaboratorActionsProps {
  search: string;
  setSearch: (v: string) => void;
  openInvite: () => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  counts?: Record<string, number>;
}

function CollaboratorActions({
  search,
  setSearch,
  openInvite,
  activeFilter = 'all',
  onFilterChange,
  counts = {},
}: CollaboratorActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <Users className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h2 className="text-text-primary text-lg font-semibold">Collaborators</h2>
            <p className="text-text-secondary-65 text-sm">Manage your story team and permissions</p>
          </div>
        </div>

        {/* Invite Button */}
        <Button
          onClick={openInvite}
          className="bg-brand-pink-500 shadow-brand-pink-shadow25 hover:bg-brand-pink-600 text-white shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Invite Collaborator
        </Button>
      </div>

      {/* Filter Tabs and Search */}
      <div className="border-border/50 flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Role Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {ROLE_FILTERS.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.key;
            const count =
              filter.key === 'all'
                ? Object.values(counts).reduce((a, b) => a + b, 0)
                : counts[filter.key] || 0;

            return (
              <button
                key={filter.key}
                onClick={() => onFilterChange?.(filter.key)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-brand-pink-500 text-white shadow-sm'
                    : 'text-text-secondary-65 hover:text-text-primary bg-muted/50 hover:bg-muted'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{filter.label}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      'ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium',
                      isActive ? 'bg-white/20 text-white' : 'text-text-secondary-65 bg-muted'
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border/50 pl-10"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default CollaboratorActions;
