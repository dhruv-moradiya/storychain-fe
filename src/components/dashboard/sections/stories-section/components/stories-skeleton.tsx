export default function StoriesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted relative h-40 overflow-hidden rounded-md">
            {/* Shimmer Animation */}
            <div
              className="absolute inset-0 animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black, transparent)',
              }}
            />
          </div>
        ))}
      </div>

      <style>
        {`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        `}
      </style>
    </div>
  );
}
