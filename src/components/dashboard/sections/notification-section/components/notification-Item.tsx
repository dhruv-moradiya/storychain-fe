import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { getNotificationIcon, highlightNotificationText } from '@/lib/getNotificationIcon';
import type { INotification } from '@/type/notification.type';
import { Button } from '@/components/ui/button';

interface Props {
  notification: INotification;
}

const NotificationItem = ({ notification }: Props) => {
  const navigate = useNavigate();
  const Icon = getNotificationIcon(notification.type);

  const isCollabInvite = notification.type === 'COLLAB_INVITATION';

  return (
    <motion.div
      whileHover={{ x: 2 }}
      onClick={() => !isCollabInvite && notification.actionUrl && navigate(notification.actionUrl)}
      className={cn(
        'group flex items-center gap-3 p-3 transition-colors',
        notification.isRead ? 'bg-background' : 'bg-primary/5 hover:bg-primary/10',
        !isCollabInvite && 'cursor-pointer'
      )}
    >
      {/* LEFT INDICATOR */}
      {!notification.isRead && <div className="bg-primary mt-1 h-2 w-2 rounded-full" />}

      {/* ICON */}
      <div className="bg-muted/40 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border">
        <Icon size={18} className="text-muted-foreground" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm leading-snug font-medium">{notification.title}</p>

        <p className="text-muted-foreground text-xs leading-relaxed">
          {highlightNotificationText(notification.message)}
        </p>

        {/* ACTIONS */}
        {isCollabInvite && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={() => {}}>
              Accept
            </Button>

            <Button size="sm" variant="outline" onClick={() => {}}>
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* TIME */}
      <div className="text-muted-foreground pt-1 text-[10px] whitespace-nowrap">just now</div>
    </motion.div>
  );
};

export default NotificationItem;
