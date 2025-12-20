import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, UserPlus, UserMinus, Search, BookOpen, Star, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UserItem {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  bio: string;
  storiesCount: number;
  followersCount: number;
  isFollowing: boolean;
  isVerified?: boolean;
}

const mockFollowing: UserItem[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    username: 'alicewrites',
    avatar: '/avatars/alice.png',
    bio: 'Fantasy writer and world-builder. Creating epic sagas one chapter at a time.',
    storiesCount: 12,
    followersCount: 1520,
    isFollowing: true,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Bob Martinez',
    username: 'bobstories',
    avatar: '/avatars/bob.png',
    bio: 'Sci-fi enthusiast. Love collaborative storytelling.',
    storiesCount: 8,
    followersCount: 892,
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Charlie Chen',
    username: 'charliecreates',
    avatar: '/avatars/charlie.png',
    bio: 'Mystery and thriller writer. Plot twists are my specialty.',
    storiesCount: 15,
    followersCount: 2340,
    isFollowing: true,
    isVerified: true,
  },
  {
    id: '4',
    name: 'Diana Ross',
    username: 'dianawrites',
    avatar: '/avatars/diana.png',
    bio: 'Romance author with a passion for character development.',
    storiesCount: 6,
    followersCount: 567,
    isFollowing: true,
  },
];

const mockFollowers: UserItem[] = [
  {
    id: '5',
    name: 'Emma Wilson',
    username: 'emmawrites',
    avatar: '/avatars/emma.png',
    bio: 'Aspiring writer. Learning from the best!',
    storiesCount: 3,
    followersCount: 124,
    isFollowing: false,
  },
  {
    id: '6',
    name: 'Frank Thompson',
    username: 'frankstales',
    avatar: '/avatars/frank.png',
    bio: 'Horror and suspense. Dark stories, bright imagination.',
    storiesCount: 9,
    followersCount: 756,
    isFollowing: true,
  },
  {
    id: '2',
    name: 'Bob Martinez',
    username: 'bobstories',
    avatar: '/avatars/bob.png',
    bio: 'Sci-fi enthusiast. Love collaborative storytelling.',
    storiesCount: 8,
    followersCount: 892,
    isFollowing: true,
  },
];

const mockSuggested: UserItem[] = [
  {
    id: '7',
    name: 'Grace Lee',
    username: 'graceful_tales',
    avatar: '/avatars/grace.png',
    bio: 'Poetry and short stories. Finding beauty in brevity.',
    storiesCount: 22,
    followersCount: 3100,
    isFollowing: false,
    isVerified: true,
  },
  {
    id: '8',
    name: 'Henry Adams',
    username: 'henryadams',
    avatar: '/avatars/henry.png',
    bio: 'Historical fiction writer. Bringing the past to life.',
    storiesCount: 7,
    followersCount: 1890,
    isFollowing: false,
  },
  {
    id: '9',
    name: 'Ivy Chen',
    username: 'ivywrites',
    avatar: null,
    bio: 'Young adult fiction. Writing stories for dreamers.',
    storiesCount: 11,
    followersCount: 2450,
    isFollowing: false,
  },
];

