import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BookOpen } from 'lucide-react';
import type { ReadingProgressData } from '../analytics.types';

interface ReadingProgressProps {
  data: ReadingProgressData[];
}

const COLORS = [
  'hsl(var(--brand-pink-500))',
  'hsl(var(--brand-blue))',
  'hsl(var(--brand-orange))',
  '#22c55e',
  '#8b5cf6',
];

const chartConfig = {
  readers: {
    label: 'Readers',
  },
};

export function ReadingProgress({ data }: ReadingProgressProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <div className="h-1 w-1 rounded-full bg-purple-500" />
          Reading Progress
        </h3>
        <BookOpen className="text-text-secondary-65 h-4 w-4" />
      </div>

      <div className="flex items-center gap-4">
        {/* Pie Chart */}
        <ChartContainer config={chartConfig} className="h-[140px] w-[140px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="flex-1 space-y-1.5">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-text-primary text-xs">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-text-primary text-xs font-semibold">
                  {item.value.toLocaleString()}
                </span>
                <span className="text-text-secondary-65 text-[10px]">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
