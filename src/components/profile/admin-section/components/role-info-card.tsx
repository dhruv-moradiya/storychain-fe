import { cn } from '@/lib/utils';
import { CheckCircle, Crown, Scale, ShieldCheck, Users } from 'lucide-react';
import type { PlatformRole } from '../admin.types';

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

interface RoleInfoCardProps {
  role: PlatformRole;
  permissions: string[];
}

export function RoleInfoCard({ role, permissions }: RoleInfoCardProps) {
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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
