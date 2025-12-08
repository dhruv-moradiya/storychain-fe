import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import UserProfile from "@/components/layout/profile/user-profile";
import { exploreItems } from "@/mock-data/navbar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        "w-full border-b bg-muted/40 backdrop-blur-md z-40",
        !isSignedIn && "sticky top-0"
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        {/* LEFT — Brand + Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-base font-semibold tracking-tight">
            StoryChain
          </Link>

          {isSignedIn && (
            <ul className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
              <li
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer hover:text-foreground transition"
              >
                Dashboard
              </li>

              {/* Explore Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-foreground transition">
                  Explore
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-72 p-2 rounded-md">
                  {exploreItems.map((item) => (
                    <DropdownMenuItem
                      key={item.to}
                      onClick={() => navigate(item.to)}
                      className="cursor-pointer px-3 py-2 rounded-md hover:bg-muted"
                    >
                      <div className="flex items-start gap-3">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
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
                  className="h-8 w-8 mr-1 rounded-full bg-muted cursor-pointer border"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 p-1 rounded-lg border bg-background"
              >
                <DropdownMenuItem className="cursor-default select-none">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {user.fullName || "Your Profile"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>Settings</DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => signOut({ redirectUrl: "/sign-in" })}
                  className="text-red-500"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserProfile open={isProfileOpen} onOpenChange={setIsProfileOpen} />
          </>
        ) : (
          <Link
            to="/sign-in"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
