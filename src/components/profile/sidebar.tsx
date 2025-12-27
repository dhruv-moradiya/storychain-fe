import { useUser, useClerk } from '@clerk/clerk-react';
import {
  User,
  BookOpen,
  Award,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  UserPlus,
  Shield,
  FileWarning,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export type ProfileSection =
  | 'general'
  | 'stories'
  | 'badges'
  | 'following'
  | 'notifications'
  | 'my-reports'
  | 'settings'
  | 'admin';

interface SidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

const menuItems: Array<{
  id: ProfileSection;
  label: string;
  icon: typeof User;
  description?: string;
}> = [
  {
    id: 'general',
    label: 'General',
    icon: User,
    description: 'Profile & account',
  },
  {
    id: 'stories',
    label: 'My Stories',
    icon: BookOpen,
    description: 'Your creations',
  },
  {
    id: 'badges',
    label: 'Badges',
    icon: Award,
    description: 'Achievements',
  },
  {
    id: 'following',
    label: 'Following',
    icon: UserPlus,
    description: 'Users you follow',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Alerts & updates',
  },
  {
    id: 'my-reports',
    label: 'My Reports',
    icon: FileWarning,
    description: 'Reports & appeals',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Preferences',
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    icon: Shield,
    description: 'Platform management',
  },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* User Info Header */}
      <div className="p-4 pt-0 pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="ring-primary/10 h-10 w-10 ring-2">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {user?.firstName?.[0] || user?.username?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user?.fullName || user?.username || 'User'}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 pt-1.5">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200',
                'group relative',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <div className="min-w-0 flex-1">
                <span className={cn('block text-sm', isActive ? 'font-medium' : 'font-normal')}>
                  {label}
                </span>
              </div>
              {isActive && <ChevronRight className="text-primary h-4 w-4 shrink-0" />}
            </button>
          );
        })}
      </nav>

      <Separator />

      {/* Sign Out Button */}
      <div className="p-2">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full justify-start gap-3"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign out</span>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
