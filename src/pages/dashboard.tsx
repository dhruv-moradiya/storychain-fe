import { Routes, Route, Navigate } from 'react-router';
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs';

import NotificationSection from '@/components/dashboard/sections/notification-section';
import StoriesSection from '@/components/dashboard/sections/stories-section';
import { MyChaptersSection } from '@/components/dashboard/sections/my-chapters-section';

const Dashboard = () => {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <DashboardTabs />

      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="stories" />} />

          <Route path="stories" element={<StoriesSection />} />
          <Route path="my-chapters" element={<MyChaptersSection />} />
          <Route path="notification" element={<NotificationSection />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
