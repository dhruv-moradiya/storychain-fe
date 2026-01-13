import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info, Shield, ShieldCheck, ShieldAlert, User } from 'lucide-react';

const roleInfo = [
  {
    role: 'SUPER_ADMIN',
    label: 'Super Admin',
    icon: Shield,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    badgeVariant: 'destructive' as const,
    description: 'Full platform access with all administrative capabilities.',
    permissions: [
      'Manage all users and roles',
      'Access all platform settings',
      'Review and resolve all reports',
      'Ban/unban users',
      'Assign moderator roles',
      'View platform analytics',
      'Manage content policies',
    ],
  },
  {
    role: 'PLATFORM_MODERATOR',
    label: 'Platform Moderator',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    badgeVariant: 'default' as const,
    description: 'Moderates content and handles user reports across the platform.',
    permissions: [
      'Review reported content',
      'Remove inappropriate content',
      'Issue warnings to users',
      'Escalate issues to admins',
      'View user activity logs',
      'Moderate comments and stories',
    ],
  },
  {
    role: 'APPEAL_MODERATOR',
    label: 'Appeal Moderator',
    icon: ShieldAlert,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    badgeVariant: 'secondary' as const,
    description: 'Handles user appeals and reviews moderation decisions.',
    permissions: [
      'Review user appeals',
      'Overturn moderation decisions',
      'Communicate with affected users',
      'Escalate complex cases',
      'Document appeal outcomes',
    ],
  },
  {
    role: 'USER',
    label: 'Regular User',
    icon: User,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    badgeVariant: 'outline' as const,
    description: 'Standard user with basic platform access.',
    permissions: [
      'Create and publish stories',
      'Comment on stories',
      'Follow other users',
      'Report inappropriate content',
      'Manage own profile',
      'Participate in collaborations',
    ],
  },
];

export function AdminRoles() {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="border-border/50 bg-cream-95 flex items-start gap-3 rounded-xl border p-4">
        <div className="bg-brand-pink-500/10 rounded-lg p-2">
          <Info className="text-brand-pink-500 h-4 w-4" />
        </div>
        <div>
          <h3 className="text-text-primary text-sm font-medium">Role Information</h3>
          <p className="text-text-secondary-65 text-sm">
            This page provides an overview of all platform roles and their associated permissions.
            Role assignments can be managed in the Users tab.
          </p>
        </div>
      </div>

      {/* Roles List */}
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {roleInfo.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.role} className="border-border/50 bg-cream-95 rounded-xl border p-5">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${role.bgColor}`}>
                      <Icon className={`h-5 w-5 ${role.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-text-primary font-semibold">{role.label}</h3>
                        <Badge variant={role.badgeVariant} className="text-xs">
                          {role.role.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-text-secondary-65 mt-1 text-sm">{role.description}</p>
                    </div>
                  </div>
                </div>

                <div className="border-border/30 rounded-lg border bg-white/50 p-4">
                  <h4 className="text-text-primary mb-3 text-sm font-medium">Permissions</h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {role.permissions.map((permission, index) => (
                      <li
                        key={index}
                        className="text-text-secondary-65 flex items-center gap-2 text-sm"
                      >
                        <div className="bg-brand-pink-500 h-1.5 w-1.5 rounded-full" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

export default AdminRoles;
