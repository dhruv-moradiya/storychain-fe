import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Compass, Feather, LayoutDashboard } from 'lucide-react';
import { NavItem } from '@/components/common';

export default function Navbar() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        'sticky top-0 z-40 w-full',
        'border-border/50 border-b',
        'bg-bg-cream/70 backdrop-blur-md'
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-6">
        {/* LEFT */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
          <span className="text-[18px] font-semibold tracking-tight">StoryChain</span>
        </Link>

        {isSignedIn && (
          <ul className="hidden items-center gap-2 md:flex">
            <NavItem to="/dashboard" label="Dashboard" icon={<LayoutDashboard size={16} />} />
            <NavItem to="/explore" label="Explore" icon={<Compass size={16} />} />
            <NavItem to="/" label="Builder" icon={<Feather size={16} />} />
          </ul>
        )}

        {/* RIGHT */}
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileTap={{ scale: 0.96 }}
                className={cn(
                  'relative h-8 w-8 cursor-pointer overflow-hidden rounded-full',
                  'border-border/50 bg-muted/60 border backdrop-blur-sm'
                )}
              >
                <img
                  src="https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg"
                  alt="Profile Pic"
                />
              </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-background/80 w-56 rounded-xl border p-1 shadow-xl backdrop-blur-xl"
            >
              <DropdownMenuItem className="cursor-default select-none">
                <div className="flex flex-col">
                  <span className="font-medium">{user.fullName || 'Your Profile'}</span>
                  <span className="text-muted-foreground text-xs">
                    {user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>

              <DropdownMenuItem>Settings</DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: '/sign-in' })}
                className="text-red-500 focus:text-red-500"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/sign-in"
            className="text-muted-foreground hover:text-foreground text-sm transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
