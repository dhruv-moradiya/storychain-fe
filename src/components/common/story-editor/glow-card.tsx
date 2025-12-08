import { motion } from 'framer-motion';
import { memo } from 'react';

const GlowCardBase = ({ children }: { children: React.ReactNode }) => (
  <motion.div className="bg-background/40 hover:border-primary/40 rounded-lg border p-3 shadow-sm transition-all">
    {children}
  </motion.div>
);

export const GlowCard = memo(GlowCardBase);
