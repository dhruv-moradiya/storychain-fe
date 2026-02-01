import { motion } from 'motion/react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

const sizeConfig = {
  sm: { dot: 4, gap: 4 },
  md: { dot: 6, gap: 6 },
  lg: { dot: 8, gap: 8 },
};

export function Loader({ size = 'md', fullScreen = false, text }: LoaderProps) {
  const config = sizeConfig[size];

  const dots = [
    { color: 'var(--brand-pink-500)', delay: 0 },
    { color: 'var(--brand-blue)', delay: 0.15 },
    { color: 'var(--brand-orange)', delay: 0.3 },
  ];

  const content = (
    <div className="bg-bg-cream flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* Bouncing dots */}
      <div className="flex items-center justify-center" style={{ gap: config.gap }}>
        {dots.map((dot, index) => (
          <motion.div
            key={index}
            style={{
              width: config.dot,
              height: config.dot,
              backgroundColor: dot.color,
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -config.dot * 1.5, 0],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {text && (
        <motion.p
          className="text-text-secondary text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="bg-bg-cream/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
