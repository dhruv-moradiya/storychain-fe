import type { IBaseType } from '.';

enum NotificationType {
  NEW_BRANCH = 'NEW_BRANCH',
  CHAPTER_UPVOTE = 'CHAPTER_UPVOTE',
  STORY_MILESTONE = 'STORY_MILESTONE',
  STORY_CONTINUED = 'STORY_CONTINUED',

  PR_OPENED = 'PR_OPENED',
  PR_APPROVED = 'PR_APPROVED',
  PR_REJECTED = 'PR_REJECTED',
  PR_MERGED = 'PR_MERGED',
  PR_COMMENTED = 'PR_COMMENTED',

  COMMENT_REPLY = 'COMMENT_REPLY',
  COMMENT_MENTION = 'COMMENT_MENTION',
  MENTION = 'MENTION',

  NEW_FOLLOWER = 'NEW_FOLLOWER',
  BADGE_EARNED = 'BADGE_EARNED',

  COLLAB_INVITATION = 'COLLAB_INVITATION',
  COLLAB_INVITATION_APPROVED = 'COLLAB_INVITATION_APPROVED',
  COLLAB_INVITATION_REJECTED = 'COLLAB_INVITATION_REJECTED',
}

type TNotificationType =
  | 'NEW_BRANCH'
  | 'CHAPTER_UPVOTE'
  | 'STORY_MILESTONE'
  | 'STORY_CONTINUED'
  | 'PR_OPENED'
  | 'PR_APPROVED'
  | 'PR_REJECTED'
  | 'PR_MERGED'
  | 'PR_COMMENTED'
  | 'COMMENT_REPLY'
  | 'COMMENT_MENTION'
  | 'MENTION'
  | 'NEW_FOLLOWER'
  | 'BADGE_EARNED'
  | 'COLLAB_INVITATION'
  | 'COLLAB_INVITATION_APPROVED'
  | 'COLLAB_INVITATION_REJECTED';

interface INotification {
  _id: string;
  userId: string; // Receiver of the notification
  type: TNotificationType;

  relatedStoryId?: string;
  relatedChapterId?: string;
  relatedPullRequestId?: string;
  relatedCommentId?: string;
  relatedUserId?: string; // Who triggered it

  title: string;
  message: string;

  isRead: boolean;
  readAt?: Date;

  actionUrl?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface INotificationListResponse extends IBaseType {
  data: {
    notifications: INotification[];
    page: number;
    total: number;
    totalPages: number;
  };
}

export type { INotification, TNotificationType, INotificationListResponse };
export { NotificationType };
