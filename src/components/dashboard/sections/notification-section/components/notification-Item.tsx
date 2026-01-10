import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { getNotificationIcon, highlightNotificationText } from '@/lib/getNotificationIcon';
import { NotificationType, type INotification } from '@/type/notification.type';
import { Button } from '@/components/ui/button';
import { useAcceptInvitation, useDeclineInvitation } from '@/hooks/story/story.mutations';
import { useState } from 'react';
import toast from '@/components/common/toast';

interface Props {
  notification: INotification;
}

const NotificationItem = ({ notification }: Props) => {
  const navigate = useNavigate();
  const Icon = getNotificationIcon(notification.type);
  const { mutateAsync: acceptInvitation } = useAcceptInvitation();
  const { mutateAsync: declineInvitation } = useDeclineInvitation();

  const isCollabInvite = notification.type === NotificationType.COLLAB_INVITATION;

  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [actionTaken, setActionTaken] = useState<null | 'accepted' | 'rejected'>(null);

  const handleAcceptInvite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAccepting(true);

    try {
      if (notification.relatedStorySlug) {
        await acceptInvitation(notification.relatedStorySlug);
        setActionTaken('accepted');
        toast.success('Invitation accepted successfully');
      }
    } catch {
      toast.error('Failed to accept invitation');
    } finally {
      setAccepting(false);
    }
  };

  const handleDeclineInvite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setRejecting(true);

    try {
      if (notification.relatedStorySlug) {
        await declineInvitation(notification.relatedStorySlug);
        setActionTaken('rejected');
        toast.success('Invitation declined');
      }
    } catch {
      toast.error('Failed to decline invitation');
    } finally {
      setRejecting(false);
    }
  };

  return (
    <motion.div
      onClick={() => {
        if (!isCollabInvite && !accepting && !rejecting && notification.actionUrl) {
          navigate(notification.actionUrl);
        }
      }}
      className={cn(
        'group flex items-center gap-3 p-3 transition-colors',
        notification.isRead ? 'bg-background' : 'bg-primary/5 hover:bg-primary/10',
        !isCollabInvite && !actionTaken && 'cursor-pointer'
      )}
    >
      {!notification.isRead && !actionTaken && (
        <div className="bg-primary mt-1 h-2 w-2 rounded-full" />
      )}

      <div className="bg-muted/40 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
        <Icon size={18} className="text-muted-foreground" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm leading-snug font-medium">
          {highlightNotificationText(notification.title, 'color-only')}
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {highlightNotificationText(notification.message, 'color-only')}
        </p>

        {isCollabInvite && !actionTaken && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={handleAcceptInvite} disabled={accepting || rejecting}>
              {accepting ? 'Accepting...' : 'Accept'}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleDeclineInvite}
              disabled={accepting || rejecting}
            >
              {rejecting ? 'Rejecting...' : 'Reject'}
            </Button>
          </div>
        )}

        {actionTaken && (
          <p className="text-primary mt-2 text-xs font-semibold">
            {actionTaken === 'accepted' ? 'You accepted this invite' : 'You rejected this invite'}
          </p>
        )}
      </div>

      <div className="text-muted-foreground pt-1 text-[10px] whitespace-nowrap">just now</div>
    </motion.div>
  );
};

export default NotificationItem;
