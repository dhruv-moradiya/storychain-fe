import { Skeleton } from '@/components/ui/skeleton';

export function ChapterDetailsSkeleton() {
  return (
    <div className="bg-bg-cream min-h-screen">
      {/* Header Skeleton */}
      <header className="border-border/50 bg-bg-cream sticky top-0 z-10 border-b">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:py-16">
        {/* Title */}
        <div className="mb-10 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="border-border/50 mb-8 grid grid-cols-5 gap-2 rounded-xl border p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </main>
    </div>
  );
}
