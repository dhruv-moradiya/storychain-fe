import * as React from 'react';
import { createBadge } from './badge';
import type { BadgeConfig } from './types';

/**
 * Creates a reusable badge component factory
 * Returns a component that can be used with different labels
 */
export function createBadgeFactory(
  defaultConfig: Omit<BadgeConfig, 'label'>
): React.FC<{ label: string } & Partial<Omit<BadgeConfig, 'label'>>> {
  return function FactoryBadge({ label, ...overrides }) {
    return createBadge({ ...defaultConfig, ...overrides, label });
  };
}

// ============================================================
// PRE-BUILT BADGE FACTORIES
// Common badge types ready to use
// ============================================================

// Status badges
export const StatusBadge = createBadgeFactory({ shape: 'pill', size: 'sm' });
export const SuccessBadge = createBadgeFactory({
  color: 'success',
  shape: 'pill',
  dot: true,
});
export const WarningBadge = createBadgeFactory({
  color: 'warning',
  shape: 'pill',
  dot: true,
});
export const ErrorBadge = createBadgeFactory({
  color: 'error',
  shape: 'pill',
  dot: true,
});
export const InfoBadge = createBadgeFactory({
  color: 'info',
  shape: 'pill',
  dot: true,
});

// Brand badges
export const PrimaryBadge = createBadgeFactory({
  color: 'pink',
  shape: 'rounded',
});
export const SecondaryBadge = createBadgeFactory({
  color: 'blue',
  shape: 'rounded',
});
export const AccentBadge = createBadgeFactory({
  color: 'orange',
  shape: 'rounded',
});

// Tag badges (removable)
export const TagBadge = createBadgeFactory({
  color: 'gray',
  shape: 'pill',
  size: 'sm',
  removable: true,
});

// Count badges
export const CountBadge = createBadgeFactory({
  color: 'pink',
  shape: 'pill',
  size: 'xs',
  mono: true,
});
