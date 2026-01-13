export type PlanType = 'FREE' | 'PRO' | 'PREMIUM';
export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET';

export interface UserSubscription {
  id: string;
  planType: PlanType;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  billingCycle: 'MONTHLY' | 'YEARLY';
  currency: 'INR' | 'USD';
  amount: number; // in paise/cents
}

export interface PaymentHistory {
  id: string;
  date: Date;
  amount: number; // in paise/cents
  currency: 'INR' | 'USD';
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  invoiceUrl?: string;
}

export interface UsageStats {
  stories: { used: number; limit: number | null };
  chapters: { used: number; limit: number | null };
  branches: { used: number; limit: number | null };
  collaborators: { used: number; limit: number | null };
}
