import { useState } from 'react';
import { BookOpen, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { StoryOption } from '../create-pr-dialog.types';

interface StorySelectionProps {
  stories: StoryOption[];
  selectedStoryId: string;
  onSelect: (storyId: string) => void;
}

export function StorySelection({ stories, selectedStoryId, onSelect }: StorySelectionProps) {
  const [search, setSearch] = useState('');

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 border-black/10 bg-white/50 pl-9 font-mono text-sm"
        />
      </div>

      {/* Story list */}
      <div className="max-h-[140px] space-y-2 overflow-y-auto pr-1">
        {filteredStories.length === 0 ? (
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
