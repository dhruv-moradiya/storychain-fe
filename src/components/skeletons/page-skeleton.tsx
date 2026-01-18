// src/components/skeletons/page-skeleton.tsx
import { Loader } from '@/components/common/loader';

/**
 * Generic page skeleton - use when no specific skeleton exists
 */
function PageSkeleton() {
  return <Loader size="md" />;
}

export { PageSkeleton };
