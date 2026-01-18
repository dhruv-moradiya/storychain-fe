import { Loader } from '@/components/common/loader';

/**
 * Minimal loader for lazy loading - shows a subtle spinner
 * The actual page will handle its own API loading states
 */
function MinimalLoader() {
  return <Loader size="sm" />;
}

export { MinimalLoader };
