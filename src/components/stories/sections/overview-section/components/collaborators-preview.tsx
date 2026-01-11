import { motion } from 'framer-motion';
import { Users, Crown, Pen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { IStoryCollaboratorInfo } from '@/type/story.type';

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
      className="space-y-4"
    >
      <h2 className="text-text-primary flex items-center gap-2 font-semibold">
        <Users size={18} className="text-brand-pink-500" />
        Creators & Collaborators
      </h2>

      {/* Owner Card */}
      {owner && (
        <div
          onClick={() => onOwnerClick(owner.clerkId)}
          className="border-border/50 hover:border-brand-pink-500/50 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition"
        >
          <div className="relative">
            <img
              src={'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg'}
              alt={owner.username}
              className="h-12 w-12 rounded-full border-2 border-yellow-500/50 object-cover"
            />
            <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 shadow-sm">
              <Crown size={12} className="text-white" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-medium">@{owner.username}</span>
              <span className="rounded-md bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600">
                Owner
              </span>
            </div>
            <p className="text-text-secondary-65 text-xs">Building worlds one chapter at a time</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10"
          >
            Following ✓
          </Button>
        </div>
      )}

      {/* Collaborators Grid */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {collaborators.slice(0, 3).map((collab) => {
          const config = roleConfig[collab.role] || roleConfig.CONTRIBUTOR;
          const Icon = config.icon;

          return (
            <div
              key={collab.clerkId}
              onClick={() => onCollaboratorClick(collab.clerkId)}
              className="border-border/50 hover:border-brand-pink-500/50 min-w-[140px] cursor-pointer rounded-xl border p-3 transition"
            >
              <div className="flex items-center gap-2">
                <img
                  src={'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg'}
                  alt={collab.username}
                  className="h-8 w-8 rounded-full border-2 object-cover"
                />
                <span className="text-text-primary truncate text-sm font-medium">
                  @{collab.username}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className={cn('flex h-5 w-5 items-center justify-center rounded', config.bg)}>
                  <Icon size={12} className={config.color} />
                </div>
                <span className={cn('text-xs font-medium', config.color)}>
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
            className="border-brand-pink-500/30 bg-brand-pink-500/5 text-brand-pink-500 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 flex min-w-[100px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed p-3 transition"
          >
            <span className="text-lg font-bold">+{collaborators.length - 3}</span>
            <span className="text-xs">more</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
