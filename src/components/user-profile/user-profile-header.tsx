import { motion } from 'framer-motion';
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  BadgeCheck,
  Crown,
  Settings,
  UserPlus,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserProfileHeaderProps {
  user: {
    username: string;
    fullName: string;
    avatarUrl: string;
    coverUrl: string;
    location?: string;
    website?: string;
    joinedAt: Date;
    isVerified: boolean;
    isPro: boolean;
    stats: {
      followers: number;
      following: number;
    };
  };
}

function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const isOwnProfile = true; // In real app, compare with current user

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden rounded-b-2xl sm:h-56 lg:h-64">
        <img src={user.coverUrl} alt="Cover" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative -mt-16 sm:-mt-20"
          >
            <div
              className={cn(
                'h-32 w-32 overflow-hidden rounded-2xl border-4 sm:h-36 sm:w-36',
                'border-bg-cream bg-white shadow-xl'
              )}
            >
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="h-full w-full object-cover"
              />
            </div>
            {user.isPro && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="from-brand-orange to-brand-pink-500 absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg"
              >
                <Crown className="h-4 w-4 text-white" />
              </motion.div>
            )}
          </motion.div>

          {/* Name and Info */}
          <div className="mt-4 flex-1 text-center sm:mt-0 sm:pb-2 sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <h1 className="text-text-primary text-2xl font-bold sm:text-3xl">{user.fullName}</h1>
              {user.isVerified && <BadgeCheck className="text-brand-pink-500 h-6 w-6" />}
            </div>
            <p className="text-text-secondary-65 mt-1">@{user.username}</p>

            {/* Meta Info */}
            <div className="text-text-secondary-65 mt-3 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </span>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-pink-500 flex items-center gap-1 hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  Website
                </a>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined{' '}
                {user.joinedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2 sm:mt-0 sm:pb-2">
            {isOwnProfile ? (
              <Button
                variant="outline"
                className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 gap-2"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button className="from-brand-pink-500 to-brand-orange gap-2 bg-gradient-to-r text-white hover:opacity-90">
                  <UserPlus className="h-4 w-4" />
                  Follow
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Followers/Following */}
        <div className="border-border/30 mt-4 flex justify-center gap-6 border-t pt-4 sm:justify-start sm:border-0 sm:pt-0">
          <button className="group flex items-center gap-1.5">
            <span className="text-text-primary group-hover:text-brand-pink-500 font-semibold">
              {user.stats.followers.toLocaleString()}
            </span>
            <span className="text-text-secondary-65 text-sm">Followers</span>
          </button>
          <button className="group flex items-center gap-1.5">
            <span className="text-text-primary group-hover:text-brand-pink-500 font-semibold">
              {user.stats.following.toLocaleString()}
            </span>
            <span className="text-text-secondary-65 text-sm">Following</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { UserProfileHeader };
