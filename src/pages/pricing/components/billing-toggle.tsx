import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupee, DollarSign } from 'lucide-react';
import type { BillingInterval, Currency } from '../pricing.types';

interface BillingToggleProps {
  billingInterval: BillingInterval;
  setBillingInterval: (value: BillingInterval) => void;
  currency: Currency;
  setCurrency: (value: Currency) => void;
}

export function BillingToggle({
  billingInterval,
  setBillingInterval,
  currency,
  setCurrency,
}: BillingToggleProps) {
  return (
    <section className="px-6 pb-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 sm:flex-row">
        {/* Billing Interval Toggle */}
        <Tabs
          value={billingInterval}
          onValueChange={(v) => setBillingInterval(v as BillingInterval)}
        >
          <TabsList className="bg-cream-95 border-border/50 border">
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-brand-pink-500 data-[state=active]:text-white"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="data-[state=active]:bg-brand-pink-500 gap-2 data-[state=active]:text-white"
            >
              Yearly
              <Badge className="bg-green-500/20 text-[10px] text-green-700">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Currency Toggle */}
        <Tabs value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
          <TabsList className="bg-cream-95 border-border/50 grid w-32 grid-cols-2 border">
            <TabsTrigger
              value="INR"
              className="data-[state=active]:bg-brand-pink-500 flex items-center gap-1 data-[state=active]:text-white"
            >
              <IndianRupee className="h-3 w-3" />
              INR
            </TabsTrigger>
            <TabsTrigger
              value="USD"
              className="data-[state=active]:bg-brand-pink-500 flex items-center gap-1 data-[state=active]:text-white"
            >
              <DollarSign className="h-3 w-3" />
              USD
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}
