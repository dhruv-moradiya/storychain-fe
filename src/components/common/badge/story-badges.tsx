import { cloneElement } from 'react';
import {
  Archive,
  Baby,
  CheckCircle,
  Clock,
  Crown,
  Edit3,
  Eye,
  FileEdit,
  Flame,
  Handshake,
  MessageSquare,
  PenTool,
  Shield,
  ShieldAlert,
  Skull,
  Sparkles,
  Star,
  Trash2,
  UserMinus,
  UserX,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { iconBadge, textBadge } from './utils';
import type { BadgeColorKey, BadgeConfig } from './types';

// ============================================
// STORY STATUS BADGES
// ============================================

const STATUS_CONFIG: Record<string, { color: BadgeColorKey; icon: LucideIcon; label: string }> = {
  draft: { color: 'gray', icon: FileEdit, label: 'Draft' },
  published: { color: 'success', icon: CheckCircle, label: 'Published' },
  archived: { color: 'slate', icon: Archive, label: 'Archived' },
  deleted: { color: 'error', icon: Trash2, label: 'Deleted' },
};

export function storyStatusBadge(status: string, options?: Partial<BadgeConfig>) {
  const config = STATUS_CONFIG[status] || {
    color: 'gray' as BadgeColorKey,
    icon: FileEdit,
    label: status,
  };
  return iconBadge(config.label, config.icon, config.color, options);
}

// ============================================
// CONTENT RATING BADGES
// ============================================

const CONTENT_RATING_CONFIG: Record<
  string,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  all_ages: { color: 'emerald', icon: Baby, label: 'All Ages' },
  general: { color: 'success', icon: Users, label: 'General' },
  teen: { color: 'blue', icon: Sparkles, label: 'Teen (13+)' },
  young_adult: { color: 'cyan', icon: Star, label: 'Young Adult (16+)' },
  mature: { color: 'orange', icon: Flame, label: 'Mature (17+)' },
  r18: { color: 'error', icon: ShieldAlert, label: 'R18 (18+)' },
  r18g: { color: 'rose', icon: Skull, label: 'R18G (18+)' },
};

export function contentRatingBadge(rating: string, options?: Partial<BadgeConfig>) {
  const config = CONTENT_RATING_CONFIG[rating] || {
    color: 'gray' as BadgeColorKey,
    icon: Shield,
    label: rating,
  };
  return iconBadge(config.label, config.icon, config.color, options);
}

// ============================================
// COLLABORATOR ROLE BADGES
// ============================================

const COLLABORATOR_ROLE_CONFIG: Record<
  string,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  owner: { color: 'amber', icon: Crown, label: 'Owner' },
  co_author: { color: 'pink', icon: PenTool, label: 'Co-Author' },
  moderator: { color: 'purple', icon: Shield, label: 'Moderator' },
  reviewer: { color: 'blue', icon: Eye, label: 'Reviewer' },
  contributor: { color: 'cyan', icon: Edit3, label: 'Contributor' },
};

export function collaboratorRoleBadge(role: string, options?: Partial<BadgeConfig>) {
  const config = COLLABORATOR_ROLE_CONFIG[role] || {
    color: 'gray' as BadgeColorKey,
    icon: Users,
    label: role,
  };
  return iconBadge(config.label, config.icon, config.color, options);
}

// ============================================
// COLLABORATOR STATUS BADGES
// ============================================

const COLLABORATOR_STATUS_CONFIG: Record<
  string,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  pending: { color: 'warning', icon: Clock, label: 'Pending' },
  accepted: { color: 'success', icon: Handshake, label: 'Accepted' },
  declined: { color: 'error', icon: UserX, label: 'Declined' },
  removed: { color: 'slate', icon: UserMinus, label: 'Removed' },
};

export function collaboratorStatusBadge(status: string, options?: Partial<BadgeConfig>) {
  const config = COLLABORATOR_STATUS_CONFIG[status] || {
    color: 'gray' as BadgeColorKey,
    icon: MessageSquare,
    label: status,
  };
  return iconBadge(config.label, config.icon, config.color, options);
}

// ============================================
// GENRE BADGE (Simple text badge, no icon)
// ============================================

export function genreBadge(genre: string, options?: Partial<BadgeConfig>) {
  // Format genre: replace underscores with spaces and capitalize
  const label = genre
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return textBadge(label, 'pink', {
    shape: 'pill',
    ...options,
  });
}

// ============================================
// MULTIPLE GENRES BADGE
// ============================================

export function genresBadges(genres: string[], options?: Partial<BadgeConfig>) {
  return genres.map((genre) => cloneElement(genreBadge(genre, options), { key: genre }));
}

/**
 * Convert genre strings to BadgeConfig[] for use with BadgeGroup
 */
export function genresToBadgeConfigs(
  genres: string[],
  options?: Partial<BadgeConfig>
): BadgeConfig[] {
  return genres.map((genre) => {
    const label = genre
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      label,
      color: 'pink' as BadgeColorKey,
      shape: 'pill',
      ...options,
    } as BadgeConfig;
  });
}

// ============================================
// CHAPTER STATUS BADGES
// ============================================

const CHAPTER_STATUS_CONFIG: Record<
  string,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  PUBLISHED: { color: 'success', icon: CheckCircle, label: 'Published' },
  PENDING_APPROVAL: { color: 'warning', icon: Clock, label: 'Pending Approval' },
  REJECTED: { color: 'error', icon: UserX, label: 'Rejected' },
  DELETED: { color: 'slate', icon: Trash2, label: 'Deleted' },
};

export function chapterStatusBadge(status: string, options?: Partial<BadgeConfig>) {
  const config = CHAPTER_STATUS_CONFIG[status] || {
    color: 'gray' as BadgeColorKey,
    icon: FileEdit,
    label: status,
  };
  return iconBadge(config.label, config.icon, config.color, options);
}
