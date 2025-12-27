import { Outlet, useLocation } from 'react-router';
import Navbar from './navbar';

const Layout = () => {
  const location = useLocation();

  // Don't show navbar on home page - it has its own header
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      {!isHomePage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
