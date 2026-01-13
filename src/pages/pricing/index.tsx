import { useState } from 'react';
import { PricingHero } from './components/pricing-hero';
import { BillingToggle } from './components/billing-toggle';
import { PlanCard } from './components/plan-card';
import { FeatureComparison } from './components/feature-comparison';
import { PaymentMethods } from './components/payment-methods';
import { PricingFAQ } from './components/pricing-faq';
import { plans, featureComparison, faqs } from './pricing.data';
import type { BillingInterval, Currency } from './pricing.types';

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  const [currency, setCurrency] = useState<Currency>('INR');

  return (
    <div className="bg-bg-cream min-h-screen">
      <PricingHero />

      <BillingToggle
        billingInterval={billingInterval}
        setBillingInterval={setBillingInterval}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Pricing Cards */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billingInterval={billingInterval}
              currency={currency}
              index={index}
            />
          ))}
        </div>
      </section>

      <FeatureComparison features={featureComparison} />
      <PaymentMethods />
      <PricingFAQ faqs={faqs} />
    </div>
  );
}
