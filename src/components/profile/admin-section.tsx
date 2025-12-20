import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Search,
  MoreHorizontal,
  UserCog,
  Ban,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Eye,
  Scale,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

// Platform role types matching backend
type PlatformRole = 'SUPER_ADMIN' | 'PLATFORM_MODERATOR' | 'APPEAL_MODERATOR' | 'USER';

type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
type ReportType = 'CHAPTER' | 'COMMENT' | 'USER' | 'STORY';
type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'COPYRIGHT'
  | 'OFF_TOPIC'
  | 'OTHER';

interface PlatformUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  role: PlatformRole;
  assignedAt?: Date;
  assignedBy?: string;
  isBanned: boolean;
  banReason?: string;
}

interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  reportType: ReportType;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: Date;
  relatedTitle?: string;
  assignedTo?: string;
}

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

const mockReports: Report[] = [
  {
    id: '1',
    reporterId: 'user1',
    reporterName: 'Alice',
    reportType: 'COMMENT',
    reason: 'HARASSMENT',
    description: 'This comment contains offensive language targeted at another user.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    relatedTitle: 'Comment on "The Lost City"',
  },
  {
    id: '2',
    reporterId: 'user2',
    reporterName: 'Bob',
    reportType: 'CHAPTER',
    reason: 'COPYRIGHT',
    description: 'This chapter appears to be copied from a published book.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    relatedTitle: 'Chapter 5: The Beginning',
  },
  {
    id: '3',
    reporterId: 'user3',
    reporterName: 'Charlie',
    reportType: 'STORY',
    reason: 'INAPPROPRIATE_CONTENT',
    description: 'Story contains explicit content without proper rating.',
    status: 'REVIEWED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    relatedTitle: 'Dark Secrets',
    assignedTo: 'sarahmod',
  },
  {
    id: '4',
    reporterId: 'user4',
    reporterName: 'Diana',
    reportType: 'USER',
    reason: 'SPAM',
    description: 'User is posting promotional links in comments.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    relatedTitle: 'User: spammer123',
  },
];

const roleConfig: Record<PlatformRole, { label: string; color: string; icon: typeof Shield }> = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Crown,
  },
  PLATFORM_MODERATOR: {
    label: 'Platform Mod',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ShieldCheck,
  },
  APPEAL_MODERATOR: {
    label: 'Appeal Mod',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Scale,
  },
  USER: { label: 'User', color: 'bg-slate-100 text-slate-800 border-slate-200', icon: Users },
};

const reportStatusConfig: Record<
  ReportStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  REVIEWED: { label: 'Reviewed', color: 'bg-blue-100 text-blue-800', icon: Eye },
  RESOLVED: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  DISMISSED: { label: 'Dismissed', color: 'bg-slate-100 text-slate-800', icon: AlertTriangle },
};

const reportTypeConfig: Record<ReportType, { label: string; icon: typeof FileText }> = {
  CHAPTER: { label: 'Chapter', icon: FileText },
  COMMENT: { label: 'Comment', icon: FileText },
  USER: { label: 'User', icon: Users },
  STORY: { label: 'Story', icon: FileText },
};

