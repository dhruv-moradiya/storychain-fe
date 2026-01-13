import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Compass,
  Feather,
  LayoutDashboard,
  Bell,
  Check,
  MessageSquare,
  UserPlus,
  BookOpen,
  Star,
  CoinsIcon,
  HandHeart,
} from 'lucide-react';
import { NavItem } from '@/components/common';
import { useState } from 'react';

// Mock notifications data - replace with real data
const mockNotifications = [
  {
    id: '1',
    type: 'comment',
    title: 'New comment on your story',
    message: 'John Doe commented on "The Adventure Begins"',
    time: '2 min ago',
    read: false,
    icon: MessageSquare,
  },
  {
    id: '2',
    type: 'follow',
    title: 'New follower',
    message: 'Jane Smith started following you',
    time: '1 hour ago',
    read: false,
    icon: UserPlus,
  },
  {
    id: '3',
    type: 'chapter',
    title: 'Chapter published',
    message: 'Your chapter "The Hidden Door" is now live',
    time: '3 hours ago',
    read: true,
    icon: BookOpen,
  },
  {
    id: '4',
    type: 'like',
    title: 'Story liked',
    message: 'Your story received 10 new likes',
    time: '1 day ago',
    read: true,
    icon: Star,
  },
];

type Notification = (typeof mockNotifications)[number];

const NotificationItem = ({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
}) => {
  const Icon = notification.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors',
        notification.read
          ? 'hover:bg-muted/30 bg-transparent'
          : 'bg-brand-pink-500/5 hover:bg-brand-pink-500/10'
      )}
      onClick={() => !notification.read && onMarkRead(notification.id)}
    >
      <div
        className={cn(
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
          notification.read
            ? 'bg-muted/50'
            : 'from-brand-pink-500/20 to-brand-orange/20 bg-gradient-to-br'
        )}
      >
        <Icon
          className={cn(
            'h-4 w-4',
            notification.read ? 'text-text-secondary-65' : 'text-brand-pink-500'
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-sm',
            notification.read ? 'text-text-secondary-65' : 'text-text-primary font-medium'
          )}
        >
          {notification.title}
        </p>
        <p className="text-text-secondary-65 truncate text-xs">{notification.message}</p>
        <p className="text-text-secondary-65/70 mt-1 text-[10px]">{notification.time}</p>
      </div>
      {!notification.read && (
        <div className="bg-brand-pink-500 h-2 w-2 flex-shrink-0 rounded-full" />
      )}
    </motion.div>
  );
};

export default function Navbar() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 w-full',
        'border-border/50 border-b',
        'bg-cream-95 backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* LEFT */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="bg-brand-pink-500 h-3 w-3 rounded-full shadow-[0_0_12px_var(--brand-pink-shadow35)]" />
          <span className="text-text-primary text-[18px] font-semibold tracking-tight">
            StoryChain
          </span>
        </Link>

        {isSignedIn && (
          <ul className="hidden items-center gap-2 md:flex">
            <NavItem to="/dashboard" label="Dashboard" icon={<LayoutDashboard size={16} />} />
            <NavItem to="/explore" label="Explore" icon={<Compass size={16} />} />
            <NavItem to="/" label="Builder" icon={<Feather size={16} />} />
            <NavItem to="/pricing" label="Pricing" icon={<CoinsIcon size={16} />} />
            <NavItem to="/how-to-use" label="How to use" icon={<HandHeart size={16} />} />
          </ul>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {isSignedIn && (
            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-secondary hover:bg-brand-pink-500/10 hover:text-text-primary relative h-9 w-9"
                >
                  <Bell className="h-5 w-5" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="bg-brand-pink-500 absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-[0_2px_4px_var(--brand-pink-shadow25)]"
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="border-border/50 bg-cream-95 w-80 rounded-xl border p-0 shadow-xl backdrop-blur-xl sm:w-96"
              >
                {/* Header */}
                <div className="border-border/50 flex items-center justify-between border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-text-primary font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-brand-pink-500/10 text-brand-pink-500 rounded-full px-2 py-0.5 text-xs font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-secondary-65 hover:text-brand-pink-500 h-7 gap-1 text-xs"
                      onClick={handleMarkAllRead}
                    >
                      <Check className="h-3 w-3" />
                      Mark all read
                    </Button>
                  )}
                </div>

                {/* Notifications List */}
                <ScrollArea className="max-h-[400px]">
                  <div className="p-2">
                    {notifications.length > 0 ? (
                      <div className="space-y-1">
                        {notifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkRead={handleMarkRead}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="bg-muted/50 flex h-12 w-12 items-center justify-center rounded-xl">
                          <Bell className="text-text-secondary-65 h-6 w-6" />
                        </div>
                        <p className="text-text-secondary mt-3 text-sm font-medium">
                          No notifications
                        </p>
                        <p className="text-text-secondary-65 text-xs">You're all caught up!</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="border-border/50 border-t p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-pink-500 hover:bg-brand-pink-500/10 hover:text-brand-pink-600 w-full text-sm"
                      onClick={() => {
                        setIsNotificationOpen(false);
                        navigate('/notifications');
                      }}
                    >
                      View all notifications
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          )}

          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'relative h-8 w-8 cursor-pointer overflow-hidden rounded-full',
                    'border-border/50 bg-muted/60 border backdrop-blur-sm'
                  )}
                >
                  <img
                    src="https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg"
                    alt="Profile Pic"
                  />
                </motion.div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="border-border/50 bg-cream-95 w-56 rounded-xl border p-1 shadow-xl backdrop-blur-xl"
              >
                <DropdownMenuItem className="cursor-default select-none">
                  <div className="flex flex-col">
                    <span className="text-text-primary font-medium">
                      {user.fullName || 'Your Profile'}
                    </span>
                    <span className="text-text-secondary-65 text-xs">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate('/profile')}
                  className="text-text-secondary hover:text-text-primary"
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="text-text-secondary hover:text-text-primary">
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: '/sign-in' })}
                  className="text-destructive focus:text-destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/sign-in"
              className="text-text-secondary hover:text-text-primary text-sm transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
