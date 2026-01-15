import type { LucideIcon } from 'lucide-react';

export type BillingInterval = 'monthly' | 'yearly';
export type Currency = 'INR' | 'USD';

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPriceINR: number;
  yearlyPriceINR: number;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  highlighted?: boolean;
  features: string[];
}

export interface PlanFeature {
  name: string;
  free: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface PaymentState {
  status: PaymentStatus;
  orderId?: string;
  paymentId?: string;
  errorMessage?: string;
  errorCode?: string;
}
