import { User } from 'lucide-react';
import { ProfileCard } from './components/profile-card';
import { SecurityCard } from './components/security-card';
import { SessionsCard } from './components/sessions-card';
import { DangerZoneCard } from './components/danger-zone-card';

export function GeneralSection() {
  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
          <User className="text-brand-pink-500 h-5 w-5" />
        </div>
        <div>
          <h1 className="text-text-primary text-lg font-semibold tracking-tight">
            General Settings
          </h1>
          <p className="text-text-secondary-65 text-sm">
            Manage your account details and security settings
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <ProfileCard />

      {/* Security Card */}
      <SecurityCard />

      {/* Sessions Card */}
      <SessionsCard />

      {/* Danger Zone Card */}
      <DangerZoneCard />
    </section>
  );
}

export default GeneralSection;