export function AdminSection() {
  const [users, setUsers] = useState(mockPlatformUsers);
  const [reports, setReports] = useState(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<PlatformRole | 'ALL'>('ALL');
  const [reportFilter, setReportFilter] = useState<ReportStatus | 'ALL'>('ALL');

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

  const handleReportAction = (reportId: string, action: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: action } : r)));
    toast.success(`Report marked as ${action.toLowerCase()}`);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredReports = reports.filter((report) => {
    return reportFilter === 'ALL' || report.status === reportFilter;
  });

  const stats = {
    totalModerators: users.filter((u) => u.role !== 'USER').length,
    pendingReports: reports.filter((r) => r.status === 'PENDING').length,
    bannedUsers: users.filter((u) => u.isBanned).length,
    resolvedToday: reports.filter(
      (r) => r.status === 'RESOLVED' && r.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground text-sm">Manage platform users, roles, and reports</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-500/10 p-3">
                <ShieldCheck className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalModerators}</p>
                <p className="text-muted-foreground text-sm">Moderators</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-yellow-500/10 p-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pendingReports}</p>
                <p className="text-muted-foreground text-sm">Pending Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-500/10 p-3">
                <Ban className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.bannedUsers}</p>
                <p className="text-muted-foreground text-sm">Banned Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-500/10 p-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.resolvedToday}</p>
                <p className="text-muted-foreground text-sm">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Platform Users
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <ShieldAlert className="h-4 w-4" />
            Reports
            {stats.pendingReports > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 px-1.5">
                {stats.pendingReports}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            Role Info
          </TabsTrigger>
        </TabsList>

        {/* Platform Users Tab */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Platform Users</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={roleFilter}
                    onValueChange={(v) => setRoleFilter(v as PlatformRole | 'ALL')}
                  >
                    <SelectTrigger className="w-[180px]">
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
              </div>
            </CardHeader>
            <CardContent>
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
                    <div className="py-12 text-center">
                      <Users className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                      <p className="text-muted-foreground text-sm">No users found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Content Reports</CardTitle>
                  <CardDescription>Review and manage reported content</CardDescription>
                </div>
                <Select
                  value={reportFilter}
                  onValueChange={(v) => setReportFilter(v as ReportStatus | 'ALL')}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Reports</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REVIEWED">Reviewed</SelectItem>
                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                    <SelectItem value="DISMISSED">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filteredReports.map((report) => (
                    <ReportCard key={report.id} report={report} onAction={handleReportAction} />
                  ))}
                  {filteredReports.length === 0 && (
                    <div className="py-12 text-center">
                      <CheckCircle className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                      <p className="text-muted-foreground text-sm">No reports found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role Info Tab */}
        <TabsContent value="roles" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platform Role Hierarchy</CardTitle>
              <CardDescription>
                Understanding the different platform roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Super Admin */}
              <RoleInfoCard
                role="SUPER_ADMIN"
                permissions={[
                  'Full platform control',
                  'Ban and unban users',
                  'View and manage all reports',
                  'Delete any content',
                  'Review and approve/reject appeals',
                  'Manage all roles',
                  'Assign moderators',
                  'Access admin panel',
                  'View platform analytics',
                  'Manage platform settings',
                  'Manage featured content',
                ]}
              />

              {/* Platform Moderator */}
              <RoleInfoCard
                role="PLATFORM_MODERATOR"
                permissions={[
                  'Ban users (temporary)',
                  'View all reports',
                  'Delete any content',
                  'Review appeals',
                  'Reject and escalate appeals',
                  'Access admin panel',
                ]}
              />

              {/* Appeal Moderator */}
              <RoleInfoCard
                role="APPEAL_MODERATOR"
                permissions={[
                  'Unban users',
                  'View all reports',
                  'Review appeals',
                  'Approve and reject appeals',
                  'Escalate appeals',
                  'Access admin panel',
                ]}
              />

              {/* User */}
              <RoleInfoCard
                role="USER"
                permissions={[
                  'Standard user account',
                  'Create and manage own content',
                  'Report content violations',
                  'Submit ban appeals',
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface UserCardProps {
  user: PlatformUser;
  onRoleChange: (userId: string, role: PlatformRole) => void;
  onBan: (userId: string) => void;
  onUnban: (userId: string) => void;
}

function UserCard({ user, onRoleChange, onBan, onUnban }: UserCardProps) {
  const roleInfo = roleConfig[user.role];
  const RoleIcon = roleInfo.icon;

  return (
    <div
      className={cn(
        'bg-card flex items-center gap-4 rounded-lg border p-4',
        user.isBanned && 'bg-destructive/5 border-destructive/20'
      )}
    >
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
          {user.isBanned && (
            <Badge variant="destructive" className="text-xs">
              Banned
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground text-sm">@{user.username}</p>
        <p className="text-muted-foreground text-xs">{user.email}</p>
      </div>

      <Badge variant="outline" className={cn('gap-1', roleInfo.color)}>
        <RoleIcon className="h-3 w-3" />
        {roleInfo.label}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onRoleChange(user.id, 'PLATFORM_MODERATOR')}
            disabled={user.role === 'SUPER_ADMIN'}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Make Platform Mod
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRoleChange(user.id, 'APPEAL_MODERATOR')}
            disabled={user.role === 'SUPER_ADMIN'}
          >
            <Scale className="mr-2 h-4 w-4" />
            Make Appeal Mod
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onRoleChange(user.id, 'USER')}
            disabled={user.role === 'SUPER_ADMIN'}
          >
            <Users className="mr-2 h-4 w-4" />
            Remove Mod Role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.isBanned ? (
            <DropdownMenuItem onClick={() => onUnban(user.id)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Unban User
            </DropdownMenuItem>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive"
                  disabled={user.role === 'SUPER_ADMIN'}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Ban User
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ban User</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to ban {user.name}? They will not be able to access the
                    platform until unbanned.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onBan(user.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Ban User
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface ReportCardProps {
  report: Report;
  onAction: (reportId: string, action: ReportStatus) => void;
}

function ReportCard({ report, onAction }: ReportCardProps) {
  const statusInfo = reportStatusConfig[report.status];
  const typeInfo = reportTypeConfig[report.reportType];
  const StatusIcon = statusInfo.icon;
  const TypeIcon = typeInfo.icon;

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <TypeIcon className="h-3 w-3" />
            {typeInfo.label}
          </Badge>
          <Badge variant="secondary">{report.reason.replace('_', ' ')}</Badge>
          <Badge className={statusInfo.color}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {statusInfo.label}
          </Badge>
        </div>
        <span className="text-muted-foreground text-xs">
          {formatDistanceToNow(report.createdAt, { addSuffix: true })}
        </span>
      </div>

      <p className="mb-1 text-sm font-medium">{report.relatedTitle}</p>
      <p className="text-muted-foreground mb-3 text-sm">{report.description}</p>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">Reported by: {report.reporterName}</p>

        {report.status === 'PENDING' && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction(report.id, 'REVIEWED')}>
              <Eye className="mr-1 h-4 w-4" />
              Review
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAction(report.id, 'DISMISSED')}>
              Dismiss
            </Button>
            <Button size="sm" onClick={() => onAction(report.id, 'RESOLVED')}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Resolve
            </Button>
          </div>
        )}

        {report.status === 'REVIEWED' && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onAction(report.id, 'DISMISSED')}>
              Dismiss
            </Button>
            <Button size="sm" onClick={() => onAction(report.id, 'RESOLVED')}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Resolve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface RoleInfoCardProps {
  role: PlatformRole;
  permissions: string[];
}

function RoleInfoCard({ role, permissions }: RoleInfoCardProps) {
  const roleInfo = roleConfig[role];
  const RoleIcon = roleInfo.icon;

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className={cn('rounded-lg p-2', roleInfo.color)}>
          <RoleIcon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium">{roleInfo.label}</h4>
          <p className="text-muted-foreground text-sm">
            {role === 'SUPER_ADMIN' && 'Full platform control'}
            {role === 'PLATFORM_MODERATOR' && 'Moderate content across all stories'}
            {role === 'APPEAL_MODERATOR' && 'Review and decide on ban appeals'}
            {role === 'USER' && 'Standard user account'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {permissions.map((permission, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-3 w-3 shrink-0 text-green-500" />
            <span className="text-muted-foreground">{permission}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSection;
