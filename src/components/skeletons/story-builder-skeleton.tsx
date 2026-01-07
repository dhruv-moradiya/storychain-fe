import { Skeleton } from '../ui/skeleton';

function StoryBuilderSkeleton() {
  return (
    <div className="flex h-screen flex-col">
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-8 w-8 rounded" />
        ))}
        <div className="flex-1" />
        <Skeleton className="h-8 w-24 rounded" />
      </div>

      {/* Editor */}
      <div className="mx-auto w-full max-w-4xl flex-1 p-8">
        <Skeleton className="mb-6 h-10 w-1/2" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton
              key={i}
              className="h-4 w-full"
              style={{ width: `${100 - Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex justify-between border-t p-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export { StoryBuilderSkeleton };
