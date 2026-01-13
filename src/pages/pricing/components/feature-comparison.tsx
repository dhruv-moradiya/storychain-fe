import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Infinity as InfinityIcon } from 'lucide-react';
import type { PlanFeature } from '../pricing.types';

interface FeatureComparisonProps {
  features: PlanFeature[];
}

export function FeatureComparison({ features }: FeatureComparisonProps) {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="font-yellowtail text-brand-blue mb-2 block text-lg">Compare plans</span>
          <h2 className="font-libreBaskerville text-text-tertiary text-2xl tracking-tight sm:text-3xl">
            Find what's right for you
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-border/50 bg-cream-95 overflow-hidden rounded-2xl border"
        >
          <ScrollArea className="w-full">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-border/30 border-b">
                  <th className="text-text-primary p-4 text-left text-sm font-semibold">
                    Features
                  </th>
                  <th className="p-4 text-center">
                    <div className="text-text-secondary-65 text-sm font-semibold">Free</div>
                  </th>
                  <th className="bg-brand-pink-500/5 p-4 text-center">
                    <div className="text-brand-pink-500 text-sm font-semibold">Pro</div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="text-brand-orange text-sm font-semibold">Premium</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={cn(
                      'border-border/30 border-b last:border-b-0',
                      index % 2 === 0 ? 'bg-white/30' : ''
                    )}
                  >
                    <td className="text-text-primary p-4 text-sm">{feature.name}</td>
                    <td className="p-4 text-center">
                      <FeatureValue value={feature.free} />
                    </td>
                    <td className="bg-brand-pink-500/5 p-4 text-center">
                      <FeatureValue value={feature.pro} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <FeatureValue value={feature.premium} />
                    </td>
                  </motion.tr>
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
