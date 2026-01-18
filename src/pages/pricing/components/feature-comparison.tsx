import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, scrollReveal } from '@/lib/utils';
import { Check, Infinity as InfinityIcon, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PlanFeature } from '../pricing.types';

interface FeatureComparisonProps {
  features: PlanFeature[];
}

export function FeatureComparison({ features }: FeatureComparisonProps) {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <motion.div
            {...scrollReveal.paragraph}
            className="border-brand-blue/20 bg-brand-blue/5 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          >
            <BarChart3 className="text-brand-blue h-4 w-4" />
            <span className="text-brand-blue text-sm font-medium">Compare plans</span>
          </motion.div>
          <motion.h2
            {...scrollReveal.heading}
            className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl"
          >
            Find what's right for you
          </motion.h2>
        </div>

        <motion.div
          {...scrollReveal.card(0)}
          className="border-border/50 bg-cream-95 hover:border-brand-pink-500/20 overflow-hidden rounded-2xl border transition-all"
        >
          <ScrollArea className="w-full">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-border/30 bg-cream-90/50 border-b">
                  <th className="text-text-primary p-5 text-left text-sm font-semibold">
                    Features
                  </th>
                  <th className="p-5 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="bg-text-secondary-65/10 flex h-8 w-8 items-center justify-center rounded-lg">
                        <span className="text-text-secondary-65 text-xs font-bold">F</span>
                      </div>
                      <span className="text-text-secondary-65 text-sm font-semibold">Free</span>
                    </div>
                  </th>
                  <th className="bg-brand-pink-500/5 p-5 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="bg-brand-pink-500/20 flex h-8 w-8 items-center justify-center rounded-lg">
                        <span className="text-brand-pink-500 text-xs font-bold">P</span>
                      </div>
                      <span className="text-brand-pink-500 text-sm font-semibold">Pro</span>
                    </div>
                  </th>
                  <th className="p-5 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="bg-brand-orange/20 flex h-8 w-8 items-center justify-center rounded-lg">
                        <span className="text-brand-orange text-xs font-bold">+</span>
                      </div>
                      <span className="text-brand-orange text-sm font-semibold">Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      'border-border/30 hover:bg-brand-pink-500/5 border-b transition-colors last:border-b-0',
                      index % 2 === 0 ? 'bg-white/30' : ''
                    )}
                  >
                    <td className="text-text-primary p-4 text-sm font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      <FeatureValue value={feature.free} />
                    </td>
                    <td className="bg-brand-pink-500/5 p-4 text-center">
                      <FeatureValue value={feature.pro} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <FeatureValue value={feature.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureValue({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check
        className={cn('mx-auto h-5 w-5', highlight ? 'text-brand-pink-500' : 'text-green-500')}
      />
    ) : (
      <span className="text-text-secondary-65 text-sm">—</span>
    );
  }

  if (value === 'Unlimited') {
    return (
      <div className="flex items-center justify-center gap-1">
        <InfinityIcon
          className={cn('h-4 w-4', highlight ? 'text-brand-pink-500' : 'text-brand-orange')}
        />
        <span
          className={cn(
            'text-sm font-medium',
            highlight ? 'text-brand-pink-500' : 'text-brand-orange'
          )}
        >
          {value}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        'text-sm',
        highlight ? 'text-brand-pink-500 font-medium' : 'text-text-secondary-65'
      )}
    >
      {value}
    </span>
  );
}
