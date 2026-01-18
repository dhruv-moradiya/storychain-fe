import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Filter, Users } from 'lucide-react';
import type { FunnelStep } from '../analytics.types';

interface EngagementFunnelProps {
  data: FunnelStep[];
}

const funnelColors = [
  'bg-brand-pink-500',
  'bg-brand-pink-400',
  'bg-brand-blue',
  'bg-brand-blue/80',
  'bg-brand-orange',
  'bg-brand-orange/80',
];

export function EngagementFunnel({ data }: EngagementFunnelProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <div className="h-1 w-1 rounded-full bg-purple-500" />
          Engagement Funnel
        </h3>
        <Filter className="text-text-secondary-65 h-4 w-4" />
      </div>

      <div className="space-y-3">
        {data.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            className="group"
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-text-primary text-xs font-medium">{step.label}</span>
              <span className="text-text-secondary-65 text-xs">
                {step.percentage}% (
                {step.value >= 1000 ? `${(step.value / 1000).toFixed(1)}K` : step.value})
              </span>
            </div>
            <div className="bg-border/30 relative h-6 overflow-hidden rounded-lg">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${step.percentage}%` } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
                className={cn(
                  'absolute inset-y-0 left-0 flex items-center justify-end rounded-lg pr-2 transition-all',
                  funnelColors[index] || 'bg-gray-400'
                )}
              >
                {step.percentage >= 20 && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-white">
                    <Users className="h-3 w-3" />
                    <span>
                      {step.value >= 1000 ? `${(step.value / 1000).toFixed(1)}K` : step.value}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Funnel Summary */}
      <div className="border-border/30 mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-text-secondary-65 text-xs">Overall Conversion</span>
        <span className="text-brand-pink-500 text-sm font-semibold">
          {data.length > 0 ? data[data.length - 1].percentage : 0}%
        </span>
      </div>
    </motion.div>
  );
}
