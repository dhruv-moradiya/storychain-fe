import { Outlet } from 'react-router';
import { ProfileTabs } from './profile-tabs';

export function ProfileLayout() {
  return (
    <div className="relative mx-auto w-full space-y-8">
      <ProfileTabs />
      <div className="container mx-auto max-w-4xl px-3 pb-14 sm:px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
