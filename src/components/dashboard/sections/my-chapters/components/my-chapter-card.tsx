import { ArrowRight, BookOpen, Eye, FileEdit } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router';

export default function MyChapterCard() {
  const navigate = useNavigate();

  // 🔹 Static mock data (replace later)
  const chapter = {
    id: 'chapter-1',
    title: 'The Awakening of the Forgotten King',
    slug: 'the-awakening-of-the-forgotten-king',
    status: 'Draft',
    reads: 482,
    storyTitle: 'Rise of the Forgotten Realm',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  };

  return (
    <div
      onClick={() => navigate(`/chapters/${chapter.slug}`)}
      className="group/chapter-card bg-card/50 hover:bg-card/50 relative cursor-pointer overflow-hidden rounded-[14px] p-1.5 transition-all duration-300"
    >
      {/* ✨ HOVER GRADIENT OVERLAY */}
      <div className="from-primary/5 via-secondary/10 to-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover/chapter-card:opacity-100" />

      {/* ================= CARD CONTENT ================= */}
      <div className="relative flex flex-1 flex-col justify-between gap-2 rounded-[12px] border p-3 shadow">
        {/* TOP ACCENT */}
        <div className="bg-secondary absolute inset-x-16 top-0 h-[2px] rounded-b-full" />

        {/* STORY + ICON */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full border">
            <BookOpen size={18} className="text-muted-foreground" />
          </div>
          <div className="text-muted-foreground truncate text-sm">{chapter.storyTitle}</div>
        </div>

        {/* STATUS + TITLE */}
        <div className="mb-3 flex flex-col gap-1">
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <FileEdit size={12} />
            {chapter.status}
          </span>
          <h3 className="text-[15px] leading-tight font-medium">{chapter.title}</h3>
        </div>

        {/* STATS */}
        <div className="mt-auto flex items-center gap-3 text-xs">
          <div className="text-muted-foreground flex items-center gap-1">
            <Eye size={12} />
            {chapter.reads} reads
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-1.5 h-5 overflow-hidden">
        <span className="text-muted-foreground absolute top-0 left-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/chapter-card:-translate-x-[calc(100%+4px)]">
          Updated{' '}
          <time dateTime={chapter.updatedAt.toISOString()}>
            {formatDistance(chapter.updatedAt, new Date())}
          </time>
        </span>

        <span className="absolute top-0 right-0 flex translate-x-full items-center gap-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/chapter-card:-translate-x-2">
          Open Chapter <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
