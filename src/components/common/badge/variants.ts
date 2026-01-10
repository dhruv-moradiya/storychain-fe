import { cva } from 'class-variance-authority';
import type { BadgeStyle, ColorScheme } from './types';

// Badge size variants
export const badgeSizes = cva('', {
  variants: {
    size: {
      xs: 'text-[10px] px-1.5 py-0 h-4',
      sm: 'text-xs px-2 py-0.5 h-5',
      md: 'text-xs px-2.5 py-1 h-6',
      lg: 'text-sm px-3 py-1.5 h-7',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

// Badge shape variants
export const badgeShapes = cva('', {
  variants: {
    shape: {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none',
      soft: 'rounded-lg',
    },
  },
  defaultVariants: {
    shape: 'rounded',
  },
});

// Icon size mapping based on badge size
export const iconSizeMap = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
} as const;

// Get style object based on badge style type
export function getStyleObject(style: BadgeStyle, colorScheme: ColorScheme): React.CSSProperties {
  switch (style) {
    case 'filled':
      return {
        backgroundColor: colorScheme.text,
        color: '#ffffff',
        borderColor: 'transparent',
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: colorScheme.text,
        borderColor: colorScheme.border || colorScheme.text,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: colorScheme.text,
        borderColor: 'transparent',
      };
    case 'soft':
    default:
      return {
        backgroundColor: colorScheme.bg,
        color: colorScheme.text,
        borderColor: colorScheme.border || 'transparent',
      };
  }
}
