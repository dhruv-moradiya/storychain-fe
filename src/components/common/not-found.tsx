import { motion } from 'framer-motion';
import { SearchX, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

// Animation variants
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  icon?: React.ReactNode;
}

export function NotFound({
  title = 'Page Not Found',
  message = "The page you're looking for doesn't exist or has been moved.",
  showHomeButton = true,
  showBackButton = true,
  icon,
}: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-cream min-h-screen">
      <div className="container mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-16">
        <motion.div
          {...fadeIn()}
          className="w-full overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-8 text-center shadow-sm"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-brand-blue mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
          >
            {icon || (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <SearchX className="text-brand-blue h-12 w-12" />
              </motion.div>
            )}
          </motion.div>

          {/* 404 Number */}
          <motion.div
            {...fadeIn(0.1)}
            className="text-brand-pink-500 mb-2 font-mono text-6xl font-bold"
          >
            404
          </motion.div>

          {/* Text */}
          <motion.div {...fadeIn(0.15)} className="space-y-2">
            <h1 className="text-primary font-serif text-2xl font-bold">{title}</h1>
            <p className="-text-secondary-75 font-mono text-sm">{message}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            {...fadeIn(0.25)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            {showHomeButton && (
              <Button
                onClick={() => navigate('/')}
                className="bg-brand-pink-500 gap-2 font-mono text-sm text-white"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
            {showBackButton && (
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="gap-2 border-black/10 font-mono text-sm hover:bg-black/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
