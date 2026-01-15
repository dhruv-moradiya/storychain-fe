import { Loader2 } from 'lucide-react';

/**
 * Minimal loader for lazy loading - shows a subtle spinner
 * The actual page will handle its own API loading states
 */
function MinimalLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 className="text-brand-pink-500/50 h-8 w-8 animate-spin" />
    </div>
  );
}

export { MinimalLoader };
