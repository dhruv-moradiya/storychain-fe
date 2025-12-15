import StoryEditorDialog from '@/components/common/story-editor/story-editor-dialog';
import { Plus } from 'lucide-react';
import { useSearchParams } from 'react-router';
// import { stories } from '../../../mock-data/stories';
import { useState } from 'react';
import {
  StoriesEmpty,
  StoriesError,
  StoriesSkeleton,
  StoryCard,
  StoryStatusTabs,
} from './stories-section/index';
import { useGetUserStories } from '@/hooks/story/story.queries';

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
    <div className="mx-auto max-w-7xl space-y-6">
      <StoryStatusTabs />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
        {/* CREATE STORY BUTTON */}
        {selectedFilter === 'all' && (
          <div
            className="bg-card/60 border-muted-foreground/40 group relative col-span-1 flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-all"
            onClick={() => setOpenStoryEditor(true)}
          >
            <button className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 text-sm transition-colors">
              <Plus className="size-4" />
              Create Story
            </button>
          </div>
        )}

        {/* STORY CARDS */}
        {filteredStories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>

      <StoryEditorDialog open={openStoryEditor} onOpenChange={setOpenStoryEditor} />
    </div>
  );
};

export default StoriesSection;
