import type { UserSubscription, PaymentHistory, UsageStats } from './subscription.types';

// Mock data - replace with actual API calls
export const mockSubscription: UserSubscription = {
  id: 'sub_123',
  planType: 'PRO',
  status: 'ACTIVE',
  startDate: new Date('2024-01-15'),
  endDate: new Date('2025-01-15'),
  autoRenew: true,
  billingCycle: 'YEARLY',
  currency: 'INR',
  amount: 767000, // 7670 INR in paise
};

export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: 'pay_001',
    date: new Date('2024-01-15'),
    amount: 767000,
    currency: 'INR',
    status: 'SUCCESS',
    method: 'UPI',
    description: 'Pro Plan - Yearly Subscription',
    invoiceUrl: '/invoices/inv_001.pdf',
  },
  {
    id: 'pay_002',
    date: new Date('2023-01-15'),
    amount: 79900,
    currency: 'INR',
    status: 'SUCCESS',
    method: 'CARD',
    description: 'Pro Plan - Monthly Subscription',
    invoiceUrl: '/invoices/inv_002.pdf',
  },
  {
    id: 'pay_003',
    date: new Date('2022-12-15'),
    amount: 79900,
    currency: 'INR',
    status: 'REFUNDED',
    method: 'NET_BANKING',
    description: 'Pro Plan - Monthly Subscription (Refunded)',
  },
];

export const mockUsageStats: UsageStats = {
  stories: { used: 8, limit: 15 },
  chapters: { used: 42, limit: 50 },
  branches: { used: 18, limit: 25 },
  collaborators: { used: 5, limit: 10 },
};

export const planDetails = {
  FREE: {
    name: 'Free',
    color: 'text-text-secondary-65',
    bgColor: 'bg-muted/30',
    features: ['3 Stories', '10 Chapters/Story', '5 Branches/month', '2 Collaborators'],
  },
  PRO: {
    name: 'Pro',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    features: [
      '15 Stories',
      '50 Chapters/Story',
      '25 Branches/month',
      '10 Collaborators',
      'AI Writing',
      'PDF Export',
    ],
  },
  PREMIUM: {
    name: 'Premium',
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    features: [
      'Unlimited Stories',
      'Unlimited Chapters',
      'Unlimited Branches',
      'Unlimited Collaborators',
      'AI Advanced',
      'All Exports',
    ],
  },
};
