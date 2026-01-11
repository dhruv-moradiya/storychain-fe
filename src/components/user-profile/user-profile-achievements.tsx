import { motion } from 'framer-motion';
import { Award, Sparkles, Flame, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserProfileAchievementsProps {
  badges: Badge[];
}

const rarityConfig = {
  common: {
    bg: 'bg-badge-gray-bg',
    border: 'border-badge-gray-border',
    text: 'text-badge-gray',
    icon: Award,
    glow: '',
  },
  rare: {
    bg: 'bg-badge-info-bg',
    border: 'border-badge-info-border',
    text: 'text-badge-info',
    icon: Star,
    glow: 'shadow-[0_0_12px_rgba(59,130,246,0.3)]',
  },
  epic: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-500',
    icon: Flame,
    glow: 'shadow-[0_0_16px_rgba(168,85,247,0.4)]',
  },
  legendary: {
    bg: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-600',
    icon: Trophy,
    glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
  },
};

function UserProfileAchievements({ badges }: UserProfileAchievementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-border/50 rounded-xl border p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Achievements</h3>
        <span className="text-text-secondary-65 flex items-center gap-1 text-xs">
          <Sparkles className="h-3.5 w-3.5" />
          {badges.length} badges
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {badges.map((badge, index) => {
          const config = rarityConfig[badge.rarity];
          const Icon = config.icon;

          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                'flex items-center gap-2 rounded-lg border p-2',
                config.bg,
                config.border,
                config.glow,
                'cursor-pointer transition-all'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
                  badge.rarity === 'legendary'
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                    : badge.rarity === 'epic'
                      ? 'bg-purple-500'
                      : badge.rarity === 'rare'
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                )}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn('truncate text-xs font-medium', config.text)}>{badge.name}</p>
                <p className="text-text-secondary-65 text-[10px] capitalize">{badge.rarity}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="text-brand-pink-500 mt-3 w-full text-center text-xs hover:underline">
        View all achievements →
      </button>
    </motion.div>
  );
}

export { UserProfileAchievements };
