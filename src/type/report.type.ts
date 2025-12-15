export type ReportType = 'CHAPTER' | 'COMMENT' | 'USER' | 'STORY';

export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'COPYRIGHT'
  | 'OFF_TOPIC'
  | 'OTHER';

export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';

export interface IReport {
  _id: string;
  reporterId: string;
  reporterName?: string;
  reporterAvatar?: string;
  reportType: ReportType;
  relatedChapterId?: string;
  relatedCommentId?: string;
  relatedUserId?: string;
  relatedStoryId?: string;
  // Related content info for display
  relatedTitle?: string;
  relatedContent?: string;
  reason: ReportReason;
  description: string;
  evidenceUrls?: string[];
  status: ReportStatus;
  reviewedBy?: string;
  reviewerName?: string;
  reviewedAt?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  reportType: ReportType;
  relatedChapterId?: string;
  relatedCommentId?: string;
  relatedUserId?: string;
  relatedStoryId?: string;
  reason: ReportReason;
  description: string;
  evidenceUrls?: string[];
}

export interface ResolveReportData {
  status: 'RESOLVED' | 'DISMISSED';
  resolution: string;
}

export const REPORT_REASONS: { value: ReportReason; label: string; description: string }[] = [
  { value: 'SPAM', label: 'Spam', description: 'Unwanted promotional content or repetitive messages' },
  { value: 'HARASSMENT', label: 'Harassment', description: 'Bullying, threats, or targeted attacks against individuals' },
  { value: 'INAPPROPRIATE_CONTENT', label: 'Inappropriate Content', description: 'Adult content, violence, or other unsuitable material' },
  { value: 'COPYRIGHT', label: 'Copyright Violation', description: 'Plagiarism or unauthorized use of copyrighted material' },
  { value: 'OFF_TOPIC', label: 'Off Topic', description: 'Content that doesn\'t belong or is irrelevant' },
  { value: 'OTHER', label: 'Other', description: 'Other issues not covered above' },
];

export const REPORT_STATUS_CONFIG: Record<ReportStatus, { label: string; color: string }> = {
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  REVIEWED: { label: 'Under Review', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  RESOLVED: { label: 'Resolved', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  DISMISSED: { label: 'Dismissed', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
};

export const REPORT_TYPE_CONFIG: Record<ReportType, { label: string; icon: string }> = {
  CHAPTER: { label: 'Chapter', icon: 'BookOpen' },
  COMMENT: { label: 'Comment', icon: 'MessageSquare' },
  USER: { label: 'User', icon: 'User' },
  STORY: { label: 'Story', icon: 'Book' },
};
