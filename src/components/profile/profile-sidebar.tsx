import { useUser, useClerk } from '@clerk/clerk-react';
import { NavLink, useLocation } from 'react-router';
import {
  User,
  Award,
  Bell,
  Settings,
  LogOut,
  Shield,
  FileWarning,
  ChevronRight,
  ShieldAlert,
  Scale,
  CreditCard,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export type ProfileSection =
  | 'general'
  | 'badges'
  | 'notifications'
  | 'my-reports'
  | 'subscription'
  | 'settings'
  | 'admin';

const menuItems: Array<{
  id: ProfileSection;
  label: string;
  icon: typeof User;
  path: string;
  description?: string;
  children?: Array<{
    id: string;
    label: string;
    icon: typeof User;
    path: string;
  }>;
}> = [
  {
    id: 'general',
    label: 'General',
    icon: User,
    path: '/profile',
    description: 'Profile & account',
  },
  {
    id: 'badges',
    label: 'Badges',
    icon: Award,
    path: '/profile/badges',
    description: 'Achievements',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    path: '/profile/notifications',
    description: 'Alerts & updates',
  },
  {
    id: 'my-reports',
    label: 'My Reports',
    icon: FileWarning,
    path: '/profile/my-reports',
    description: 'Reports & appeals',
  },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: CreditCard,
    path: '/profile/subscription',
    description: 'Billing & plans',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/profile/settings',
    description: 'Preferences',
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    icon: Shield,
    path: '/profile/admin',
    description: 'Platform management',
    children: [
      {
        id: 'admin-reports',
        label: 'Reports',
        icon: ShieldAlert,
        path: '/profile/admin/reports',
      },
      {
        id: 'admin-appeals',
        label: 'Appeals',
        icon: Scale,
        path: '/profile/admin/appeals',
      },
    ],
  },
];

export function ProfileSidebar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  const handleSignOut = () => {
    signOut();
  };

  const isActive = (path: string) => {
    if (path === '/profile') {
      return location.pathname === '/profile';
    }
    return location.pathname.startsWith(path);
  };

  const isAdminActive = () => {
    return location.pathname.startsWith('/profile/admin');
  };

  return (
    <Sidebar collapsible="none" className="border-r">
      <SidebarHeader className="p-4 pb-3">
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
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;

                if (item.children) {
                  return (
                    <Collapsible
                      key={item.id}
                      asChild
                      defaultOpen={isAdminActive()}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.label} isActive={isAdminActive()}>
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === item.path}
                              >
                                <NavLink to={item.path}>
                                  <span>Overview</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            {item.children.map((child) => {
                              const ChildIcon = child.icon;
                              return (
                                <SidebarMenuSubItem key={child.id}>
                                  <SidebarMenuSubButton asChild isActive={isActive(child.path)}>
                                    <NavLink to={child.path}>
                                      <ChildIcon className="h-3 w-3" />
                                      <span>{child.label}</span>
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild tooltip={item.label} isActive={isActive(item.path)}>
                      <NavLink to={item.path}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-2">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full justify-start gap-3"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default ProfileSidebar;
