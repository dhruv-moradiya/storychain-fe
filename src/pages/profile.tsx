import { useState } from 'react';

import { Sidebar, type ProfileSection } from '@/components/profile/sidebar';
import GeneralSection from '@/components/profile/general-section';
import StoriesSection from '@/components/profile/stories-section';
import NotificationsSection from '@/components/profile/notifications-section';
import SettingsSection from '@/components/profile/settings-section';
import BadgesSection from '@/components/profile/badges-section';
import FollowingSection from '@/components/profile/following-section';
import MyReportsSection from '@/components/profile/my-reports-section';
import AdminSection from '@/components/profile/admin-section';

export default function Profile() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('general');

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSection />;
      case 'stories':
        return <StoriesSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'settings':
        return <SettingsSection />;
      case 'badges':
        return <BadgesSection />;
      case 'following':
        return <FollowingSection />;
      case 'my-reports':
        return <MyReportsSection />;
      case 'admin':
        return <AdminSection />;
      default:
        return <GeneralSection />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      {/* <header className="border-b px-6 py-4">
        <h1 className="text-lg font-semibold tracking-tight">Account</h1>
        <p className="text-sm opacity-80">Manage your profile, stories and preferences</p>
      </header> */}

      <div className="flex flex-1 overflow-hidden">
        <aside className="bg-muted/30 w-56 shrink-0 border-r px-2 py-4 pb-0">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
}
