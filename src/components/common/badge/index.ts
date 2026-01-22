// Types
export type {
  BadgeSize,
  BadgeShape,
  BadgeStyle,
  BadgeColorKey,
  ColorScheme,
  BadgeConfig,
  BadgeGroupProps,
} from './types';

// Colors
export { badgeColors, resolveColorScheme } from './colors';

// Variants
export { badgeSizes, badgeShapes, iconSizeMap, getStyleObject } from './variants';

// Main component
export { createBadge, default } from './badge';

// Group component
export { BadgeGroup } from './badge-group';

// Factories
export {
  createBadgeFactory,
  StatusBadge,
  SuccessBadge,
  WarningBadge,
  ErrorBadge,
  InfoBadge,
  PrimaryBadge,
  SecondaryBadge,
  AccentBadge,
  TagBadge,
  CountBadge,
} from './factories';

// Utility functions
export { textBadge, iconBadge, statusBadge, countBadge } from './utils';

// Story-specific badges
export {
  storyStatusBadge,
  contentRatingBadge,
  collaboratorRoleBadge,
  collaboratorStatusBadge,
  genreBadge,
  genresBadges,
  genresToBadgeConfigs,
  chapterStatusBadge,
} from './story-badges';
