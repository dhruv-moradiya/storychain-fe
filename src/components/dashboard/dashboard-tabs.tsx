import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'account', label: 'Account', path: '/dashboard/account' },
  { key: 'stories', label: 'Stories', path: '/dashboard/stories' },
  { key: 'my-chapters', label: 'My Chapters', path: '/dashboard/my-chapters' },
  { key: 'notification', label: 'Notification', path: '/dashboard/notification' },
];

export const DashboardTabs = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-muted/40 sticky top-0 z-50 flex w-full gap-6 px-4 pt-3 backdrop-blur-3xl">
      {tabs.map((t) => {
        const isActive = pathname.includes(t.key);

        return (
          <Link
            key={t.key}
            to={t.path}
            className={cn(
              'text-muted-foreground border-b-2 border-transparent pb-3 text-sm capitalize transition',
              isActive && 'text-foreground border-primary'
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};
