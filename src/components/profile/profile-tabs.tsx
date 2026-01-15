import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';
import {
  User,
  Award,
  Bell,
  FileWarning,
  Settings,
  Shield,
  CreditCard,
  ChevronDown,
  Check,
} from 'lucide-react';

const baseTabs = [
  { key: 'general', label: 'General', path: '', icon: User },
  { key: 'badges', label: 'Badges', path: 'badges', icon: Award },
  { key: 'notifications', label: 'Notifications', path: 'notifications', icon: Bell },
  { key: 'my-reports', label: 'My Reports', path: 'my-reports', icon: FileWarning },
  { key: 'subscription', label: 'Subscription', path: 'subscription', icon: CreditCard },
  { key: 'settings', label: 'Settings', path: 'settings', icon: Settings },
  { key: 'admin', label: 'Admin', path: 'admin', icon: Shield },
];

export const ProfileTabs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

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

  const activeTab = tabs.find((t) => getIsActive(t.path, t.key)) || tabs[0];
  const ActiveIcon = activeTab.icon;

  const handleTabSelect = (path: string) => {
    const fullPath = path === '' ? '/profile' : `/profile/${path}`;
    navigate(fullPath);
    setIsOpen(false);
  };

  // Mobile: Show dropdown/sheet
  if (isMobile) {
    return (
      <div className="bg-bg-cream/80 border-border/30 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
        <div className="px-4 py-2">
          <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-border/50 bg-cream-95 hover:bg-cream-90 w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <ActiveIcon className="text-brand-pink-500 h-4 w-4" />
                  <span className="font-medium">{activeTab.label}</span>
                </span>
                <ChevronDown className="text-text-secondary-65 h-4 w-4" />
              </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent
              className="bg-cream-95"
              sheetHeight="auto"
              showCloseButton={false}
            >
              <ResponsiveDialogHeader>
                <ResponsiveDialogTitle>Navigate to</ResponsiveDialogTitle>
              </ResponsiveDialogHeader>
              <div className="grid gap-1 py-2">
                {tabs.map((t) => {
                  const isActive = getIsActive(t.path, t.key);
                  const Icon = t.icon;

                  return (
                    <button
                      key={t.key}
                      onClick={() => handleTabSelect(t.path)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all',
                        isActive
                          ? 'bg-brand-pink-500/10 text-brand-pink-500'
                          : 'text-text-primary hover:bg-cream-90'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          isActive ? 'text-brand-pink-500' : 'text-text-secondary-65'
                        )}
                      />
                      <span className="flex-1 font-medium">{t.label}</span>
                      {isActive && <Check className="text-brand-pink-500 h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </ResponsiveDialogContent>
          </ResponsiveDialog>
        </div>
      </div>
    );
  }

  // Desktop: Show horizontal tabs
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
              <span>{t.label}</span>
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
