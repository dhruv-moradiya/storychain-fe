export type HistoryEventType =
  | 'chapter_published'
  | 'chapter_edited'
  | 'pr_submitted'
  | 'pr_approved'
  | 'pr_merged'
  | 'pr_rejected'
  | 'comment'
  | 'collaborator_added'
  | 'collaborator_removed'
  | 'setting_changed'
  | 'report_resolved'
  | 'story_created';

export interface HistoryEvent {
  id: string;
  type: HistoryEventType;
  title: string;
  description?: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  timestamp: Date;
  link?: {
    label: string;
    href: string;
  };
  metadata?: Record<string, string>;
}

export interface HistoryGroup {
  label: string;
  events: HistoryEvent[];
}

export type HistoryFilter = 'all' | 'chapters' | 'prs' | 'comments' | 'settings' | 'collaborators';
