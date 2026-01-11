import { motion } from 'framer-motion';
import { Trophy, Award, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { BadgeStats } from './badges.types';

interface BadgesStatsProps {
  stats: BadgeStats;
}

export const BadgesStats = ({ stats }: BadgesStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Badges Earned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="group border-border/50 bg-cream-95 hover:border-brand-pink-500/30 relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg"
      >
        <div className="from-brand-pink-500/10 to-brand-orange/10 absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br blur-xl transition-all group-hover:scale-150" />

        <div className="relative flex items-center gap-4">
          <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
            <Trophy className="text-brand-pink-500 h-6 w-6" />
          </div>
          <div>
            <motion.p
              className="text-text-primary text-2xl font-bold"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              {stats.earned}
            </motion.p>
            <p className="text-text-secondary-65 text-sm">Badges Earned</p>
          </div>
        </div>
      </motion.div>

      {/* Total Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="group border-border/50 bg-cream-95 hover:border-badge-amber/30 relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg"
      >
        <div className="from-badge-amber/10 to-badge-warning/10 absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br blur-xl transition-all group-hover:scale-150" />

        <div className="relative flex items-center gap-4">
          <div className="from-badge-amber/20 to-badge-warning/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br">
            <Award className="text-badge-amber h-6 w-6" />
          </div>
          <div>
            <motion.p
              className="text-text-primary text-2xl font-bold"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {stats.total}
            </motion.p>
            <p className="text-text-secondary-65 text-sm">Total Badges</p>
          </div>
        </div>
      </motion.div>

      {/* Completion Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="group border-border/50 bg-cream-95 hover:border-badge-success/30 relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-lg"
      >
        <div className="from-badge-success/10 to-badge-emerald/10 absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br blur-xl transition-all group-hover:scale-150" />

        <div className="relative space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="from-badge-success/20 to-badge-emerald/20 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
                <Target className="text-badge-success h-4 w-4" />
              </div>
              <span className="text-text-secondary-65 text-sm">Completion</span>
            </div>
            <motion.span
              className="text-text-primary text-lg font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {stats.completion}%
            </motion.span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          >
            <Progress value={stats.completion} className="h-2" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
