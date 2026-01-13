import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { PlatformRole, PlatformUser } from './admin.types';
import { AdminStats } from './components/admin-stats';
import { UserCard } from './components/user-card';

// Mock data
const mockPlatformUsers: PlatformUser[] = [
  {
    id: '1',
    name: 'John Admin',
    username: 'johnadmin',
    email: 'john@storychain.com',
    avatar: '/avatars/john.png',
    role: 'SUPER_ADMIN',
    assignedAt: new Date('2024-01-01'),
    isBanned: false,
  },
  {
    id: '2',
    name: 'Sarah Mod',
    username: 'sarahmod',
    email: 'sarah@storychain.com',
    avatar: '/avatars/sarah.png',
    role: 'PLATFORM_MODERATOR',
    assignedAt: new Date('2024-02-15'),
    assignedBy: 'johnadmin',
    isBanned: false,
  },
  {
    id: '3',
    name: 'Mike Appeal',
    username: 'mikeappeal',
    email: 'mike@storychain.com',
    avatar: '/avatars/mike.png',
    role: 'APPEAL_MODERATOR',
    assignedAt: new Date('2024-03-10'),
    assignedBy: 'johnadmin',
    isBanned: false,
  },
  {
    id: '4',
    name: 'Jane User',
    username: 'janeuser',
    email: 'jane@example.com',
    avatar: null,
    role: 'USER',
    isBanned: false,
  },
  {
    id: '5',
    name: 'Banned Bob',
    username: 'bannedbob',
    email: 'bob@example.com',
    avatar: null,
    role: 'USER',
    isBanned: true,
    banReason: 'Repeated harassment',
  },
];

export function AdminUsers() {
  const [users, setUsers] = useState(mockPlatformUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<PlatformRole | 'ALL'>('ALL');

  const handleRoleChange = (userId: string, newRole: PlatformRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole, assignedAt: new Date() } : u))
    );
    toast.success('User role has been updated');
  };

  const handleBanUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isBanned: true, banReason: 'Banned by admin' } : u
      )
    );
    toast.success('User has been banned from the platform');
  };

  const handleUnbanUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isBanned: false, banReason: undefined } : u))
    );
    toast.success('User has been unbanned');
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    totalModerators: users.filter((u) => u.role !== 'USER').length,
    pendingReports: 2,
    bannedUsers: users.filter((u) => u.isBanned).length,
    resolvedToday: 1,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <AdminStats stats={stats} />

      {/* Users List */}
      <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-text-primary text-base font-semibold">Platform Users</h2>
            <p className="text-text-secondary-65 text-sm">Manage user roles and permissions</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <Select
              value={roleFilter}
              onValueChange={(v) => setRoleFilter(v as PlatformRole | 'ALL')}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                <SelectItem value="PLATFORM_MODERATOR">Platform Mod</SelectItem>
                <SelectItem value="APPEAL_MODERATOR">Appeal Mod</SelectItem>
                <SelectItem value="USER">User</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full sm:w-64">
              <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onRoleChange={handleRoleChange}
                onBan={handleBanUser}
                onUnban={handleUnbanUser}
              />
            ))}
            {filteredUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted/50 mb-4 rounded-full p-4">
                  <Users className="text-text-secondary-65 h-8 w-8" />
                </div>
                <h3 className="text-text-primary mb-1 font-medium">No users found</h3>
                <p className="text-text-secondary-65 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default AdminUsers;
