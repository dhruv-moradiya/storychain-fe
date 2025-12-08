import { motion } from 'framer-motion';

export const SectionDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <motion.div
      className="from-primary/40 h-[2px] flex-1 bg-gradient-to-r to-transparent"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.6 }}
    />
    <span className="bg-primary/5 text-muted-foreground rounded-full px-3 py-0.5 text-xs uppercase">
      {label}
    </span>
    <motion.div
      className="from-primary/40 h-[2px] flex-1 bg-gradient-to-l to-transparent"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.6 }}
    />
  </div>
);
