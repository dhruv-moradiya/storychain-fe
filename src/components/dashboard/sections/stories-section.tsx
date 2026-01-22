import StoryEditorDialog from '@/components/common/story-editor/story-editor-dialog';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import {
  StoriesEmpty,
  StoriesError,
  StoriesSkeleton,
  StoryCard,
  StoryStatusTabs,
} from './stories-section/index';
import { useGetUserStories } from '@/hooks/story/story.queries';
import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';

const StoriesSection = () => {
  const [searchParams] = useSearchParams();
  const selectedFilter = searchParams.get('tab') || 'all';

  const { data: stories, error, isLoading } = useGetUserStories();

  const [openStoryEditor, setOpenStoryEditor] = useState(false);

  if (isLoading) {
    return <StoriesSkeleton />;
  }

  if (error) {
    return <StoriesError onRetry={() => {}} />;
  }

  if (!stories || stories.length === 0) {
    return (
      <>
        <StoriesEmpty onCreate={() => setOpenStoryEditor(true)} />

        <StoryEditorDialog open={openStoryEditor} onOpenChange={setOpenStoryEditor} />
      </>
    );
  }

  // ---- FILTER STORIES ----
  const filteredStories = stories.filter((story) =>
    selectedFilter === 'all' ? true : story.status === selectedFilter.toUpperCase()
  );

  // 4️⃣ SUCCESS UI
  return (
    <DashboardContentLayout maxWidth="7xl" paddingSize="none">
      <StoryStatusTabs />

      <DashboardGrid minItemWidth={250} gap="md">
        {/* CREATE STORY BUTTON */}
        {selectedFilter === 'all' && (
          <div
            className="group border-brand-pink-500/30 from-brand-pink-500/5 to-brand-orange/5 hover:border-brand-pink-500/60 hover:from-brand-pink-500/10 hover:to-brand-orange/10 hover:shadow-brand-pink-500/10 relative col-span-1 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-gradient-to-br transition-all duration-300 hover:bg-gradient-to-br hover:shadow-lg"
            onClick={() => setOpenStoryEditor(true)}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                <Plus className="text-brand-pink-500 h-6 w-6" />
              </div>
              <span className="text-text-secondary group-hover:text-brand-pink-500 font-medium transition-colors">
                Create Story
              </span>
              <span className="text-text-secondary-65 text-xs">Start a new adventure</span>
            </div>
          </div>
        )}

        {/* STORY CARDS */}
        {filteredStories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </DashboardGrid>

      <StoryEditorDialog open={openStoryEditor} onOpenChange={setOpenStoryEditor} />
    </DashboardContentLayout>
  );
};

export default StoriesSection;
