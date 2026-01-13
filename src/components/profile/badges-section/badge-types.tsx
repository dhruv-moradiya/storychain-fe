import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { BadgeItem } from './badges.types';

// Rarity configurations using theme colors
export const rarityConfig = {
  common: {
    bg: 'bg-badge-gray-bg',
    text: 'text-badge-gray',
    border: 'border-badge-gray-border',
    gradient: 'from-slate-100 to-slate-200',
  },
  rare: {
    bg: 'bg-badge-info-bg',
    text: 'text-badge-info',
    border: 'border-badge-info-border',
    gradient: 'from-blue-100 to-blue-200',
  },
  epic: {
    bg: 'bg-badge-purple-bg',
    text: 'text-badge-purple',
    border: 'border-badge-purple-border',
    gradient: 'from-purple-100 to-purple-200',
  },
  legendary: {
    bg: 'bg-badge-amber-bg',
    text: 'text-badge-amber',
    border: 'border-badge-amber-border',
    gradient: 'from-amber-100 to-amber-200',
  },
};

// Common Badge - Simple and clean
export const CommonBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.common;

  return (
    <div
      className={cn(
        'relative flex items-start gap-4 rounded-xl border p-4 transition-colors',
        badge.earned
          ? 'border-border/50 bg-cream-95 hover:border-badge-gray'
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl',
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
    </div>
  );
};

// Rare Badge - Blue accent
export const RareBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.rare;

  return (
    <div
      className={cn(
        'relative flex items-start gap-4 rounded-xl border p-4 transition-colors',
        badge.earned
          ? 'border-badge-info/30 from-cream-95 to-badge-info-bg/30 hover:border-badge-info bg-gradient-to-br'
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl',
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
            Rare
          </span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </div>
  );
};

// Epic Badge - Purple accent
export const EpicBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.epic;

  return (
    <div
      className={cn(
        'relative flex items-start gap-4 rounded-xl border-2 p-4 transition-colors',
        badge.earned
          ? 'border-badge-purple/40 from-cream-95 via-badge-purple-bg/20 to-brand-pink-500/5 hover:border-badge-purple bg-gradient-to-br'
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl',
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
            Epic
          </span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </div>
  );
};

// Legendary Badge - Gold accent
export const LegendaryBadge = ({ badge }: { badge: BadgeItem }) => {
  const Icon = badge.icon;
  const config = rarityConfig.legendary;

  return (
    <div
      className={cn(
        'relative flex items-start gap-4 rounded-xl border-2 p-4 transition-colors',
        badge.earned
          ? 'border-badge-amber/50 from-cream-95 via-badge-amber-bg/30 to-brand-orange/10 hover:border-badge-amber bg-gradient-to-br'
          : 'border-border/30 bg-muted/20 opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl',
          badge.earned
            ? 'bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200'
            : 'bg-muted/50'
        )}
      >
        {badge.earned ? (
          <Icon className="h-7 w-7 text-amber-600" />
        ) : (
          <Lock className="text-text-secondary-65 h-6 w-6" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-sm font-bold text-transparent">
            {badge.name}
          </h4>
          <span
            className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', config.bg, config.text)}
          >
            Legendary
          </span>
        </div>
        <p className="text-text-secondary-65 mb-2 text-xs">{badge.description}</p>
        <BadgeFooter badge={badge} />
      </div>
    </div>
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
