import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bell,
  Mail,
  MessageSquare,
  GitPullRequest,
  Star,
  Users,
  BookOpen,
  Settings,
  Check,
  Trash2,
  CheckCheck,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock notifications
const mockNotifications = [
  {
    id: '1',
    type: 'comment',
    title: 'New comment on your story',
    message: 'Alice commented on "The Dawn of AI"',
    avatar: '/avatars/alice.png',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: '2',
    type: 'pr',
    title: 'Pull request approved',
    message: 'Your chapter submission to "The Lost City" was approved',
    avatar: '/avatars/bob.png',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    type: 'follower',
    title: 'New follower',
    message: 'Charlie started following you',
    avatar: '/avatars/charlie.png',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '4',
    type: 'star',
    title: 'Story starred',
    message: 'Your story "Echoes of Tomorrow" received a new star',
    avatar: null,
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: '5',
    type: 'collaboration',
    title: 'Collaboration invite',
    message: 'You were invited to collaborate on "Starlight Dreams"',
    avatar: '/avatars/diana.png',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];

const notificationTypeIcons = {
  comment: MessageSquare,
  pr: GitPullRequest,
  follower: Users,
  star: Star,
  collaboration: BookOpen,
};

export function NotificationsSection() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    comments: true,
    pullRequests: true,
    followers: true,
    stars: false,
    collaborations: true,
    marketing: false,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success('Notification has been removed');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications have been cleared');
  };

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preferences saved');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground text-sm">Manage your notifications and preferences</p>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Notifications</CardTitle>
                  <CardDescription>
                    {unreadCount > 0
                      ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                      : 'All caught up!'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                      <CheckCheck className="mr-2 h-4 w-4" />
                      Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button variant="outline" size="sm" onClick={handleClearAll}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-2">
                    {notifications.map((notification) => {
                      const Icon =
                        notificationTypeIcons[
                          notification.type as keyof typeof notificationTypeIcons
                        ] || Bell;
                      return (
                        <div
                          key={notification.id}
                          className={cn(
                            'flex items-start gap-4 rounded-lg p-4 transition-colors',
                            notification.read
                              ? 'hover:bg-muted/50 bg-transparent'
                              : 'bg-primary/5 hover:bg-primary/10'
                          )}
                        >
                          {notification.avatar ? (
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                <Icon className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                              <Icon className="text-muted-foreground h-4 w-4" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className={cn('text-sm', !notification.read && 'font-medium')}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="bg-primary h-2 w-2 rounded-full" />
                              )}
                            </div>
                            <p className="text-muted-foreground truncate text-sm">
                              {notification.message}
                            </p>
                            <p className="text-muted-foreground mt-1 text-xs">
                              {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive h-8 w-8"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted mb-4 rounded-full p-4">
                    <Bell className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="mb-1 font-medium">No notifications</h3>
                  <p className="text-muted-foreground text-sm">
                    You're all caught up! Check back later.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          {/* Delivery Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Methods</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingRow
                icon={Mail}
                label="Email Notifications"
                description="Receive notifications via email"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleSettingChange('emailNotifications')}
              />
              <SettingRow
                icon={Bell}
                label="Push Notifications"
                description="Receive push notifications in your browser"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleSettingChange('pushNotifications')}
              />
            </CardContent>
          </Card>

          {/* Notification Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Types</CardTitle>
              <CardDescription>Choose which notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingRow
                icon={MessageSquare}
                label="Comments"
                description="When someone comments on your stories"
                checked={settings.comments}
                onCheckedChange={() => handleSettingChange('comments')}
              />
              <SettingRow
                icon={GitPullRequest}
                label="Pull Requests"
                description="Updates on your chapter submissions"
                checked={settings.pullRequests}
                onCheckedChange={() => handleSettingChange('pullRequests')}
              />
              <SettingRow
                icon={Users}
                label="Followers"
                description="When someone follows you"
                checked={settings.followers}
                onCheckedChange={() => handleSettingChange('followers')}
              />
              <SettingRow
                icon={Star}
                label="Stars"
                description="When your stories receive stars"
                checked={settings.stars}
                onCheckedChange={() => handleSettingChange('stars')}
              />
              <SettingRow
                icon={BookOpen}
                label="Collaborations"
                description="Collaboration invites and updates"
                checked={settings.collaborations}
                onCheckedChange={() => handleSettingChange('collaborations')}
              />
            </CardContent>
          </Card>

          {/* Marketing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Marketing & Updates</CardTitle>
              <CardDescription>Stay updated with news and features</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingRow
                icon={Mail}
                label="Marketing Emails"
                description="Receive news, updates, and promotional content"
                checked={settings.marketing}
                onCheckedChange={() => handleSettingChange('marketing')}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface SettingRowProps {
  icon: typeof Bell;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: () => void;
}

function SettingRow({ icon: Icon, label, description, checked, onCheckedChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="bg-muted rounded-lg p-2">
          <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div>
          <Label htmlFor={label} className="cursor-pointer text-sm font-medium">
            {label}
          </Label>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default NotificationsSection;
