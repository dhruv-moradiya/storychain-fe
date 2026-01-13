import { BookOpen, Zap, Crown } from 'lucide-react';
import type { Plan, PlanFeature, FAQ } from './pricing.types';

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started with storytelling',
    monthlyPriceINR: 0,
    yearlyPriceINR: 0,
    monthlyPriceUSD: 0,
    yearlyPriceUSD: 0,
    icon: BookOpen,
    color: 'text-text-secondary-65',
    bgColor: 'bg-muted/30',
    borderColor: 'border-border/50',
    features: [
      '3 Stories',
      '10 Chapters per Story',
      '5 Branches/month',
      '2 Collaborators',
      'Basic Analytics',
      'Community Support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious writers and small teams',
    monthlyPriceINR: 79900,
    yearlyPriceINR: 767000,
    monthlyPriceUSD: 999,
    yearlyPriceUSD: 9590,
    icon: Zap,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/5',
    borderColor: 'border-brand-blue/30',
    highlighted: true,
    features: [
      '15 Stories',
      '50 Chapters per Story',
      '25 Branches/month',
      '10 Collaborators',
      'AI Writing Assistance (Basic)',
      'Advanced Analytics',
      'PDF Export',
      '3 Custom Badges',
      'Ad-Free Experience',
      'Email Support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Unlimited power for professional creators',
    monthlyPriceINR: 149900,
    yearlyPriceINR: 1439000,
    monthlyPriceUSD: 1999,
    yearlyPriceUSD: 19190,
    icon: Crown,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/5',
    borderColor: 'border-brand-orange/30',
    features: [
      'Unlimited Stories',
      'Unlimited Chapters',
      'Unlimited Branches',
      'Unlimited Collaborators',
      'AI Writing Assistance (Advanced)',
      'Premium Analytics',
      'All Export Formats',
      'Unlimited Custom Badges',
      'Ad-Free Experience',
      '24/7 Priority Support',
    ],
  },
];

export const featureComparison: PlanFeature[] = [
  { name: 'Stories Created', free: '3', pro: '15', premium: 'Unlimited' },
  { name: 'Chapters per Story', free: '10', pro: '50', premium: 'Unlimited' },
  { name: 'Branch Creation', free: '5/month', pro: '25/month', premium: 'Unlimited' },
  { name: 'Collaborators', free: '2', pro: '10', premium: 'Unlimited' },
  { name: 'AI Writing Assistance', free: false, pro: 'Basic', premium: 'Advanced' },
  { name: 'Analytics Dashboard', free: 'Basic', pro: 'Advanced', premium: 'Premium' },
  { name: 'Export Options', free: false, pro: 'PDF', premium: 'All Formats' },
  { name: 'Custom Badges', free: false, pro: '3', premium: 'Unlimited' },
  { name: 'Ad-Free Experience', free: false, pro: true, premium: true },
  { name: 'Priority Support', free: false, pro: 'Email', premium: '24/7 Chat' },
];

export const faqs: FAQ[] = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period. No hidden fees or cancellation charges.',
  },
  {
    question: 'What happens to my stories if I downgrade?',
    answer:
      "Your stories are never deleted. You'll still have read access, but some features may be limited based on your new plan. Existing content beyond limits will be preserved but you won't be able to create new ones.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact support within 7 days of your purchase for a full refund.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI, all major credit/debit cards (Visa, Mastercard, RuPay), net banking from 50+ banks, and popular wallets like Paytm, PhonePe, and Google Pay.',
  },
  {
    question: "Can I pay in USD if I'm outside India?",
    answer:
      'Yes! We support international payments in USD. Simply toggle to USD on the pricing page to see prices and pay in dollars using international cards.',
  },
  {
    question: 'Can I pause my subscription?',
    answer:
      "Yes, you can pause your subscription at any time from your profile settings. Your billing will be paused and you can resume whenever you're ready.",
  },
];
