import MyChapterCard from './my-chapter-card';

export default function MyChapterList() {
  const chapters = Array.from({ length: 10 }, (_, index) => ({
    id: `chapter-${index + 1}`,
  }));

  return (
    <section className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">My Chapters</h2>
        <span className="text-muted-foreground text-xs">{chapters.length} chapters</span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
        {chapters.map((chapter) => (
          <MyChapterCard key={chapter.id} />
        ))}
      </div>
    </section>
  );
}
