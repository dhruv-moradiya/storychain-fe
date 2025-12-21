import { Outlet } from 'react-router';
import Navbar from './navbar';
import { useUserProfile } from '@/api/user.api';

const Layout = () => {
  const { data: user } = useUserProfile();

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
