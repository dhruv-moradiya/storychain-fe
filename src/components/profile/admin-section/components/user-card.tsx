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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Ban, CheckCircle, Crown, MoreHorizontal, Scale, ShieldCheck, Users } from 'lucide-react';
import type { PlatformUser, PlatformRole } from '../admin.types';

const roleConfig: Record<PlatformRole, { label: string; color: string; icon: typeof Crown }> = {
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

interface UserCardProps {
  user: PlatformUser;
  onRoleChange: (userId: string, role: PlatformRole) => void;
  onBan: (userId: string) => void;
  onUnban: (userId: string) => void;
}

export function UserCard({ user, onRoleChange, onBan, onUnban }: UserCardProps) {
  const roleInfo = roleConfig[user.role];
  const RoleIcon = roleInfo.icon;

  return (
    <div
      className={cn(
        'border-border/50 bg-cream-95/50 hover:border-brand-pink-500/30 hover:bg-cream-95 flex items-center gap-4 rounded-lg border p-4 transition-colors',
        user.isBanned && 'bg-destructive/5 border-destructive/20 hover:bg-destructive/10'
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
