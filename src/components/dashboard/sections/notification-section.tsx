import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils';
import { useGetNotifications } from '@/api/notification.api';
import {
  NotificationsSkeleton,
  NotificationItem,
  NotificationsEmpty,
  NotificationsError,
} from './notification-section/index';

const NotificationSection = () => {
  const { data, isLoading, isError, refetch } = useGetNotifications();

  if (isLoading) return <NotificationsSkeleton />;
  if (isError) return <NotificationsError onRetry={refetch} />;

  const notifications = data?.notifications ?? [];

  if (!notifications.length) {
    return <NotificationsEmpty />;
  }

  return (
    <motion.div
      {...fadeIn(0.05)}
      className="mx-auto max-w-5xl overflow-hidden rounded-xl border shadow-sm"
    >
      <div className="bg-muted/40 border-b p-3 text-sm font-medium">Notifications</div>

      <div className="divide-y">
        {notifications.map((n) => (
          <NotificationItem key={n._id} notification={n} />
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationSection;
