export type AppealStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ESCALATED';

export type AppealPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type ReviewDecision = 'APPROVE' | 'REJECT' | 'ESCALATE';

export interface IAppeal {
  _id: string;
  banHistoryId: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  userEmail?: string;

  // Appeal content
  appealReason: string;
  explanation: string;
  evidenceUrls: string[];

  // Status tracking
  status: AppealStatus;
  priority: AppealPriority;

  // Assignment
  assignedTo?: string;
  assignedToName?: string;
  assignedAt?: string;

  // Review
  reviewedBy?: string;
  reviewerName?: string;
  reviewedAt?: string;
  reviewDecision?: ReviewDecision;
  reviewNotes?: string;
  internalNotes?: string;

  // Escalation
  escalatedTo?: string;
  escalatedToName?: string;
  escalatedAt?: string;
  escalationReason?: string;

  // Response
  responseMessage?: string;

  // Metrics
  responseTime?: number;
  reviewCount: number;

  // Ban info for context
  banReason?: string;
  banType?: string;
  banExpiresAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAppealData {
  banHistoryId: string;
  appealReason: string;
  explanation: string;
  evidenceUrls?: string[];
}

export interface ReviewAppealData {
  reviewDecision: ReviewDecision;
  reviewNotes?: string;
  internalNotes?: string;
  responseMessage: string;
  escalationReason?: string;
}

export const APPEAL_STATUS_CONFIG: Record<AppealStatus, { label: string; color: string; dotColor: string }> = {
  PENDING: {
    label: 'Pending',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    dotColor: 'bg-amber-500',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    dotColor: 'bg-blue-500',
  },
  APPROVED: {
    label: 'Approved',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    dotColor: 'bg-green-500',
  },
  REJECTED: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    dotColor: 'bg-red-500',
  },
  ESCALATED: {
    label: 'Escalated',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    dotColor: 'bg-purple-500',
  },
};

export const APPEAL_PRIORITY_CONFIG: Record<AppealPriority, { label: string; color: string }> = {
  LOW: { label: 'Low', color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
  NORMAL: { label: 'Normal', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  HIGH: { label: 'High', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
  URGENT: { label: 'Urgent', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
};
