import { Outlet, useLocation } from 'react-router';
import { Analytics } from '@vercel/analytics/react';
import { useUserProfile } from '@/hooks/users/user.queries';
import Navbar from './navbar';

const Layout = () => {
  const location = useLocation();

  // Fetch user profile for authenticated users (the hook handles auth check internally)
  useUserProfile();

  // Don't show navbar on home page - it has its own header
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      {!isHomePage && <Navbar />}
      {/* Add padding-top to account for fixed navbar */}
      <main className={`bg-bg-cream flex-1 ${!isHomePage ? 'pt-14' : ''}`}>
        <Outlet />
        <Analytics />
      </main>
    </div>
  );
};

export default Layout;
