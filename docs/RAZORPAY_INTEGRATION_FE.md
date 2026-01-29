# Razorpay Integration - Frontend Documentation

## Overview

This document outlines the complete frontend implementation for integrating Razorpay with 3 subscription plans (Free, Pro, Premium) into the StoryChain React application. Razorpay is India's leading payment gateway, providing seamless UPI, card, and net banking payments.

---

## Table of Contents

1. [Current Architecture Summary](#current-architecture-summary)
2. [Subscription Plans Definition](#subscription-plans-definition)
3. [Required Dependencies](#required-dependencies)
4. [Environment Configuration](#environment-configuration)
5. [Type Definitions](#type-definitions)
6. [API Layer Implementation](#api-layer-implementation)
7. [React Query Hooks](#react-query-hooks)
8. [Razorpay Checkout Integration](#razorpay-checkout-integration)
9. [Components Implementation](#components-implementation)
10. [Pages Implementation](#pages-implementation)
11. [User Model Updates](#user-model-updates)
12. [Protected Features by Plan](#protected-features-by-plan)
13. [Integration with Existing Code](#integration-with-existing-code)
14. [Testing Checklist](#testing-checklist)

---

## Current Architecture Summary

| Aspect           | Current Implementation       |
| ---------------- | ---------------------------- |
| Framework        | React 19 + TypeScript + Vite |
| Authentication   | Clerk.io                     |
| State Management | React Query (TanStack Query) |
| HTTP Client      | Axios with interceptors      |
| Styling          | Tailwind CSS 4               |
| UI Components    | Radix UI + shadcn/ui         |
| API Pattern      | Factory pattern with hooks   |

---

## Subscription Plans Definition

### Plan Tiers (INR Pricing)

| Feature               | Free            | Pro (₹799/mo)    | Premium (₹1,499/mo) |
| --------------------- | --------------- | ---------------- | ------------------- |
| Stories Created       | 3               | 15               | Unlimited           |
| Chapters per Story    | 10              | 50               | Unlimited           |
| AI Writing Assistance | -               | Basic            | Advanced            |
| Branch Creation       | 5/month         | 25/month         | Unlimited           |
| Priority Support      | -               | Email            | 24/7 Chat           |
| Custom Badges         | -               | 3                | Unlimited           |
| Analytics Dashboard   | Basic           | Advanced         | Premium             |
| Export Options        | -               | PDF              | All formats         |
| Collaboration         | 2 collaborators | 10 collaborators | Unlimited           |
| Ad-Free Experience    | -               | Yes              | Yes                 |

### Plan Tiers (USD Pricing - International)

| Feature                        | Free | Pro ($9.99/mo) | Premium ($19.99/mo) |
| ------------------------------ | ---- | -------------- | ------------------- |
| All features same as INR plans |

### Razorpay Plan IDs (Configure in Environment)

```env
# INR Plans
VITE_RAZORPAY_PLAN_PRO_MONTHLY=plan_pro_monthly_inr
VITE_RAZORPAY_PLAN_PRO_YEARLY=plan_pro_yearly_inr
VITE_RAZORPAY_PLAN_PREMIUM_MONTHLY=plan_premium_monthly_inr
VITE_RAZORPAY_PLAN_PREMIUM_YEARLY=plan_premium_yearly_inr

# USD Plans (optional)
VITE_RAZORPAY_PLAN_PRO_MONTHLY_USD=plan_pro_monthly_usd
VITE_RAZORPAY_PLAN_PRO_YEARLY_USD=plan_pro_yearly_usd
VITE_RAZORPAY_PLAN_PREMIUM_MONTHLY_USD=plan_premium_monthly_usd
VITE_RAZORPAY_PLAN_PREMIUM_YEARLY_USD=plan_premium_yearly_usd
```

---

## Required Dependencies

### Install Razorpay Script Loader

Razorpay uses a script-based checkout, no npm package required for basic integration.

```bash
# Optional: Type definitions
npm install -D @types/razorpay
```

### Create Razorpay Types (if not using @types/razorpay)

```typescript
// src/types/razorpay.d.ts

interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description?: string;
  image?: string;
  callback_url?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    animation?: boolean;
  };
  handler?: (response: RazorpayResponse) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (event: string, callback: (response: any) => void) => void;
}

interface RazorpayClass {
  new (options: RazorpayOptions): RazorpayInstance;
}

interface Window {
  Razorpay: RazorpayClass;
}
```

---

## Environment Configuration

### Add to `.env`

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here

# Plan IDs (INR)
VITE_RAZORPAY_PLAN_PRO_MONTHLY=plan_xxxxxxxxxxxxx
VITE_RAZORPAY_PLAN_PRO_YEARLY=plan_xxxxxxxxxxxxx
VITE_RAZORPAY_PLAN_PREMIUM_MONTHLY=plan_xxxxxxxxxxxxx
VITE_RAZORPAY_PLAN_PREMIUM_YEARLY=plan_xxxxxxxxxxxxx

# Plan IDs (USD - optional for international)
VITE_RAZORPAY_PLAN_PRO_MONTHLY_USD=plan_xxxxxxxxxxxxx
VITE_RAZORPAY_PLAN_PRO_YEARLY_USD=plan_xxxxxxxxxxxxx
VITE_RAZORPAY_PLAN_PREMIUM_MONTHLY_USD=plan_xxxxxxxxxxxxx
VITE_RAZORPAY_PLAN_PREMIUM_YEARLY_USD=plan_xxxxxxxxxxxxx

# App Info (for Razorpay Checkout)
VITE_APP_NAME=StoryChain
VITE_APP_LOGO_URL=https://your-domain.com/logo.png
```

---

## Type Definitions

### Create: `src/type/subscription.ts`

```typescript
// Subscription Plan Types
export type SubscriptionPlan = 'free' | 'pro' | 'premium';

export type SubscriptionStatus =
  | 'created'
  | 'authenticated'
  | 'active'
  | 'pending'
  | 'halted'
  | 'cancelled'
  | 'paused'
  | 'expired'
  | 'completed';

export type BillingInterval = 'monthly' | 'yearly';

export type Currency = 'INR' | 'USD';

// Subscription Object
export interface ISubscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  razorpayCustomerId: string;
  razorpaySubscriptionId: string | null;
  razorpayPlanId: string | null;
  billingInterval: BillingInterval;
  currency: Currency;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  chargeAt: Date | null;
  cancelledAt: Date | null;
  pausedAt: Date | null;
  totalCount: number;
  paidCount: number;
  remainingCount: number;
  shortUrl: string | null;
  paymentMethod: {
    type: 'card' | 'emandate' | 'nach' | 'upi' | null;
    last4: string | null;
    bank: string | null;
  };
}

// Plan Feature Limits
export interface IPlanLimits {
  maxStories: number;
  maxChaptersPerStory: number;
  maxBranchesPerMonth: number;
  maxCollaborators: number;
  hasAiAssistance: boolean;
  aiAssistanceLevel: 'none' | 'basic' | 'advanced';
  hasPrioritySupport: boolean;
  hasAnalytics: boolean;
  analyticsLevel: 'basic' | 'advanced' | 'premium';
  exportFormats: string[];
  hasAdFree: boolean;
  maxCustomBadges: number;
}

// Plan Display Info
export interface IPlanInfo {
  id: SubscriptionPlan;
  name: string;
  description: string;
  monthlyPriceINR: number;
  yearlyPriceINR: number;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number;
  razorpayPlanIdMonthlyINR: string | null;
  razorpayPlanIdYearlyINR: string | null;
  razorpayPlanIdMonthlyUSD: string | null;
  razorpayPlanIdYearlyUSD: string | null;
  limits: IPlanLimits;
  features: string[];
  highlighted: boolean;
}

// Create Subscription Request
export interface ICreateSubscriptionRequest {
  plan: 'PRO' | 'PREMIUM';
  interval: BillingInterval;
  currency: Currency;
}

// Create Subscription Response
export interface ICreateSubscriptionResponse {
  subscriptionId: string;
  razorpaySubscriptionId: string;
  razorpayPlanId: string;
  razorpayCustomerId: string;
  shortUrl: string;
  status: string;
}

// Verify Payment Request
export interface IVerifyPaymentRequest {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

// Payment History Item
export interface IPaymentHistoryItem {
  id: string;
  razorpayPaymentId: string;
  amount: number;
  currency: Currency;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  method: string;
  description: string;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  capturedAt: Date | null;
  createdAt: Date;
  paymentMethodDetails: {
    type: string;
    last4: string | null;
    bank: string | null;
    wallet: string | null;
    vpa: string | null;
  };
}

// Invoice
export interface IInvoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  amountPaid: number;
  amountDue: number;
  currency: Currency;
  status: 'draft' | 'issued' | 'partially_paid' | 'paid' | 'cancelled' | 'expired';
  paidAt: Date | null;
  shortUrl: string;
  billingStart: Date | null;
  billingEnd: Date | null;
  createdAt: Date;
}

// Usage Stats
export interface IUsageStats {
  storiesCreated: number;
  chaptersCreated: number;
  branchesThisMonth: number;
  collaboratorsUsed: number;
  limits: IPlanLimits;
}

// API Response Types
export interface ISubscriptionResponse {
  success: boolean;
  message: string;
  data: ISubscription;
}

export interface ICreateSubscriptionApiResponse {
  success: boolean;
  message: string;
  data: ICreateSubscriptionResponse;
}

export interface IPlansResponse {
  success: boolean;
  message: string;
  data: IPlanInfo[];
}

export interface IPaymentHistoryResponse {
  success: boolean;
  message: string;
  data: {
    payments: IPaymentHistoryItem[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface IInvoicesResponse {
  success: boolean;
  message: string;
  data: IInvoice[];
}

export interface IUsageStatsResponse {
  success: boolean;
  message: string;
  data: IUsageStats;
}
```

### Update: `src/type/user.ts`

```typescript
// Add subscription field to IUser interface
export interface IUser {
  // ... existing fields ...
  clerkId: string;
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  badges: TBadge[];
  stats: UserStats;
  preferences: UserPreferences;
  isActive: boolean;
  isBanned: boolean;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;

  // NEW: Subscription fields
  subscription: {
    plan: 'free' | 'pro' | 'premium';
    status: 'active' | 'cancelled' | 'paused' | 'pending' | 'halted';
    currentPeriodEnd: Date | null;
    currency: 'INR' | 'USD';
  };
}
```

---

## API Layer Implementation

### Create: `src/api/subscription.api.ts`

```typescript
import { AxiosInstance } from 'axios';
import {
  ICreateSubscriptionApiResponse,
  ICreateSubscriptionRequest,
  IInvoicesResponse,
  IPaymentHistoryResponse,
  IPlansResponse,
  ISubscriptionResponse,
  IUsageStatsResponse,
  IVerifyPaymentRequest,
} from '@/type/subscription';

export const subscriptionApi = (api: AxiosInstance) => ({
  /**
   * Get all available subscription plans
   */
  getPlans: async (): Promise<IPlansResponse> => {
    const response = await api.get('/subscription/plans');
    return response.data;
  },

  /**
   * Get current user's subscription
   */
  getCurrentSubscription: async (): Promise<ISubscriptionResponse> => {
    const response = await api.get('/subscription');
    return response.data;
  },

  /**
   * Create a new subscription (initiates Razorpay subscription)
   */
  createSubscription: async (
    payload: ICreateSubscriptionRequest
  ): Promise<ICreateSubscriptionApiResponse> => {
    const response = await api.post('/subscription/create', payload);
    return response.data;
  },

  /**
   * Verify payment after Razorpay checkout
   */
  verifyPayment: async (payload: IVerifyPaymentRequest): Promise<ISubscriptionResponse> => {
    const response = await api.post('/subscription/verify', payload);
    return response.data;
  },

  /**
   * Change subscription plan
   */
  changePlan: async (payload: {
    plan: 'PRO' | 'PREMIUM';
    interval: 'monthly' | 'yearly';
    scheduleChange: 'now' | 'cycle_end';
  }): Promise<ISubscriptionResponse> => {
    const response = await api.post('/subscription/change-plan', payload);
    return response.data;
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (payload: {
    immediate: boolean;
    reason?: string;
  }): Promise<ISubscriptionResponse> => {
    const response = await api.post('/subscription/cancel', payload);
    return response.data;
  },

  /**
   * Pause subscription
   */
  pauseSubscription: async (): Promise<ISubscriptionResponse> => {
    const response = await api.post('/subscription/pause');
    return response.data;
  },

  /**
   * Resume paused subscription
   */
  resumeSubscription: async (): Promise<ISubscriptionResponse> => {
    const response = await api.post('/subscription/resume');
    return response.data;
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async (
    limit: number = 10,
    offset: number = 0
  ): Promise<IPaymentHistoryResponse> => {
    const response = await api.get('/subscription/payments', {
      params: { limit, offset },
    });
    return response.data;
  },

  /**
   * Get invoices
   */
  getInvoices: async (): Promise<IInvoicesResponse> => {
    const response = await api.get('/subscription/invoices');
    return response.data;
  },

  /**
   * Get usage statistics
   */
  getUsageStats: async (): Promise<IUsageStatsResponse> => {
    const response = await api.get('/subscription/usage');
    return response.data;
  },
});
```

---

## React Query Hooks

### Create: `src/hooks/subscription/subscription.queries.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../useApi';
import { subscriptionApi } from '@/api/subscription.api';

// Query keys for subscription
export const subscriptionKeys = {
  all: ['subscription'] as const,
  plans: () => [...subscriptionKeys.all, 'plans'] as const,
  current: () => [...subscriptionKeys.all, 'current'] as const,
  payments: (limit?: number, offset?: number) =>
    [...subscriptionKeys.all, 'payments', { limit, offset }] as const,
  invoices: () => [...subscriptionKeys.all, 'invoices'] as const,
  usage: () => [...subscriptionKeys.all, 'usage'] as const,
};

/**
 * Hook to fetch all available subscription plans
 */
export const useSubscriptionPlans = () => {
  const api = useApi();

  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: () => subscriptionApi(api).getPlans(),
    staleTime: 1000 * 60 * 60, // 1 hour - plans rarely change
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

/**
 * Hook to fetch current user's subscription
 */
export const useCurrentSubscription = () => {
  const api = useApi();

  return useQuery({
    queryKey: subscriptionKeys.current(),
    queryFn: () => subscriptionApi(api).getCurrentSubscription(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to fetch payment history
 */
export const usePaymentHistory = (limit: number = 10, offset: number = 0) => {
  const api = useApi();

  return useQuery({
    queryKey: subscriptionKeys.payments(limit, offset),
    queryFn: () => subscriptionApi(api).getPaymentHistory(limit, offset),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch invoices
 */
export const useInvoices = () => {
  const api = useApi();

  return useQuery({
    queryKey: subscriptionKeys.invoices(),
    queryFn: () => subscriptionApi(api).getInvoices(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch usage statistics
 */
export const useUsageStats = () => {
  const api = useApi();

  return useQuery({
    queryKey: subscriptionKeys.usage(),
    queryFn: () => subscriptionApi(api).getUsageStats(),
    staleTime: 1000 * 60, // 1 minute
  });
};
```

### Create: `src/hooks/subscription/subscription.mutations.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../useApi';
import { subscriptionApi } from '@/api/subscription.api';
import { subscriptionKeys } from './subscription.queries';
import { QueryKey } from '@/lib/query-keys';
import { toast } from 'sonner';
import { ICreateSubscriptionRequest, IVerifyPaymentRequest } from '@/type/subscription';

/**
 * Hook to create subscription and open Razorpay checkout
 */
export const useCreateSubscription = () => {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: ICreateSubscriptionRequest) =>
      subscriptionApi(api).createSubscription(payload),
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create subscription');
    },
  });
};

/**
 * Hook to verify payment after Razorpay checkout
 */
export const useVerifyPayment = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IVerifyPaymentRequest) => subscriptionApi(api).verifyPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
      toast.success('Payment verified successfully! Welcome to premium.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Payment verification failed');
    },
  });
};

/**
 * Hook to change subscription plan
 */
export const useChangePlan = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      plan: 'PRO' | 'PREMIUM';
      interval: 'monthly' | 'yearly';
      scheduleChange: 'now' | 'cycle_end';
    }) => subscriptionApi(api).changePlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
      toast.success('Plan changed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to change plan');
    },
  });
};

/**
 * Hook to cancel subscription
 */
export const useCancelSubscription = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { immediate: boolean; reason?: string }) =>
      subscriptionApi(api).cancelSubscription(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
      toast.success(
        variables.immediate
          ? 'Subscription cancelled'
          : 'Subscription will be cancelled at the end of the billing period'
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel subscription');
    },
  });
};

/**
 * Hook to pause subscription
 */
export const usePauseSubscription = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscriptionApi(api).pauseSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
      toast.success('Subscription paused');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to pause subscription');
    },
  });
};

/**
 * Hook to resume subscription
 */
export const useResumeSubscription = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscriptionApi(api).resumeSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
      toast.success('Subscription resumed');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to resume subscription');
    },
  });
};
```

### Export: `src/hooks/subscription/index.ts`

```typescript
export * from './subscription.queries';
export * from './subscription.mutations';
```

---

## Razorpay Checkout Integration

### Create: `src/lib/razorpay.ts`

```typescript
/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

/**
 * Razorpay checkout options interface
 */
export interface RazorpayCheckoutOptions {
  subscriptionId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  onSuccess: (response: {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
  }) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}

/**
 * Open Razorpay checkout for subscription
 */
export const openRazorpayCheckout = async (options: RazorpayCheckoutOptions): Promise<void> => {
  const loaded = await loadRazorpayScript();

  if (!loaded) {
    throw new Error('Failed to load Razorpay. Please try again.');
  }

  const razorpayOptions = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    subscription_id: options.subscriptionId,
    name: import.meta.env.VITE_APP_NAME || 'StoryChain',
    description: 'Premium Subscription',
    image: import.meta.env.VITE_APP_LOGO_URL,
    prefill: {
      name: options.userName,
      email: options.userEmail,
      contact: options.userPhone || '',
    },
    theme: {
      color: '#6366f1', // Indigo-500 to match your theme
      backdrop_color: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
      escape: true,
      animation: true,
      ondismiss: () => {
        options.onDismiss?.();
      },
    },
    handler: (response: {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
    }) => {
      options.onSuccess(response);
    },
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);

    razorpay.on('payment.failed', (response: any) => {
      options.onError?.(response.error);
    });

    razorpay.open();
  } catch (error) {
    throw new Error('Failed to initialize Razorpay checkout');
  }
};

/**
 * Format amount for display
 */
export const formatAmount = (amountInPaise: number, currency: 'INR' | 'USD' = 'INR'): string => {
  const amount = amountInPaise / 100;

  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
```

### Create: `src/hooks/useRazorpayCheckout.ts`

```typescript
import { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useCreateSubscription, useVerifyPayment } from './subscription';
import { openRazorpayCheckout } from '@/lib/razorpay';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { BillingInterval, Currency, SubscriptionPlan } from '@/type/subscription';

interface UseRazorpayCheckoutOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useRazorpayCheckout = (options?: UseRazorpayCheckoutOptions) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const createSubscription = useCreateSubscription();
  const verifyPayment = useVerifyPayment();

  const initiateCheckout = useCallback(
    async (params: { plan: 'PRO' | 'PREMIUM'; interval: BillingInterval; currency: Currency }) => {
      if (!user) {
        toast.error('Please sign in to subscribe');
        return;
      }

      setIsProcessing(true);

      try {
        // Step 1: Create subscription on backend
        const response = await createSubscription.mutateAsync({
          plan: params.plan,
          interval: params.interval,
          currency: params.currency,
        });

        const { razorpaySubscriptionId } = response.data;

        // Step 2: Open Razorpay checkout
        await openRazorpayCheckout({
          subscriptionId: razorpaySubscriptionId,
          userName: user.fullName || user.username || '',
          userEmail: user.primaryEmailAddress?.emailAddress || '',
          userPhone: user.primaryPhoneNumber?.phoneNumber,
          onSuccess: async (razorpayResponse) => {
            try {
              // Step 3: Verify payment on backend
              await verifyPayment.mutateAsync({
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_subscription_id: razorpayResponse.razorpay_subscription_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
              });

              // Step 4: Navigate to success page
              navigate('/subscription/success');
              options?.onSuccess?.();
            } catch (error) {
              toast.error('Payment verification failed. Please contact support.');
              options?.onError?.(error);
            } finally {
              setIsProcessing(false);
            }
          },
          onError: (error) => {
            toast.error(error?.description || 'Payment failed. Please try again.');
            options?.onError?.(error);
            setIsProcessing(false);
          },
          onDismiss: () => {
            setIsProcessing(false);
          },
        });
      } catch (error: any) {
        toast.error(error.message || 'Failed to initiate checkout');
        options?.onError?.(error);
        setIsProcessing(false);
      }
    },
    [user, createSubscription, verifyPayment, navigate, options]
  );

  return {
    initiateCheckout,
    isProcessing: isProcessing || createSubscription.isPending || verifyPayment.isPending,
  };
};
```

---

## Components Implementation

### Create: `src/components/subscription/plan-card.tsx`

```tsx
import { Check, Sparkles, IndianRupee, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IPlanInfo, SubscriptionPlan, BillingInterval, Currency } from '@/type/subscription';
import { useRazorpayCheckout } from '@/hooks/useRazorpayCheckout';
import { formatAmount } from '@/lib/razorpay';

interface PlanCardProps {
  plan: IPlanInfo;
  currentPlan: SubscriptionPlan;
  billingInterval: BillingInterval;
  currency: Currency;
  isLoading?: boolean;
}

export function PlanCard({
  plan,
  currentPlan,
  billingInterval,
  currency,
  isLoading,
}: PlanCardProps) {
  const { initiateCheckout, isProcessing } = useRazorpayCheckout();

  const price =
    currency === 'INR'
      ? billingInterval === 'monthly'
        ? plan.monthlyPriceINR
        : plan.yearlyPriceINR
      : billingInterval === 'monthly'
        ? plan.monthlyPriceUSD
        : plan.yearlyPriceUSD;

  const monthlyPrice = currency === 'INR' ? plan.monthlyPriceINR : plan.monthlyPriceUSD;

  const isCurrentPlan = currentPlan === plan.id;
  const isUpgrade = getPlanRank(plan.id) > getPlanRank(currentPlan);
  const isDowngrade = getPlanRank(plan.id) < getPlanRank(currentPlan);
  const isFree = plan.id === 'free';

  const handleSelectPlan = () => {
    if (!isCurrentPlan && !isFree) {
      initiateCheckout({
        plan: plan.id.toUpperCase() as 'PRO' | 'PREMIUM',
        interval: billingInterval,
        currency,
      });
    }
  };

  const CurrencyIcon = currency === 'INR' ? IndianRupee : DollarSign;
  const yearlyDiscount =
    billingInterval === 'yearly' && monthlyPrice > 0
      ? Math.round(((monthlyPrice * 12 - price) / (monthlyPrice * 12)) * 100)
      : 0;

  return (
    <Card
      className={cn(
        'relative flex flex-col transition-all duration-200',
        plan.highlighted && 'border-primary z-10 scale-105 shadow-lg',
        isCurrentPlan && 'border-green-500 bg-green-50 dark:bg-green-950/20'
      )}
    >
      {plan.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
          <Sparkles className="mr-1 h-3 w-3" />
          Most Popular
        </Badge>
      )}

      {isCurrentPlan && (
        <Badge className="absolute -top-3 right-4" variant="secondary">
          Current Plan
        </Badge>
      )}

      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center">
            <CurrencyIcon className="h-6 w-6" />
            <span className="text-4xl font-bold">{(price / 100).toLocaleString()}</span>
          </div>
          <span className="text-muted-foreground">/{billingInterval}</span>

          {billingInterval === 'yearly' && yearlyDiscount > 0 && (
            <p className="mt-1 text-sm font-medium text-green-600">
              Save {yearlyDiscount}% with yearly billing
            </p>
          )}
        </div>

        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={plan.highlighted ? 'default' : 'outline'}
          disabled={isCurrentPlan || isProcessing || isLoading || isFree}
          onClick={handleSelectPlan}
        >
          {isProcessing
            ? 'Processing...'
            : isCurrentPlan
              ? 'Current Plan'
              : isFree
                ? 'Free Forever'
                : isUpgrade
                  ? 'Upgrade Now'
                  : isDowngrade
                    ? 'Downgrade'
                    : 'Get Started'}
        </Button>
      </CardFooter>
    </Card>
  );
}

function getPlanRank(plan: SubscriptionPlan): number {
  const ranks: Record<SubscriptionPlan, number> = {
    free: 0,
    pro: 1,
    premium: 2,
  };
  return ranks[plan];
}
```

### Create: `src/components/subscription/billing-section.tsx`

```tsx
import { format } from 'date-fns';
import {
  CreditCard,
  Download,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  IndianRupee,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useCurrentSubscription,
  usePaymentHistory,
  useCancelSubscription,
  useResumeSubscription,
  usePauseSubscription,
} from '@/hooks/subscription';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatAmount } from '@/lib/razorpay';
import { Link } from 'react-router-dom';

