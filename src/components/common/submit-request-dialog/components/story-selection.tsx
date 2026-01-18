import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Check, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSearchStories } from '@/hooks/story/story.queries';
import type { StoryOption } from '../submit-request-dialog.types';
import type { IStory } from '@/type/story';

interface StorySelectionProps {
  stories: StoryOption[];
  selectedStoryId: string;
  onSelect: (storyId: string) => void;
  isLoading?: boolean;
}

// Transform IStory to StoryOption
function transformStoryToOption(story: IStory): StoryOption {
  return {
    id: story._id,
    title: story.title,
    slug: story.slug,
    genre: story.settings?.genres?.[0] || 'Unknown',
    chapterCount: story.stats?.totalChapters || 0,
  };
}

export function StorySelection({
  stories,
  selectedStoryId,
  onSelect,
  isLoading,
}: StorySelectionProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Search stories API
  const { data: searchResults, isLoading: isSearching } = useSearchStories(debouncedSearch, {
    limit: 10,
    enabled: debouncedSearch.length >= 2,
  });

  // Use search results if available, otherwise filter local stories
  const filteredStories = useMemo(() => {
    if (debouncedSearch.length >= 2 && searchResults) {
      return searchResults.map(transformStoryToOption);
    }
    // Filter locally for short searches or when no search results
    return stories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));
  }, [debouncedSearch, searchResults, stories, search]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 border-black/10 bg-white/50 pr-9 pl-9 font-mono text-sm"
        />
        {isSearching && (
          <Loader2 className="text-text-secondary-65 absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {/* Story list */}
      <div className="max-h-[140px] space-y-2 overflow-y-auto pr-1">
        {isSearching ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="text-brand-pink-500 h-5 w-5 animate-spin" />
          </div>
        ) : filteredStories.length === 0 ? (
          <p className="text-text-secondary-65 py-4 text-center text-sm">No stories found</p>
        ) : (
          filteredStories.map((story) => {
            const isSelected = selectedStoryId === story.id;
            return (
              <button
                key={story.id}
                onClick={() => onSelect(story.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-all',
                  isSelected
                    ? 'border-brand-blue bg-brand-blue/5'
                    : 'border-black/10 hover:border-black/20 hover:bg-black/[0.02]'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    isSelected ? 'bg-brand-blue/15' : 'bg-black/5'
                  )}
                >
                  <BookOpen
                    className={cn(
                      'h-4 w-4',
                      isSelected ? 'text-brand-blue' : 'text-text-secondary-65'
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary truncate text-sm font-medium">{story.title}</p>
                  <p className="text-text-secondary-65 font-mono text-xs">
                    {story.genre} · {story.chapterCount} chapters
                  </p>
                </div>
                {isSelected && (
                  <div className="bg-brand-blue flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
