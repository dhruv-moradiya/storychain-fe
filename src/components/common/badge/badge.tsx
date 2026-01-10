import * as React from 'react';
import { cn } from '@/lib/utils';
import type { BadgeConfig } from './types';
import { resolveColorScheme } from './colors';
import { badgeSizes, badgeShapes, iconSizeMap, getStyleObject } from './variants';

/**
 * Creates a badge component with the given configuration
 */
export function createBadge(config: BadgeConfig): React.ReactElement {
  const {
    label,
    icon: Icon,
    iconPosition = 'left',
    color = 'gray',
    size = 'sm',
    shape = 'rounded',
    style = 'soft',
    iconColor,
    iconClassName,
    className,
    dot = false,
    removable = false,
    onRemove,
    onClick,
    disabled = false,
    uppercase = false,
    mono = true,
  } = config;

  // Resolve color scheme
  const colorScheme = resolveColorScheme(color);

  // Get style object
  const styleObj = getStyleObject(style, colorScheme);

  // Get icon size
  const iconSize = iconSizeMap[size];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1 border font-medium transition-all',
        badgeSizes({ size }),
        badgeShapes({ shape }),
        mono && 'font-mono',
        uppercase && 'tracking-wider uppercase',
        onClick && !disabled && 'cursor-pointer hover:opacity-80',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      style={styleObj}
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: colorScheme.text }}
        />
      )}
      {Icon && iconPosition === 'left' && (
        <Icon
          size={iconSize}
          className={cn('shrink-0', iconClassName)}
          style={iconColor ? { color: iconColor } : undefined}
        />
      )}
      <span className="truncate">{label}</span>
      {Icon && iconPosition === 'right' && (
        <Icon
          size={iconSize}
          className={cn('shrink-0', iconClassName)}
          style={iconColor ? { color: iconColor } : undefined}
        />
      )}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 shrink-0 hover:opacity-70"
          aria-label="Remove"
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default createBadge;