export function FollowingSection() {
  const [following, setFollowing] = useState(mockFollowing);
  const [followers, setFollowers] = useState(mockFollowers);
  const [suggested, setSuggested] = useState(mockSuggested);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('following');

  const handleFollow = (userId: string) => {
    // Find the user being followed
    const user = [...following, ...followers, ...suggested].find((u) => u.id === userId);

    // Update in all lists
    setFollowing((prev) => prev.map((u) => (u.id === userId ? { ...u, isFollowing: true } : u)));
    setFollowers((prev) => prev.map((u) => (u.id === userId ? { ...u, isFollowing: true } : u)));
    setSuggested((prev) => prev.map((u) => (u.id === userId ? { ...u, isFollowing: true } : u)));

    toast.success(`You are now following ${user?.name || 'user'}`);
  };

  const handleUnfollow = (userId: string) => {
    const user = [...following, ...followers, ...suggested].find((u) => u.id === userId);

    setFollowing((prev) => prev.map((u) => (u.id === userId ? { ...u, isFollowing: false } : u)));
    setFollowers((prev) => prev.map((u) => (u.id === userId ? { ...u, isFollowing: false } : u)));
    setSuggested((prev) => prev.map((u) => (u.id === userId ? { ...u, isFollowing: false } : u)));

    toast.success(`You unfollowed ${user?.name || 'user'}`);
  };

  const handleRemoveFollower = (userId: string) => {
    const user = followers.find((u) => u.id === userId);
    setFollowers((prev) => prev.filter((u) => u.id !== userId));

    toast.success(`${user?.name || 'User'} was removed from your followers`);
  };

  const filterUsers = (users: UserItem[]) => {
    if (!searchQuery) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(query) || u.username.toLowerCase().includes(query)
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Following</h1>
        <p className="text-muted-foreground text-sm">
          Manage the users you follow and discover new writers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <UserPlus className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{following.length}</p>
                <p className="text-muted-foreground text-sm">Following</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{followers.length}</p>
                <p className="text-muted-foreground text-sm">Followers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-amber-500/10 p-3">
                <Star className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{suggested.length}</p>
                <p className="text-muted-foreground text-sm">Suggested</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Users</CardTitle>
              <CardDescription>People you follow and your followers</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
              <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
              <TabsTrigger value="suggested">Suggested</TabsTrigger>
            </TabsList>

            <TabsContent value="following" className="mt-6">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filterUsers(following).map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onFollow={() => handleFollow(user.id)}
                      onUnfollow={() => handleUnfollow(user.id)}
                    />
                  ))}
                  {filterUsers(following).length === 0 && (
                    <EmptyState
                      message={
                        searchQuery
                          ? 'No users match your search'
                          : "You're not following anyone yet"
                      }
                    />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="followers" className="mt-6">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filterUsers(followers).map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onFollow={() => handleFollow(user.id)}
                      onUnfollow={() => handleUnfollow(user.id)}
                      onRemove={() => handleRemoveFollower(user.id)}
                      showRemove
                    />
                  ))}
                  {filterUsers(followers).length === 0 && (
                    <EmptyState
                      message={
                        searchQuery
                          ? 'No users match your search'
                          : "You don't have any followers yet"
                      }
                    />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="suggested" className="mt-6">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filterUsers(suggested).map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onFollow={() => handleFollow(user.id)}
                      onUnfollow={() => handleUnfollow(user.id)}
                    />
                  ))}
                  {filterUsers(suggested).length === 0 && (
                    <EmptyState
                      message={
                        searchQuery ? 'No users match your search' : 'No suggestions available'
                      }
                    />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface UserCardProps {
  user: UserItem;
  onFollow: () => void;
  onUnfollow: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

function UserCard({ user, onFollow, onUnfollow, onRemove, showRemove }: UserCardProps) {
  return (
    <div className="bg-card hover:bg-muted/50 flex items-center gap-4 rounded-lg border p-4 transition-colors">
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.avatar || undefined} alt={user.name} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {user.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{user.name}</p>
          {user.isVerified && (
            <Badge variant="secondary" className="px-1.5 py-0 text-xs">
              Verified
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm">@{user.username}</p>
        <p className="text-muted-foreground mt-1 line-clamp-1 text-xs">{user.bio}</p>
        <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {user.storiesCount} stories
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {user.followersCount.toLocaleString()} followers
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user.isFollowing ? (
          <Button variant="outline" size="sm" onClick={onUnfollow} className="gap-1">
            <UserMinus className="h-4 w-4" />
            Unfollow
          </Button>
        ) : (
          <Button size="sm" onClick={onFollow} className="gap-1">
            <UserPlus className="h-4 w-4" />
            Follow
          </Button>
        )}

        {showRemove && onRemove && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={onRemove}
                className="text-destructive focus:text-destructive"
              >
                Remove follower
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-4">
        <Users className="text-muted-foreground h-8 w-8" />
      </div>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

export default FollowingSection;
