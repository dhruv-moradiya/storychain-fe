import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import {
  User,
  BookOpen,
  Award,
  UserPlus,
  Bell,
  FileWarning,
  Settings,
  Shield,
  CreditCard,
} from 'lucide-react';

const baseTabs = [
  { key: 'general', label: 'General', path: '', icon: User },
  { key: 'stories', label: 'Stories', path: 'stories', icon: BookOpen },
  { key: 'badges', label: 'Badges', path: 'badges', icon: Award },
  { key: 'following', label: 'Following', path: 'following', icon: UserPlus },
  { key: 'notifications', label: 'Notifications', path: 'notifications', icon: Bell },
  { key: 'my-reports', label: 'My Reports', path: 'my-reports', icon: FileWarning },
  { key: 'settings', label: 'Settings', path: 'settings', icon: Settings },
  { key: 'subscription', label: 'Subscription', path: 'subscription', icon: CreditCard },
  { key: 'admin', label: 'Admin', path: 'admin', icon: Shield },
];

export const ProfileTabs = () => {
  const { pathname } = useLocation();

  const tabs = [...baseTabs];

  const getIsActive = (tabPath: string, tabKey: string) => {
    const profileBase = '/profile';

    // For index route (general)
    if (tabPath === '') {
      return pathname === profileBase || pathname === `${profileBase}/`;
    }

    // For admin routes, check if pathname starts with admin
    if (tabKey === 'admin') {
      return pathname.includes('/admin');
    }

    // For other routes
    return pathname === `${profileBase}/${tabPath}`;
  };

  return (
    <div className="bg-bg-cream/80 border-border/30 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-3 sm:gap-2 sm:px-4">
        {tabs.map((t) => {
          const fullPath = t.path === '' ? '/profile' : `/profile/${t.path}`;
          const isActive = getIsActive(t.path, t.key);
          const Icon = t.icon;

          return (
            <Link
              key={t.key}
              to={fullPath}
              className={cn(
                'text-text-secondary-65 hover:text-text-primary relative flex items-center gap-1.5 px-2 py-3 text-xs font-medium whitespace-nowrap transition-colors sm:px-3 sm:text-sm',
                isActive && 'text-brand-pink-500'
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(' ')[0]}</span>
              {isActive && (
                <span className="bg-brand-pink-500 absolute right-2 bottom-0 left-2 h-0.5 rounded-full sm:right-3 sm:left-3" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;
