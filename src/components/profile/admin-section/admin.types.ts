import { Clock, Shield, FileText, Users } from 'lucide-react';

export type PlatformRole = 'SUPER_ADMIN' | 'PLATFORM_MODERATOR' | 'APPEAL_MODERATOR' | 'USER';
export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
export type ReportType = 'CHAPTER' | 'COMMENT' | 'USER' | 'STORY';
export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'COPYRIGHT'
  | 'OFF_TOPIC'
  | 'OTHER';

export type SubscriptionPlan = 'FREE' | 'PRO' | 'ENTERPRISE';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING';

export interface UserSubscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  amount: number;
  currency: 'INR' | 'USD';
  paymentMethod: string;
  invoiceId?: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  role: PlatformRole;
  assignedAt?: Date;
  assignedBy?: string;
  isBanned: boolean;
  banReason?: string;
  currentSubscription?: UserSubscription;
  subscriptionHistory?: UserSubscription[];
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  reportType: ReportType;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: Date;
  relatedTitle?: string;
  assignedTo?: string;
}

export const roleConfig: Record<
  PlatformRole,
  { label: string; color: string; icon: typeof Shield }
> = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Shield,
  },
  PLATFORM_MODERATOR: {
    label: 'Platform Mod',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Shield,
  },
  APPEAL_MODERATOR: {
    label: 'Appeal Mod',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Shield,
  },
  USER: { label: 'User', color: 'bg-slate-100 text-slate-800 border-slate-200', icon: Users },
};

export const reportStatusConfig: Record<
  ReportStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  REVIEWED: { label: 'Reviewed', color: 'bg-blue-100 text-blue-800', icon: Clock },
  RESOLVED: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: Clock },
  DISMISSED: { label: 'Dismissed', color: 'bg-slate-100 text-slate-800', icon: Clock },
};

export const reportTypeConfig: Record<ReportType, { label: string; icon: typeof FileText }> = {
  CHAPTER: { label: 'Chapter', icon: FileText },
  COMMENT: { label: 'Comment', icon: FileText },
  USER: { label: 'User', icon: Users },
  STORY: { label: 'Story', icon: FileText },
};
