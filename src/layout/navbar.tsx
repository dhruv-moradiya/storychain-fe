import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { exploreItems } from '@/mock-data/navbar';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        'bg-muted/40 z-40 w-full border-b backdrop-blur-md',
        !isSignedIn && 'sticky top-0'
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        {/* LEFT — Brand + Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-base font-semibold tracking-tight">
            StoryChain
          </Link>

          {isSignedIn && (
            <ul className="text-muted-foreground hidden items-center gap-5 text-sm md:flex">
              <li
                onClick={() => navigate('/dashboard')}
                className="hover:text-foreground cursor-pointer transition"
              >
                Dashboard
              </li>

              {/* Explore Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-foreground transition">
                  Explore
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-72 rounded-md p-2">
                  {exploreItems.map((item) => (
                    <DropdownMenuItem
                      key={item.to}
                      onClick={() => navigate(item.to)}
                      className="hover:bg-muted cursor-pointer rounded-md px-3 py-2"
                    >
                      <div className="flex items-start gap-3">
                        <item.icon className="text-muted-foreground h-4 w-4" />
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-muted-foreground line-clamp-2 text-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          )}
        </div>

        {/* RIGHT — Profile / Sign in */}
        {isSignedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileTap={{ scale: 0.96 }}
                  className="bg-muted mr-1 h-8 w-8 cursor-pointer rounded-full border"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-background w-56 rounded-lg border p-1">
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
                  className="text-red-500"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
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
