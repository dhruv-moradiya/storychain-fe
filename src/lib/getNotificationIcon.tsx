import type { TNotificationType } from '@/type/notification.type';
import {
  GitBranch,
  MessageSquare,
  Star,
  UserPlus,
  Users,
  CheckCircle,
  XCircle,
  BadgeCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';

export function getNotificationIcon(type: TNotificationType) {
  switch (type) {
    case 'NEW_BRANCH':
      return GitBranch;
    case 'CHAPTER_UPVOTE':
    case 'STORY_MILESTONE':
      return Star;

    case 'PR_OPENED':
    case 'PR_COMMENTED':
      return MessageSquare;

    case 'PR_APPROVED':
      return CheckCircle;
    case 'PR_REJECTED':
      return XCircle;

    case 'NEW_FOLLOWER':
      return UserPlus;

    case 'COLLAB_INVITATION':
    case 'COLLAB_INVITATION_APPROVED':
      return Users;

    case 'BADGE_EARNED':
      return BadgeCheck;

    default:
      return MessageSquare;
  }
}

type TokenType = 'actor' | 'story' | 'role';

const TOKEN_COLORS: Record<TokenType, string> = {
  actor: 'font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-md',

  story:
    'font-medium text-violet-600 dark:text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded-md',

  role: 'font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md',
};

export function highlightNotificationText(text: string): ReactNode[] {
  const regex = /\[\[(actor|story|role):([^\]]+)\]\]/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const [full, type, value] = match;
    const index = match.index!;

    // Plain text before token
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }

    // Highlighted token
    parts.push(
      <span key={`${type}-${index}`} className={TOKEN_COLORS[type as TokenType]}>
        {value}
      </span>
    );

    lastIndex = index + full.length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
