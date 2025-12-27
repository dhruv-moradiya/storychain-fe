import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const OverviewSectionLoading = () => {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      className="mx-auto max-w-xl space-y-10 pb-14"
    >
      {/* Back button skeleton */}
      <motion.div
        variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
        className="bg-muted/50 h-8 w-20 rounded-md border"
      />

      {/* Cover image skeleton */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
        className="bg-muted/40 relative h-64 w-full overflow-hidden rounded-xl"
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="via-muted/60 absolute inset-0 w-full bg-gradient-to-r from-transparent to-transparent"
        />
      </motion.div>

      {/* Header skeleton */}
      <motion.header
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
        className="space-y-3"
      >
        <div className="bg-muted/50 h-4 w-40 rounded" />
        <div className="bg-muted/50 h-8 w-3/4 rounded" />

        {/* Tags skeleton */}
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted/50 h-4 w-16 rounded" />
          ))}
        </div>
      </motion.header>

      {/* Stats skeleton */}
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="space-y-4">
        <div className="bg-muted/50 h-5 w-32 rounded" />

        {/* Stat cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid gap-3"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0 },
              }}
              className="bg-muted/40 relative flex h-[42px] w-full items-center justify-between overflow-hidden rounded-md border px-3"
            >
              <motion.div
                animate={{ x: ['-120%', '120%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="via-muted/50 absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
              />
              <div className="bg-muted/50 h-4 w-24 rounded" />
              <div className="bg-muted/50 h-4 w-12 rounded" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Loader icon */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
        className="flex justify-center pt-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 size={22} className="text-muted-foreground/70" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default OverviewSectionLoading;
