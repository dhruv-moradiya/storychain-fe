import { useGetMyChapters } from '@/hooks/chapter';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';
import MyChapterCard from './my-chapter-card';
import { DashboardSection, DashboardGrid, DashboardEmptyState } from '@/components/dashboard';

export default function MyChapterList() {
  const { data: chaptersResponse, isLoading, error } = useGetMyChapters();
  const chapters = chaptersResponse?.data || [];

  // Loading state
  if (isLoading) {
    return (
      <DashboardSection title="My Chapters">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <DashboardGrid minItemWidth={250} gap="md">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-[14px]" />
          ))}
        </DashboardGrid>
      </DashboardSection>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardSection title="My Chapters">
        <DashboardEmptyState title="Failed to load chapters" />
      </DashboardSection>
    );
  }

  // Empty state
  if (chapters.length === 0) {
    return (
      <DashboardSection title="My Chapters">
        <DashboardEmptyState
          icon={<FileText className="text-muted-foreground h-6 w-6" />}
          title="No chapters yet"
          description="Start writing to see your chapters here"
        />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection title="My Chapters" headerAction={<span>{chapters.length} chapters</span>}>
      <DashboardGrid minItemWidth={250} gap="md">
        {chapters.map((chapter) => (
          <MyChapterCard key={chapter._id} chapter={chapter} />
        ))}
      </DashboardGrid>
    </DashboardSection>
  );
}
