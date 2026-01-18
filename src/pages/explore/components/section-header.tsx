import { motion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
  delay?: number;
}

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  onSeeAll,
  delay = 0,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mb-5 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="from-brand-pink-500 to-brand-pink-600 shadow-brand-pink-500/20 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
          <Icon className="text-cream-95 h-5 w-5" />
        </div>
        <div>
          <h2 className="font-libreBaskerville text-text-tertiary text-xl font-bold tracking-tight sm:text-2xl">
            {title}
          </h2>
          {subtitle && <p className="text-text-secondary-65 mt-0.5 text-sm">{subtitle}</p>}
        </div>
      </div>

      {onSeeAll && (
        <motion.button
          whileHover={{ x: 4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSeeAll}
          className="bg-brand-pink-500/10 text-brand-pink-500 hover:bg-brand-pink-500/20 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
        >
          See All
          <ArrowRight size={16} />
        </motion.button>
      )}
    </motion.div>
  );
}
