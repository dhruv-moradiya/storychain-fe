import type { LucideIcon } from 'lucide-react';

// Badge size types
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

// Badge shape types
export type BadgeShape = 'rounded' | 'pill' | 'square' | 'soft';

// Badge style types
export type BadgeStyle = 'filled' | 'outline' | 'soft' | 'ghost';

// Badge color key types
export type BadgeColorKey =
  | 'pink'
  | 'blue'
  | 'orange'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'gray'
  | 'slate'
  | 'purple'
  | 'cyan'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'indigo';

// Color scheme interface
export interface ColorScheme {
  bg: string;
  text: string;
  border?: string;
}

// Badge configuration interface
export interface BadgeConfig {
  // Content
  label: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';

  // Styling
  color?: BadgeColorKey | ColorScheme;
  size?: BadgeSize;
  shape?: BadgeShape;
  style?: BadgeStyle;

  // Icon styling
  iconColor?: string;
  iconClassName?: string;

  // Additional
  className?: string;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  uppercase?: boolean;
  mono?: boolean;
}

// Badge group props
export interface BadgeGroupProps {
  badges: BadgeConfig[];
  max?: number;
  className?: string;
  gap?: 'xs' | 'sm' | 'md';
}