export function BillingSection() {
  const { data: subscriptionData, isLoading: isLoadingSubscription } = useCurrentSubscription();
  const { data: paymentsData, isLoading: isLoadingPayments } = usePaymentHistory(5);
  const { mutate: cancelSubscription, isPending: isCanceling } = useCancelSubscription();
  const { mutate: resumeSubscription, isPending: isResuming } = useResumeSubscription();
  const { mutate: pauseSubscription, isPending: isPausing } = usePauseSubscription();

  if (isLoadingSubscription) {
    return <BillingSkeleton />;
  }

  const subscription = subscriptionData?.data;
  const payments = paymentsData?.data?.payments || [];

  const isFree = subscription?.plan === 'free';
  const isActive = subscription?.status === 'active';
  const isPaused = subscription?.status === 'paused';
  const isCancelled = subscription?.status === 'cancelled';
  const isHalted = subscription?.status === 'halted';

  const CurrencyIcon = subscription?.currency === 'INR' ? IndianRupee : DollarSign;

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold capitalize">{subscription?.plan} Plan</h3>
              <p className="text-muted-foreground text-sm">
                {isFree ? (
                  'Free forever'
                ) : subscription?.currentPeriodEnd ? (
                  <>
                    {isActive && (
                      <>
                        Next billing on{' '}
                        {format(new Date(subscription.currentPeriodEnd), 'MMM d, yyyy')}
                      </>
                    )}
                    {isPaused && 'Subscription is paused'}
                    {isCancelled && (
                      <>
                        Access until{' '}
                        {format(new Date(subscription.currentPeriodEnd), 'MMM d, yyyy')}
                      </>
                    )}
                  </>
                ) : null}
              </p>
            </div>
            <Badge variant={getStatusVariant(subscription?.status)}>{subscription?.status}</Badge>
          </div>

          {isHalted && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your subscription is halted due to payment failure. Please update your payment
                method to continue.
              </AlertDescription>
            </Alert>
          )}

          {isPaused && (
            <Alert>
              <Pause className="h-4 w-4" />
              <AlertDescription>
                Your subscription is paused. Resume it anytime to continue enjoying premium
                features.
              </AlertDescription>
            </Alert>
          )}

          {isCancelled && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your subscription has been cancelled. You can still access premium features until
                the end of your billing period.
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          <div className="flex flex-wrap gap-3">
            {!isFree && (
              <>
                {isActive && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" disabled={isPausing}>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Subscription
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Pause Subscription?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Your subscription will be paused at the end of the current billing
                            cycle. You can resume it anytime.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => pauseSubscription()}>
                            Pause Subscription
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={isCanceling}>
                          Cancel Subscription
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Your subscription will remain active until the end of the current
                            billing period. After that, you'll be downgraded to the Free plan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => cancelSubscription({ immediate: false })}
                            className="bg-destructive text-destructive-foreground"
                          >
                            {isCanceling ? 'Canceling...' : 'Yes, Cancel'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}

                {isPaused && (
                  <Button onClick={() => resumeSubscription()} disabled={isResuming}>
                    <Play className="mr-2 h-4 w-4" />
                    {isResuming ? 'Resuming...' : 'Resume Subscription'}
                  </Button>
                )}
              </>
            )}

            {isFree && (
              <Button asChild>
                <Link to="/pricing">Upgrade Plan</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      {!isFree && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent payments</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPayments ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : payments.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center">No payments yet</p>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {formatAmount(payment.amount, payment.currency)}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {payment.capturedAt
                          ? format(new Date(payment.capturedAt), 'MMM d, yyyy')
                          : format(new Date(payment.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          payment.status === 'captured'
                            ? 'default'
                            : payment.status === 'failed'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {payment.status}
                      </Badge>
                      <span className="text-muted-foreground text-xs capitalize">
                        {payment.method}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getStatusVariant(status?: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'active':
      return 'default';
    case 'paused':
      return 'secondary';
    case 'cancelled':
    case 'halted':
    case 'expired':
      return 'destructive';
    default:
      return 'outline';
  }
}

function BillingSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    </div>
  );
}
```

### Create: `src/components/subscription/upgrade-prompt.tsx`

```tsx
import { Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { SubscriptionPlan } from '@/type/subscription';

interface UpgradePromptProps {
  feature: string;
  requiredPlan: SubscriptionPlan;
  currentPlan: SubscriptionPlan;
}

export function UpgradePrompt({ feature, requiredPlan, currentPlan }: UpgradePromptProps) {
  const navigate = useNavigate();

  if (getPlanRank(currentPlan) >= getPlanRank(requiredPlan)) {
    return null;
  }

  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
          <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">
            {feature} requires {requiredPlan} plan
          </h4>
          <p className="text-muted-foreground text-sm">
            Upgrade to unlock this feature and many more
          </p>
        </div>
        <Button onClick={() => navigate('/pricing')} className="shrink-0">
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}

function getPlanRank(plan: SubscriptionPlan): number {
  const ranks: Record<SubscriptionPlan, number> = {
    free: 0,
    pro: 1,
    premium: 2,
  };
  return ranks[plan];
}
```

### Create: `src/components/subscription/plan-badge.tsx`

```tsx
import { Crown, Sparkles, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SubscriptionPlan } from '@/type/subscription';

interface PlanBadgeProps {
  plan: SubscriptionPlan;
  className?: string;
  showIcon?: boolean;
}

export function PlanBadge({ plan, className, showIcon = true }: PlanBadgeProps) {
  const config = {
    free: {
      label: 'Free',
      icon: User,
      variant: 'secondary' as const,
      className: '',
    },
    pro: {
      label: 'Pro',
      icon: Sparkles,
      variant: 'default' as const,
      className: 'bg-blue-500 hover:bg-blue-600',
    },
    premium: {
      label: 'Premium',
      icon: Crown,
      variant: 'default' as const,
      className:
        'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
    },
  };

  const { label, icon: Icon, variant, className: planClassName } = config[plan];

  return (
    <Badge variant={variant} className={cn(planClassName, className)}>
      {showIcon && <Icon className="mr-1 h-3 w-3" />}
      {label}
    </Badge>
  );
}
```

### Create: `src/components/subscription/currency-toggle.tsx`

```tsx
import { IndianRupee, DollarSign } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Currency } from '@/type/subscription';

interface CurrencyToggleProps {
  value: Currency;
  onChange: (currency: Currency) => void;
}

export function CurrencyToggle({ value, onChange }: CurrencyToggleProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Currency)}>
      <TabsList className="grid w-32 grid-cols-2">
        <TabsTrigger value="INR" className="flex items-center gap-1">
          <IndianRupee className="h-3 w-3" />
          INR
        </TabsTrigger>
        <TabsTrigger value="USD" className="flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          USD
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
```

---

## Pages Implementation

### Create: `src/pages/pricing.tsx`

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlanCard } from '@/components/subscription/plan-card';
import { CurrencyToggle } from '@/components/subscription/currency-toggle';
import { useSubscriptionPlans, useCurrentSubscription } from '@/hooks/subscription';
import { Skeleton } from '@/components/ui/skeleton';
import { BillingInterval, Currency } from '@/type/subscription';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  const [currency, setCurrency] = useState<Currency>('INR');
  const { data: plansData, isLoading: isLoadingPlans } = useSubscriptionPlans();
  const { data: subscriptionData, isLoading: isLoadingSubscription } = useCurrentSubscription();

  const plans = plansData?.data || [];
  const currentPlan = subscriptionData?.data?.plan || 'free';
  const isLoading = isLoadingPlans || isLoadingSubscription;

  return (
    <div className="container max-w-6xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Unlock the full potential of StoryChain with our premium plans. Start creating amazing
          stories today.
        </p>
      </motion.div>

      {/* Billing & Currency Toggle */}
      <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Tabs
          value={billingInterval}
          onValueChange={(v) => setBillingInterval(v as BillingInterval)}
        >
          <TabsList className="grid w-64 grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">
                Save 20%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <CurrencyToggle value={currency} onChange={setCurrency} />
      </div>

      {/* Plan Cards */}
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[500px] rounded-xl" />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid items-start gap-8 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <PlanCard
                plan={plan}
                currentPlan={currentPlan}
                billingInterval={billingInterval}
                currency={currency}
                isLoading={isLoading}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground mb-4 text-sm">Secure payments powered by Razorpay</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-muted-foreground text-sm">We accept:</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-muted rounded px-2 py-1">UPI</span>
            <span className="bg-muted rounded px-2 py-1">Cards</span>
            <span className="bg-muted rounded px-2 py-1">Net Banking</span>
            <span className="bg-muted rounded px-2 py-1">Wallets</span>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cancel">
              <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. Your access will continue until
                the end of your billing period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="downgrade">
              <AccordionTrigger>What happens to my stories if I downgrade?</AccordionTrigger>
              <AccordionContent>
                Your stories are never deleted. You'll still have read access, but some features may
                be limited based on your new plan. Existing content beyond limits will be preserved
                but you won't be able to create new ones.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund">
              <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
              <AccordionContent>
                We offer a 7-day money-back guarantee for all paid plans. Contact support if you're
                not satisfied.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-methods">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept UPI, all major credit/debit cards (Visa, Mastercard, RuPay), net banking
                from 50+ banks, and popular wallets like Paytm, PhonePe, and Google Pay.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="international">
              <AccordionTrigger>Can I pay in USD if I'm outside India?</AccordionTrigger>
              <AccordionContent>
                Yes! We support international payments in USD. Simply toggle to USD on the pricing
                page to see prices and pay in dollars using international cards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pause">
              <AccordionTrigger>Can I pause my subscription?</AccordionTrigger>
              <AccordionContent>
                Yes, you can pause your subscription at any time. Your billing will be paused and
                you can resume whenever you're ready.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.div>
    </div>
  );
}
```

### Create: `src/pages/subscription-success.tsx`

```tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';
import { useQueryClient } from '@tanstack/react-query';
import { subscriptionKeys, useCurrentSubscription } from '@/hooks/subscription';
import { QueryKey } from '@/lib/query-keys';

export default function SubscriptionSuccessPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: subscriptionData } = useCurrentSubscription();

  const plan = subscriptionData?.data?.plan || 'Premium';

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#a855f7'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#a855f7'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Invalidate queries to refresh subscription data
    queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
    queryClient.invalidateQueries({ queryKey: QueryKey.user.me });
  }, [queryClient]);

  return (
    <div className="container max-w-lg py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden text-center">
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          <CardContent className="pt-10 pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
            >
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 flex items-center justify-center gap-2"
            >
              <PartyPopper className="h-6 w-6 text-amber-500" />
              <h1 className="text-3xl font-bold">Welcome to {plan}!</h1>
              <PartyPopper className="h-6 w-6 scale-x-[-1] text-amber-500" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-8"
            >
              Your subscription is now active. Enjoy all the premium features!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button onClick={() => navigate('/')} className="w-full" size="lg">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/profile?tab=billing')}
                className="w-full"
              >
                View Billing Details
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 border-t pt-6"
            >
              <p className="text-muted-foreground text-sm">
                A receipt has been sent to your email address.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
```

---

## Protected Features by Plan

### Create: `src/hooks/useSubscriptionGate.ts`

```typescript
import { useCurrentSubscription } from './subscription';
import { SubscriptionPlan, IPlanLimits } from '@/type/subscription';

interface FeatureGate {
  allowed: boolean;
  requiredPlan: SubscriptionPlan;
  currentPlan: SubscriptionPlan;
}

const PLAN_RANKS: Record<SubscriptionPlan, number> = {
  free: 0,
  pro: 1,
  premium: 2,
};

const PLAN_LIMITS: Record<SubscriptionPlan, IPlanLimits> = {
  free: {
    maxStories: 3,
    maxChaptersPerStory: 10,
    maxBranchesPerMonth: 5,
    maxCollaborators: 2,
    hasAiAssistance: false,
    aiAssistanceLevel: 'none',
    hasPrioritySupport: false,
    hasAnalytics: true,
    analyticsLevel: 'basic',
    exportFormats: [],
    hasAdFree: false,
    maxCustomBadges: 0,
  },
  pro: {
    maxStories: 15,
    maxChaptersPerStory: 50,
    maxBranchesPerMonth: 25,
    maxCollaborators: 10,
    hasAiAssistance: true,
    aiAssistanceLevel: 'basic',
    hasPrioritySupport: false,
    hasAnalytics: true,
    analyticsLevel: 'advanced',
    exportFormats: ['pdf'],
    hasAdFree: true,
    maxCustomBadges: 3,
  },
  premium: {
    maxStories: Infinity,
    maxChaptersPerStory: Infinity,
    maxBranchesPerMonth: Infinity,
    maxCollaborators: Infinity,
    hasAiAssistance: true,
    aiAssistanceLevel: 'advanced',
    hasPrioritySupport: true,
    hasAnalytics: true,
    analyticsLevel: 'premium',
    exportFormats: ['pdf', 'epub', 'docx', 'txt'],
    hasAdFree: true,
    maxCustomBadges: Infinity,
  },
};

/**
 * Check if user has access to a plan level
 */
export function useSubscriptionGate(requiredPlan: SubscriptionPlan): FeatureGate {
  const { data } = useCurrentSubscription();
  const currentPlan = data?.data?.plan || 'free';

  return {
    allowed: PLAN_RANKS[currentPlan] >= PLAN_RANKS[requiredPlan],
    requiredPlan,
    currentPlan,
  };
}

/**
 * Get current plan limits
 */
export function usePlanLimits(): {
  plan: SubscriptionPlan;
  limits: IPlanLimits;
  isLoading: boolean;
} {
  const { data, isLoading } = useCurrentSubscription();
  const plan = data?.data?.plan || 'free';

  return {
    plan,
    limits: PLAN_LIMITS[plan],
    isLoading,
  };
}

// Feature-specific hooks
export function useCanCreateStory() {
  const { plan, limits, isLoading } = usePlanLimits();

  return {
    limit: limits.maxStories,
    plan,
    isLoading,
    isUnlimited: limits.maxStories === Infinity,
  };
}

export function useCanUseAI() {
  return useSubscriptionGate('pro');
}

export function useCanAddCollaborators() {
  const { plan, limits } = usePlanLimits();

  return {
    limit: limits.maxCollaborators,
    plan,
    isUnlimited: limits.maxCollaborators === Infinity,
  };
}

export function useHasAdvancedAnalytics() {
  return useSubscriptionGate('pro');
}

export function useHasPremiumExports() {
  return useSubscriptionGate('premium');
}

export function useCanExport(format: string) {
  const { limits, plan } = usePlanLimits();

  return {
    allowed: limits.exportFormats.includes(format),
    availableFormats: limits.exportFormats,
    plan,
  };
}
```

---

## Integration with Existing Code

### Update: `src/App.tsx`

Add new routes:

```tsx
// Add imports
import PricingPage from './pages/pricing';
import SubscriptionSuccessPage from './pages/subscription-success';

// Add routes inside Routes component
<Route path="/pricing" element={<PricingPage />} />
<Route
  path="/subscription/success"
  element={
    <ProtectedRoute>
      <SubscriptionSuccessPage />
    </ProtectedRoute>
  }
/>
```

### Update Profile Sidebar: `src/components/profile/sidebar.tsx`

Add Billing section:

```tsx
// Add to sections array
{
  id: 'billing',
  label: 'Billing',
  icon: CreditCard,
}
```

### Update Profile Page: `src/pages/profile.tsx`

Add Billing section:

```tsx
// Add import
import { BillingSection } from '@/components/subscription/billing-section';

// Add to section rendering
{
  activeSection === 'billing' && <BillingSection />;
}
```

### Update Query Keys: `src/lib/query-keys.ts`

```typescript
export const QueryKey = {
  // ... existing keys
  subscription: {
    all: ['subscription'],
    plans: ['subscription', 'plans'],
    current: ['subscription', 'current'],
    payments: ['subscription', 'payments'],
    invoices: ['subscription', 'invoices'],
    usage: ['subscription', 'usage'],
  },
};
```

### Add to Navigation/Header

```tsx
// In your navigation component
import { useCurrentSubscription } from '@/hooks/subscription';
import { PlanBadge } from '@/components/subscription/plan-badge';

// Inside component
const { data } = useCurrentSubscription();
const plan = data?.data?.plan || 'free';

// In render
<Link to="/pricing">
  <PlanBadge plan={plan} />
</Link>;
```

---

## Testing Checklist

### Razorpay Test Mode

1. [ ] Use Razorpay test key*id (starts with `rzp_test*`)
2. [ ] Test card numbers:
   - Success: `4111111111111111`
   - Failure: `5104015555555558`
3. [ ] Test UPI: Use any VPA ending with `@razorpay`
4. [ ] Test Net Banking: Select any bank in test mode

### Functional Tests

1. [ ] View pricing page as guest
2. [ ] View pricing page as free user
3. [ ] Toggle between INR and USD pricing
4. [ ] Toggle between monthly and yearly billing
5. [ ] Create new subscription (Pro)
6. [ ] Create new subscription (Premium)
7. [ ] Complete Razorpay checkout
8. [ ] Verify payment success flow
9. [ ] Handle payment failure
10. [ ] Cancel subscription
11. [ ] Pause subscription
12. [ ] Resume subscription
13. [ ] View payment history
14. [ ] View invoices
15. [ ] Check feature gating works correctly

### Mobile Testing

1. [ ] Razorpay checkout works on mobile browsers
2. [ ] UPI intent opens correctly on mobile
3. [ ] Pricing page responsive layout

### Edge Cases

1. [ ] Handle Razorpay script load failure
2. [ ] Handle network errors during checkout
3. [ ] Handle modal dismiss before completion
4. [ ] Verify subscription status after page refresh
5. [ ] Test with slow network conditions

---

## Summary

This documentation provides a complete guide for integrating Razorpay with 3 subscription plans into the StoryChain frontend. Key components include:

- **Type definitions** for all subscription-related data
- **API layer** with full subscription management endpoints
- **React Query hooks** for data fetching and mutations
- **Razorpay checkout integration** with script loading and payment verification
- **UI components** for pricing cards, billing management, and upgrade prompts
- **Pages** for pricing selection and checkout success
- **Feature gating** based on subscription plan
- **Currency support** for both INR and USD

### Key Differences from Stripe

| Aspect                 | Stripe                   | Razorpay              |
| ---------------------- | ------------------------ | --------------------- |
| Integration            | Stripe Elements/Checkout | Script-based Checkout |
| Payment Flow           | Redirect to Stripe       | Modal overlay         |
| Signature Verification | Server-side              | Server-side           |
| Indian Payments        | Limited UPI              | Full UPI, Net Banking |
| Pricing                | USD-focused              | INR-focused           |

Follow the implementation steps in order, and refer to the testing checklist before deploying to production.
