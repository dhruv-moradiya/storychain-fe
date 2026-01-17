import { useState } from 'react';
import { AlertTriangle, Archive, Trash2, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DangerTabProps {
  storyTitle?: string;
  onArchive?: () => void;
  onTransferOwnership?: () => void;
  onDelete?: () => void;
}

type DialogType = 'archive' | 'transfer' | 'delete' | null;

interface DangerActionProps {
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  titleClass?: string;
  description: React.ReactNode;
  buttonText: string;
  buttonVariant?: 'outline' | 'destructive';
  buttonClass?: string;
  onClick: () => void;
  cardClass?: string;
  delay?: number;
}

function DangerAction({
  icon,
  iconBgClass,
  title,
  titleClass,
  description,
  buttonText,
  buttonVariant = 'outline',
  buttonClass,
  onClick,
  cardClass,
  delay = 0,
}: DangerActionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn('border-border/50 rounded-xl border p-5', cardClass)}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
            iconBgClass
          )}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={cn('text-text-primary font-medium', titleClass)}>{title}</h4>
          <p className="text-text-secondary-65 mt-1 text-sm">{description}</p>
          <Button
            variant={buttonVariant}
            size="sm"
            className={cn('mt-3', buttonClass)}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function DangerTab({
  storyTitle = 'this story',
  onArchive,
  onTransferOwnership,
  onDelete,
}: DangerTabProps) {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleConfirmAction = () => {
    switch (openDialog) {
      case 'archive':
        onArchive?.();
        break;
      case 'transfer':
        onTransferOwnership?.();
        break;
      case 'delete':
        if (deleteConfirmation === storyTitle) {
          onDelete?.();
        }
        break;
    }
    setOpenDialog(null);
    setDeleteConfirmation('');
  };

  const closeDialog = () => {
    setOpenDialog(null);
    setDeleteConfirmation('');
  };

  return (
    <>
      <div className="space-y-4">
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-400">Proceed with caution</h4>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
              The actions below can have significant consequences. Some actions are irreversible.
            </p>
          </div>
        </motion.div>

        {/* Archive Story */}
        <DangerAction
          icon={<Archive className="h-5 w-5 text-amber-600" />}
          iconBgClass="bg-amber-500/10"
          title="Archive Story"
          description="Archiving will hide the story from public view but preserve all data. You can unarchive it later."
          buttonText="Archive Story"
          buttonClass="border-amber-500/50 text-amber-600 hover:bg-amber-500/10"
          onClick={() => setOpenDialog('archive')}
          delay={0.1}
        />

        {/* Transfer Ownership */}
        <DangerAction
          icon={<UserX className="h-5 w-5 text-purple-600" />}
          iconBgClass="bg-purple-500/10"
          title="Transfer Ownership"
          description="Transfer this story to another collaborator. You will become a co-author and lose owner privileges."
          buttonText="Transfer Ownership"
          buttonClass="border-purple-500/50 text-purple-600 hover:bg-purple-500/10"
          onClick={() => setOpenDialog('transfer')}
          delay={0.2}
        />

        {/* Delete Story */}
        <DangerAction
          icon={<Trash2 className="text-destructive h-5 w-5" />}
          iconBgClass="bg-destructive/10"
          title="Delete Story"
          titleClass="text-destructive"
          description={
            <>
              Permanently delete <strong>{storyTitle}</strong> and all its chapters, comments, and
              contributions. This action cannot be undone.
            </>
          }
          buttonText="Delete Story"
          buttonVariant="destructive"
          onClick={() => setOpenDialog('delete')}
          cardClass="border-destructive/30 bg-destructive/5"
          delay={0.3}
        />
      </div>

      {/* Archive Confirmation Dialog */}
      <AlertDialog open={openDialog === 'archive'} onOpenChange={(open) => !open && closeDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-amber-600" />
              Archive Story
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive <strong>{storyTitle}</strong>? The story will be
              hidden from public view but all data will be preserved. You can unarchive it at any
              time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-amber-600 hover:bg-amber-700"
              onClick={handleConfirmAction}
            >
              Archive Story
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Transfer Ownership Confirmation Dialog */}
      <AlertDialog open={openDialog === 'transfer'} onOpenChange={(open) => !open && closeDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-purple-600" />
              Transfer Ownership
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to transfer ownership of <strong>{storyTitle}</strong>? You will
              lose owner privileges and become a co-author. This action can only be reversed by the
              new owner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleConfirmAction}
            >
              Transfer Ownership
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDialog === 'delete'} onOpenChange={(open) => !open && closeDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Story
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <span>
                This action is <strong>permanent and irreversible</strong>. Deleting{' '}
                <strong>{storyTitle}</strong> will remove all chapters, comments, contributions, and
                associated data.
              </span>
              <div className="pt-2">
                <label className="text-text-primary mb-2 block text-sm font-medium">
                  Type <strong>{storyTitle}</strong> to confirm:
                </label>
                <Input
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder={storyTitle}
                  className="border-destructive/30 focus:border-destructive"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleConfirmAction}
              disabled={deleteConfirmation !== storyTitle}
            >
              Delete Story
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
