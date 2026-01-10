import * as React from 'react';
import { cn } from '@/lib/utils';
import { createBadge } from './badge';
import { badgeColors } from './colors';
import type { BadgeGroupProps } from './types';

const gapClasses = {
  xs: 'gap-1',
  sm: 'gap-1.5',
  md: 'gap-2',
} as const;

/**
 * BadgeGroup component for displaying multiple badges together
 */
export function BadgeGroup({ badges, max, className, gap = 'sm' }: BadgeGroupProps) {
  const displayBadges = max ? badges.slice(0, max) : badges;
  const remaining = max && badges.length > max ? badges.length - max : 0;

  return (
    <div className={cn('flex flex-wrap items-center', gapClasses[gap], className)}>
      {displayBadges.map((badge, index) => (
        <React.Fragment key={index}>{createBadge(badge)}</React.Fragment>
      ))}
      {remaining > 0 && (
        <span
          className="inline-flex items-center justify-center rounded-full px-2 py-0.5 font-mono text-xs"
          style={{
            backgroundColor: badgeColors.gray.bg,
            color: badgeColors.gray.text,
          }}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
}

export default BadgeGroup;
