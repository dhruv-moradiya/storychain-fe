import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { BadgeItem } from './badges.types';

// Rarity configurations using theme colors
export const rarityConfig = {
  common: {
    bg: 'bg-badge-gray-bg',
    text: 'text-badge-gray',
    border: 'border-badge-gray-border',
    glow: '',
    gradient: 'from-slate-100 to-slate-200',
  },
  rare: {
    bg: 'bg-badge-info-bg',
    text: 'text-badge-info',
    border: 'border-badge-info-border',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    gradient: 'from-blue-100 to-blue-200',
  },
  epic: {
    bg: 'bg-badge-purple-bg',
    text: 'text-badge-purple',
    border: 'border-badge-purple-border',
    glow: 'shadow-[0_0_25px_rgba(139,92,246,0.4)]',
    gradient: 'from-purple-100 to-purple-200',
  },
  legendary: {
    bg: 'bg-badge-amber-bg',
    text: 'text-badge-amber',
    border: 'border-badge-amber-border',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',
    gradient: 'from-amber-100 to-amber-200',
  },
};

// Common Badge - Simple and clean
export const CommonBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.common;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex items-start gap-4 rounded-xl border p-4 transition-all duration-300',
        badge.earned
          ? 'border-border/50 bg-cream-95 hover:border-badge-gray/30 hover:shadow-md'
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all',
          badge.earned ? `bg-gradient-to-br ${config.gradient}` : 'bg-muted/50'
        )}
      >
        {badge.earned ? (
          <Icon className={cn('h-6 w-6', config.text)} />
        ) : (
          <Lock className="text-text-secondary-65 h-5 w-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-text-primary text-sm font-semibold">{badge.name}</h4>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-medium',
              config.bg,
              config.text
            )}
          >
            Common
          </span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </motion.div>
  );
};

// Rare Badge - Blue glow effect
export const RareBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.rare;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex items-start gap-4 rounded-xl border p-4 transition-all duration-300',
        badge.earned
          ? `border-badge-info/30 from-cream-95 to-badge-info-bg/30 bg-gradient-to-br hover:${config.glow}`
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      {badge.earned && (
        <div className="absolute -top-1 -right-1">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-badge-info h-4 w-4" />
          </motion.div>
        </div>
      )}

      <div
        className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all',
          badge.earned ? `bg-gradient-to-br ${config.gradient} ${config.glow}` : 'bg-muted/50'
        )}
      >
        {badge.earned ? (
          <Icon className={cn('h-6 w-6', config.text)} />
        ) : (
          <Lock className="text-text-secondary-65 h-5 w-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-text-primary text-sm font-semibold">{badge.name}</h4>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-medium',
              config.bg,
              config.text
            )}
          >
            Rare
          </span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </motion.div>
  );
};

// Epic Badge - Purple glow with animation
export const EpicBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.epic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex items-start gap-4 rounded-xl border-2 p-4 transition-all duration-300',
        badge.earned
          ? `border-badge-purple/40 from-cream-95 via-badge-purple-bg/20 to-brand-pink-500/5 bg-gradient-to-br hover:${config.glow}`
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      {badge.earned && (
        <>
          <motion.div
            className="from-badge-purple/5 to-brand-pink-500/5 absolute inset-0 rounded-xl bg-gradient-to-r"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="absolute -top-1 -right-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="text-badge-purple h-5 w-5" />
            </motion.div>
          </div>
        </>
      )}

      <div
        className={cn(
          'relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all',
          badge.earned ? `bg-gradient-to-br ${config.gradient} ${config.glow}` : 'bg-muted/50'
        )}
      >
        {badge.earned ? (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Icon className={cn('h-6 w-6', config.text)} />
          </motion.div>
        ) : (
          <Lock className="text-text-secondary-65 h-5 w-5" />
        )}
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-text-primary text-sm font-semibold">{badge.name}</h4>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-medium',
              config.bg,
              config.text
            )}
          >
            Epic
          </span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </motion.div>
  );
};

// Legendary Badge - Gold glow with special effects
export const LegendaryBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.legendary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex items-start gap-4 overflow-hidden rounded-xl border-2 p-4 transition-all duration-300',
        badge.earned
          ? `border-badge-amber/50 from-cream-95 via-badge-amber-bg/30 to-brand-orange/10 bg-gradient-to-br ${config.glow}`
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      {badge.earned && (
        <>
          {/* Animated background shimmer */}
          <motion.div
            className="via-badge-amber/10 absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Multiple sparkles */}
          <motion.div
            className="absolute top-1 right-1"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="text-badge-amber h-5 w-5" />
          </motion.div>
          <motion.div
            className="absolute top-3 right-8"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="text-brand-orange h-3 w-3" />
          </motion.div>
        </>
      )}

      <div
        className={cn(
          'relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl transition-all',
          badge.earned
            ? `bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200 ${config.glow}`
            : 'bg-muted/50'
        )}
      >
        {badge.earned ? (
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon className="h-7 w-7 text-amber-600" />
          </motion.div>
        ) : (
          <Lock className="text-text-secondary-65 h-6 w-6" />
        )}
      </div>

      <div className="relative z-10 min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-sm font-bold text-transparent">
            {badge.name}
          </h4>
          <motion.span
            className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', config.bg, config.text)}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Legendary
          </motion.span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </motion.div>
  );
};

// Shared footer component for earned date or progress
const BadgeFooter = ({ badge }: { badge: BadgeItem }) => {
  if (badge.earned && badge.earnedAt) {
    return (
      <p className="text-text-secondary-65 text-[11px]">
        Earned on{' '}
        {badge.earnedAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    );
  }

  if (!badge.earned && badge.progress !== undefined && badge.maxProgress !== undefined) {
    const percentage = (badge.progress / badge.maxProgress) * 100;
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-text-secondary-65">Progress</span>
          <span className="text-text-secondary font-medium">
            {badge.progress} / {badge.maxProgress}
          </span>
        </div>
        <Progress value={percentage} className="h-1.5" />
      </div>
    );
  }

  return null;
};

// Badge renderer that picks the right component
export const BadgeCard = ({ badge }: { badge: BadgeItem }) => {
  switch (badge.rarity) {
    case 'legendary':
      return <LegendaryBadge badge={badge} />;
    case 'epic':
      return <EpicBadge badge={badge} />;
    case 'rare':
      return <RareBadge badge={badge} />;
    default:
      return <CommonBadge badge={badge} />;
  }
};
