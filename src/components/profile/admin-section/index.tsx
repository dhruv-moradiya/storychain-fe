import { Link, useLocation, Outlet } from 'react-router';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, ShieldAlert, Info } from 'lucide-react';

const adminTabs = [
  { key: 'users', label: 'Users', path: '', icon: Users },
  { key: 'reports', label: 'Reports', path: 'reports', icon: ShieldAlert },
  { key: 'roles', label: 'Role Info', path: 'roles', icon: Info },
];

// Mock stats - in real app would come from API
const stats = {
  pendingReports: 2,
};

export function AdminSection() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];

  const getActiveTab = () => {
    if (lastPart === 'reports') return 'reports';
    if (lastPart === 'roles') return 'roles';
    return 'users';
  };

  const activeTab = getActiveTab();

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
          <Shield className="text-brand-pink-500 h-5 w-5" />
        </div>
        <div>
          <h1 className="text-text-primary text-lg font-semibold tracking-tight">Admin Panel</h1>
          <p className="text-text-secondary-65 text-sm">
            Manage platform users, roles, and reports
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-border/50 inline-flex items-center gap-1 rounded-lg bg-white/50 p-1">
        {adminTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const showBadge = tab.key === 'reports' && stats.pendingReports > 0;
          return (
            <Link
              key={tab.key}
              to={tab.path ? `/profile/admin/${tab.path}` : '/profile/admin'}
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-brand-pink-500 text-white'
                  : 'text-text-secondary-65 hover:bg-brand-pink-500/10 hover:text-text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {showBadge && (
                <Badge
                  variant={isActive ? 'secondary' : 'destructive'}
                  className={cn('ml-1 h-5 px-1.5', isActive && 'bg-white/20 text-white')}
                >
                  {stats.pendingReports}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <Outlet />
    </section>
  );
}

export default AdminSection;
