import { motion } from 'framer-motion';
import { Users, Crown, Pen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { IStoryCollaboratorInfo } from '@/type/story';

interface CollaboratorsPreviewProps {
  owner?: IStoryCollaboratorInfo;
  collaborators: IStoryCollaboratorInfo[];
  onOwnerClick: (clerkId: string) => void;
  onCollaboratorClick: (clerkId: string) => void;
  onViewAll: () => void;
}

const roleConfig: Record<string, { icon: typeof Crown; color: string; bg: string }> = {
  OWNER: { icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
  CO_AUTHOR: { icon: Pen, color: 'text-purple-600', bg: 'bg-purple-500/10' },
  MODERATOR: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  REVIEWER: { icon: Users, color: 'text-green-600', bg: 'bg-green-500/10' },
  CONTRIBUTOR: { icon: Users, color: 'text-gray-600', bg: 'bg-gray-500/10' },
};

export function CollaboratorsPreview({
  owner,
  collaborators,
  onOwnerClick,
  onCollaboratorClick,
  onViewAll,
}: CollaboratorsPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
        <Users size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
        Creators & Collaborators
      </h2>

      {/* Owner Card */}
      {owner && (
        <div
          onClick={() => onOwnerClick(owner.clerkId)}
          className="border-border/50 hover:border-brand-pink-500/50 flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition sm:gap-4 sm:p-4"
        >
          <div className="relative">
            <img
              src={'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg'}
              alt={owner.username}
              className="h-10 w-10 rounded-full border-2 border-yellow-500/50 object-cover sm:h-12 sm:w-12"
            />
            <div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 shadow-sm sm:h-5 sm:w-5">
              <Crown size={10} className="text-white sm:h-3 sm:w-3" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-text-primary truncate text-sm font-medium sm:text-base">
                @{owner.username}
              </span>
              <span className="rounded-md bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-medium text-yellow-600 sm:px-2 sm:text-xs">
                Owner
              </span>
            </div>
            <p className="text-text-secondary-65 hidden text-xs sm:block">
              Building worlds one chapter at a time
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10 hidden text-xs sm:inline-flex"
          >
            Following ✓
          </Button>
        </div>
      )}

      {/* Collaborators Grid */}
      <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 sm:-mx-0 sm:gap-3 sm:px-0">
        {collaborators.slice(0, 3).map((collab) => {
          const config = roleConfig[collab.role] || roleConfig.CONTRIBUTOR;
          const Icon = config.icon;

          return (
            <div
              key={collab.clerkId}
              onClick={() => onCollaboratorClick(collab.clerkId)}
              className="border-border/50 hover:border-brand-pink-500/50 min-w-[120px] cursor-pointer rounded-xl border p-2.5 transition sm:min-w-[140px] sm:p-3"
            >
              <div className="flex items-center gap-2">
                <img
                  src={'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg'}
                  alt={collab.username}
                  className="h-7 w-7 rounded-full border-2 object-cover sm:h-8 sm:w-8"
                />
                <span className="text-text-primary truncate text-xs font-medium sm:text-sm">
                  @{collab.username}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className={cn('flex h-5 w-5 items-center justify-center rounded', config.bg)}>
                  <Icon size={12} className={config.color} />
                </div>
                <span className={cn('text-[10px] font-medium sm:text-xs', config.color)}>
                  {collab.role.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          );
        })}

        {collaborators.length > 3 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={onViewAll}
            className="border-brand-pink-500/30 bg-brand-pink-500/5 text-brand-pink-500 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 flex min-w-[80px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed p-2.5 transition sm:min-w-[100px] sm:p-3"
          >
            <span className="text-base font-bold sm:text-lg">+{collaborators.length - 3}</span>
            <span className="text-[10px] sm:text-xs">more</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
