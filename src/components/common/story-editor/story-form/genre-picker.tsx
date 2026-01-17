import { memo, useState, useMemo } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GENRE_CATEGORIES, ALL_GENRES } from '@/constants/story.constants';

// Re-export for backward compatibility
export { GENRE_CATEGORIES } from '@/constants/story.constants';

type GenreItem = { value: string; label: string; description: string };
type CategoryMap = Record<string, { label: string; genres: readonly GenreItem[] }>;

type GenrePickerProps = {
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  error?: string;
};

export const GenrePicker = memo(
  ({ value = [], onChange, maxSelections = 5, error }: GenrePickerProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selectedGenres = useMemo((): GenreItem[] => {
      return value
        .map((v) => ALL_GENRES.find((g) => g.value === v))
        .filter((g): g is GenreItem => g !== undefined);
    }, [value]);

    const filteredCategories = useMemo((): CategoryMap => {
      if (!search.trim()) return GENRE_CATEGORIES as unknown as CategoryMap;

      const searchLower = search.toLowerCase();
      const filtered: CategoryMap = {};

      Object.entries(GENRE_CATEGORIES).forEach(([key, category]) => {
        const matchingGenres = category.genres.filter(
          (g) =>
            g.label.toLowerCase().includes(searchLower) ||
            g.value.toLowerCase().includes(searchLower)
        );
        if (matchingGenres.length > 0) {
          filtered[key] = {
            label: category.label,
            genres: matchingGenres,
          };
        }
      });

      return filtered;
    }, [search]);

    const handleToggle = (genreValue: string) => {
      if (value.includes(genreValue)) {
        onChange(value.filter((v) => v !== genreValue));
      } else if (value.length < maxSelections) {
        onChange([...value, genreValue]);
      }
    };

    const handleRemove = (genreValue: string) => {
      onChange(value.filter((v) => v !== genreValue));
    };

    return (
      <div className="space-y-2">
        {/* Selected Genres Display */}
        <div className="flex min-h-[32px] flex-wrap gap-1.5">
          {selectedGenres.length > 0 ? (
            selectedGenres.map((genre) => (
              <span key={genre.value}>
                {createBadge({
                  label: genre.label,
                  color: 'pink',
                  size: 'sm',
                  shape: 'pill',
                  style: 'soft',
                  removable: true,
                  onRemove: () => handleRemove(genre.value),
                })}
              </span>
            ))
          ) : (
            <span className="text-text-secondary-65 text-sm">No genres selected</span>
          )}
        </div>

        {/* Genre Picker Popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                'h-9 w-full justify-between rounded-lg font-normal',
                'border-black/10 bg-white/60 hover:bg-white/80',
                'focus:border-brand-pink-500 focus:ring-0',
                error && 'border-red-500'
              )}
            >
              <span className="text-text-secondary-65">
                {value.length === 0
                  ? 'Select genres...'
                  : `${value.length}/${maxSelections} selected`}
              </span>
              <ChevronDown className="text-text-secondary-65 h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[350px] p-0" align="center">
            {/* Search Input */}
            <div className="border-b border-black/10 p-3">
              <div className="relative">
                <Search className="text-text-secondary-65 absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search genres..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-sm"
                />
              </div>
              <p className="text-text-secondary-65 mt-2 text-xs">
                Select up to {maxSelections} genres ({value.length}/{maxSelections})
              </p>
            </div>

            {/* Categories & Genres */}
            <div className="h-[300px] overflow-y-auto">
              <div className="space-y-4 p-3">
                {Object.entries(filteredCategories).map(([key, category]) => (
                  <div key={key}>
                    <p className="text-text-secondary-65 mb-2 text-[10px] font-semibold tracking-wider uppercase">
                      {category.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.genres.map((genre) => {
                        const isSelected = value.includes(genre.value);
                        const isDisabled = !isSelected && value.length >= maxSelections;

                        return (
                          <button
                            key={genre.value}
                            type="button"
                            onClick={() => !isDisabled && handleToggle(genre.value)}
                            disabled={isDisabled}
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all',
                              isSelected
                                ? 'bg-brand-pink-500 border-brand-pink-500 text-white'
                                : 'text-text-primary hover:border-brand-pink-300 hover:bg-brand-pink-50 border-black/10 bg-white/80',
                              isDisabled && 'cursor-not-allowed opacity-40'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                            {genre.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {Object.keys(filteredCategories).length === 0 && (
                  <p className="text-text-secondary-65 py-8 text-center text-sm">
                    No genres found for "{search}"
                  </p>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

GenrePicker.displayName = 'GenrePicker';
