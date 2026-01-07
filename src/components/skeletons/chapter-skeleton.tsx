import { Skeleton } from '../ui/skeleton';

function ChapterSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      {/* Title */}
      <Skeleton className="mx-auto h-10 w-2/3" />

      {/* Meta */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Content paragraphs */}
      <div className="mt-8 space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

export { ChapterSkeleton };
