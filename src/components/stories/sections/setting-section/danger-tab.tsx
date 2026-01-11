import { AlertTriangle, Archive, Trash2, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DangerTabProps {
  storyTitle?: string;
  onArchive?: () => void;
  onTransferOwnership?: () => void;
  onDelete?: () => void;
}

export function DangerTab({
  storyTitle = 'this story',
  onArchive,
  onTransferOwnership,
  onDelete,
}: DangerTabProps) {
  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div>
          <h4 className="font-medium text-amber-800">Proceed with caution</h4>
          <p className="mt-1 text-sm text-amber-700">
            The actions below can have significant consequences. Some actions are irreversible.
          </p>
        </div>
      </motion.div>

      {/* Archive Story */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-border/50 rounded-xl border bg-white/80 p-5 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
            <Archive className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-text-primary font-medium">Archive Story</h4>
            <p className="text-text-secondary-65 mt-1 text-sm">
              Archiving will hide the story from public view but preserve all data. You can
              unarchive it later.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-amber-500/50 text-amber-600 hover:bg-amber-500/10"
              onClick={onArchive}
            >
              Archive Story
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Transfer Ownership */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-border/50 rounded-xl border bg-white/80 p-5 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
            <UserX className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-text-primary font-medium">Transfer Ownership</h4>
            <p className="text-text-secondary-65 mt-1 text-sm">
              Transfer this story to another collaborator. You will become a co-author and lose
              owner privileges.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-purple-500/50 text-purple-600 hover:bg-purple-500/10"
              onClick={onTransferOwnership}
            >
              Transfer Ownership
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Delete Story */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-destructive/30 bg-destructive/5 rounded-xl border p-5"
      >
        <div className="flex items-start gap-4">
          <div className="bg-destructive/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
            <Trash2 className="text-destructive h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-destructive font-medium">Delete Story</h4>
            <p className="text-text-secondary-65 mt-1 text-sm">
              Permanently delete <strong>{storyTitle}</strong> and all its chapters, comments, and
              contributions. This action cannot be undone.
            </p>
            <Button variant="destructive" size="sm" className="mt-3" onClick={onDelete}>
              Delete Story
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
