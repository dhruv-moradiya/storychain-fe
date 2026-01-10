import type { LucideIcon } from 'lucide-react';
import { createBadge } from './badge';
import type { BadgeColorKey, BadgeConfig } from './types';

/**
 * Quickly create a simple text badge
 */
export function textBadge(
  label: string,
  color: BadgeColorKey = 'gray',
  options?: Partial<BadgeConfig>
): React.ReactElement {
  return createBadge({ label, color, ...options });
}

/**
 * Create a badge with an icon
 */
export function iconBadge(
  label: string,
  icon: LucideIcon,
  color: BadgeColorKey = 'gray',
  options?: Partial<BadgeConfig>
): React.ReactElement {
  return createBadge({ label, icon, color, ...options });
}

/**
 * Create a status indicator badge
 */
export function statusBadge(
  label: string,
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral',
  options?: Partial<BadgeConfig>
): React.ReactElement {
  const colorMap: Record<string, BadgeColorKey> = {
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
    neutral: 'gray',
  };
  return createBadge({
    label,
    color: colorMap[status],
    dot: true,
    shape: 'pill',
    ...options,
  });
}

/**
 * Create a number/count badge
 */
export function countBadge(
  count: number,
  color: BadgeColorKey = 'pink',
  options?: Partial<BadgeConfig>
): React.ReactElement {
  return createBadge({
    label: count.toString(),
    color,
    shape: 'pill',
    size: 'xs',
    ...options,
  });
}
