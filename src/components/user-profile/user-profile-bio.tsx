import { motion } from 'framer-motion';
import { Twitter, Instagram, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileBioProps {
  user: {
    bio: string;
    website?: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
    };
  };
}

function UserProfileBio({ user }: UserProfileBioProps) {
  const socialLinks = [
    {
      key: 'twitter',
      icon: Twitter,
      href: user.socialLinks?.twitter ? `https://twitter.com/${user.socialLinks.twitter}` : null,
      label: user.socialLinks?.twitter,
    },
    {
      key: 'instagram',
      icon: Instagram,
      href: user.socialLinks?.instagram
        ? `https://instagram.com/${user.socialLinks.instagram}`
        : null,
      label: user.socialLinks?.instagram,
    },
    {
      key: 'website',
      icon: Globe,
      href: user.website,
      label: 'Website',
    },
  ].filter((link) => link.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="border-border/50 rounded-xl border p-5"
    >
      <h3 className="text-text-primary mb-3 font-semibold">About</h3>

      <p className="text-text-secondary text-sm leading-relaxed">{user.bio}</p>

      {socialLinks.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.key}
                href={link.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5',
                  'border-border/50 bg-muted/30 text-text-secondary-65 border text-sm',
                  'hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 hover:text-brand-pink-500 transition-all'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileBio };
