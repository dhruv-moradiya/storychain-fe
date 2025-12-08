import { Routes, Route, Navigate } from 'react-router';
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs';

import AccountSection from '@/components/dashboard/sections/account-section';
import NotificationSection from '@/components/dashboard/sections/notification-section';
import StoriesSection from '@/components/dashboard/sections/stories-section';

const Dashboard = () => {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <DashboardTabs />

      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="stories" />} />

          <Route path="stories" element={<StoriesSection />} />
          <Route path="notification" element={<NotificationSection />} />
          <Route path="account" element={<AccountSection />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
