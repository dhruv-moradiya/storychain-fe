import { memo, useState, useMemo } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Organized genres by category for better UX (lowercase values for API payload)
export const GENRE_CATEGORIES = {
  popular: {
    label: 'Popular',
    genres: [
      {
        value: 'fantasy',
        label: 'Fantasy',
        description: 'Magic, mythical creatures, and imaginary worlds',
      },
      { value: 'romance', label: 'Romance', description: 'Love stories and relationships' },
      { value: 'action', label: 'Action', description: 'Fast-paced, high-stakes adventures' },
      { value: 'adventure', label: 'Adventure', description: 'Journeys and exploration' },
      { value: 'mystery', label: 'Mystery', description: 'Puzzles, secrets, and investigations' },
      { value: 'horror', label: 'Horror', description: 'Fear, dread, and the supernatural' },
      { value: 'sci_fi', label: 'Sci-Fi', description: 'Science fiction and futuristic settings' },
      { value: 'thriller', label: 'Thriller', description: 'Suspense and tension' },
      { value: 'comedy', label: 'Comedy', description: 'Humor and lighthearted stories' },
      { value: 'drama', label: 'Drama', description: 'Emotional and character-driven stories' },
    ],
  },
  japanese: {
    label: 'Japanese (日本)',
    genres: [
      { value: 'isekai', label: 'Isekai (異世界)', description: 'Transported to another world' },
      {
        value: 'shounen',
        label: 'Shounen (少年)',
        description: 'Action-oriented stories for young males',
      },
      {
        value: 'shoujo',
        label: 'Shoujo (少女)',
        description: 'Romance-oriented stories for young females',
      },
      { value: 'seinen', label: 'Seinen (青年)', description: 'Mature themes for adult males' },
      { value: 'josei', label: 'Josei (女性)', description: 'Mature themes for adult females' },
      { value: 'mecha', label: 'Mecha (メカ)', description: 'Giant robots and mechanical suits' },
      {
        value: 'mahou_shoujo',
        label: 'Mahou Shoujo (魔法少女)',
        description: 'Magical girl transformations',
      },
      {
        value: 'slice_of_life',
        label: 'Slice of Life',
        description: 'Everyday life and experiences',
      },
      { value: 'yuri', label: 'Yuri (百合)', description: 'Female same-sex relationships' },
      { value: 'yaoi', label: 'Yaoi (やおい)', description: 'Male same-sex relationships' },
      { value: 'boys_love', label: 'Boys Love (BL)', description: 'Male romance stories' },
      { value: 'girls_love', label: 'Girls Love (GL)', description: 'Female romance stories' },
      {
        value: 'otome',
        label: 'Otome (乙女)',
        description: 'Female protagonist with male love interests',
      },
      {
        value: 'villainess',
        label: 'Villainess (悪役令嬢)',
        description: 'Reborn as a villainess character',
      },
      {
        value: 'light_novel',
        label: 'Light Novel (ラノベ)',
        description: 'Japanese light novel style',
      },
      {
        value: 'ecchi',
        label: 'Ecchi (エッチ)',
        description: 'Suggestive but not explicit content',
      },
    ],
  },
  chinese: {
    label: 'Chinese (中文)',
    genres: [
      { value: 'xianxia', label: 'Xianxia (仙侠)', description: 'Immortal heroes and cultivation' },
      { value: 'wuxia', label: 'Wuxia (武侠)', description: 'Martial arts and chivalry' },
      {
        value: 'xuanhuan',
        label: 'Xuanhuan (玄幻)',
        description: 'Eastern fantasy with magic systems',
      },
      {
        value: 'cultivation',
        label: 'Cultivation (修真)',
        description: 'Power progression through training',
      },
      { value: 'qihuan', label: 'Qihuan (奇幻)', description: 'Chinese high fantasy' },
      {
        value: 'xianxia_romance',
        label: 'Xianxia Romance (仙侠言情)',
        description: 'Cultivation with romance focus',
      },
      {
        value: 'ancient_china',
        label: 'Ancient China (古代)',
        description: 'Historical Chinese settings',
      },
      {
        value: 'palace_intrigue',
        label: 'Palace Intrigue (宫斗)',
        description: 'Royal court politics and schemes',
      },
      { value: 'rebirth', label: 'Rebirth (重生)', description: 'Reborn into past self' },
      {
        value: 'transmigration',
        label: 'Transmigration (穿越)',
        description: 'Soul transfer to another body/world',
      },
      {
        value: 'quick_transmigration',
        label: 'Quick Transmigration (快穿)',
        description: 'Multiple world hopping',
      },
      {
        value: 'ceo_romance',
        label: 'CEO Romance (总裁文)',
        description: 'Modern romance with wealthy CEO',
      },
      {
        value: 'modern_romance_cn',
        label: 'Modern Romance (现代言情)',
        description: 'Contemporary Chinese romance',
      },
    ],
  },
  korean: {
    label: 'Korean (한국어)',
    genres: [
      {
        value: 'korean_fantasy',
        label: 'Korean Fantasy (판타지)',
        description: 'Korean-style fantasy stories',
      },
      {
        value: 'hunter',
        label: 'Hunter (헌터물)',
        description: 'Monster hunting and awakened powers',
      },
      { value: 'murim', label: 'Murim (무림)', description: 'Korean martial arts world' },
      {
        value: 'regression',
        label: 'Regression (회귀)',
        description: 'Return to the past with memories',
      },
      { value: 'possession', label: 'Possession (빙의)', description: 'Taking over another body' },
      { value: 'return', label: 'Return (귀환)', description: 'Coming back from another world' },
      { value: 'gate', label: 'Gate (게이트)', description: 'Portals to dungeons or other realms' },
      {
        value: 'dungeon',
        label: 'Dungeon (던전)',
        description: 'Dungeon exploration and conquest',
      },
      { value: 'tower', label: 'Tower Climbing (탑)', description: 'Ascending floors of a tower' },
      {
        value: 'constellation',
        label: 'Constellation (성좌)',
        description: 'Gods/sponsors granting powers',
      },
      { value: 'system', label: 'System (시스템)', description: 'Game-like system interface' },
      {
        value: 'status_window',
        label: 'Status Window (스탯창)',
        description: 'Stats and level-up mechanics',
      },
      {
        value: 'korean_romance',
        label: 'Korean Romance (로맨스)',
        description: 'Korean-style romance',
      },
      {
        value: 'contract_marriage',
        label: 'Contract Marriage (계약결혼)',
        description: 'Fake marriage trope',
      },
      { value: 'chaebol', label: 'Chaebol (재벌)', description: 'Wealthy conglomerate families' },
    ],
  },
  litrpg: {
    label: 'LitRPG & GameLit',
    genres: [
      { value: 'litrpg', label: 'LitRPG', description: 'RPG game mechanics in narrative' },
      { value: 'gamelit', label: 'GameLit', description: 'Game-inspired without heavy stats' },
      { value: 'vrmmo', label: 'VRMMO', description: 'Virtual reality MMO games' },
      {
        value: 'progression_fantasy',
        label: 'Progression Fantasy',
        description: 'Power growth focus',
      },
    ],
  },
  fantasy: {
    label: 'Fantasy',
    genres: [
      { value: 'dark_fantasy', label: 'Dark Fantasy', description: 'Grim and morally ambiguous' },
      { value: 'urban_fantasy', label: 'Urban Fantasy', description: 'Magic in modern settings' },
      {
        value: 'epic_fantasy',
        label: 'Epic Fantasy',
        description: 'Grand scale world-saving quests',
      },
      { value: 'high_fantasy', label: 'High Fantasy', description: 'Secondary worlds with magic' },
      { value: 'low_fantasy', label: 'Low Fantasy', description: 'Minimal magic, realistic tone' },
      {
        value: 'sword_and_sorcery',
        label: 'Sword & Sorcery',
        description: 'Personal adventures and combat',
      },
      {
        value: 'magical_realism',
        label: 'Magical Realism',
        description: 'Subtle magic in real world',
      },
      { value: 'supernatural', label: 'Supernatural', description: 'Beyond natural phenomena' },
      {
        value: 'paranormal',
        label: 'Paranormal',
        description: 'Ghosts, psychics, and unexplained',
      },
    ],
  },
  scifi: {
    label: 'Sci-Fi',
    genres: [
      { value: 'space_opera', label: 'Space Opera', description: 'Epic space adventures' },
      { value: 'hard_sci_fi', label: 'Hard Sci-Fi', description: 'Scientifically accurate' },
      { value: 'soft_sci_fi', label: 'Soft Sci-Fi', description: 'Focus on social sciences' },
      { value: 'cyberpunk', label: 'Cyberpunk', description: 'High tech, low life dystopia' },
      { value: 'steampunk', label: 'Steampunk', description: 'Victorian era with steam tech' },
      { value: 'dystopian', label: 'Dystopian', description: 'Oppressive future societies' },
      {
        value: 'post_apocalyptic',
        label: 'Post-Apocalyptic',
        description: 'After civilization collapse',
      },
      { value: 'time_travel', label: 'Time Travel', description: 'Journeys through time' },
      {
        value: 'alternate_history',
        label: 'Alternate History',
        description: 'Changed historical events',
      },
    ],
  },
  romance: {
    label: 'Romance',
    genres: [
      { value: 'harem', label: 'Harem', description: 'Multiple love interests pursuing MC' },
      {
        value: 'reverse_harem',
        label: 'Reverse Harem',
        description: 'Female MC with multiple suitors',
      },
      { value: 'slow_burn', label: 'Slow Burn', description: 'Gradually developing romance' },
      {
        value: 'enemies_to_lovers',
        label: 'Enemies to Lovers',
        description: 'From rivals to romance',
      },
      {
        value: 'friends_to_lovers',
        label: 'Friends to Lovers',
        description: 'Friendship becoming love',
      },
      { value: 'fake_dating', label: 'Fake Dating', description: 'Pretend relationship trope' },
      { value: 'second_chance', label: 'Second Chance', description: 'Reunited former lovers' },
      {
        value: 'arranged_marriage',
        label: 'Arranged Marriage',
        description: 'Forced union romance',
      },
      { value: 'erotica', label: 'Erotica', description: 'Explicit romantic content' },
    ],
  },
  dark: {
    label: 'Horror & Dark',
    genres: [
      { value: 'zombie', label: 'Zombie', description: 'Undead apocalypse survival' },
      { value: 'vampire', label: 'Vampire', description: 'Blood-drinking immortals' },
      { value: 'werewolf', label: 'Werewolf', description: 'Shapeshifting wolf creatures' },
      { value: 'ghost', label: 'Ghost', description: 'Spirits and hauntings' },
      { value: 'apocalyptic', label: 'Apocalyptic', description: 'End of the world scenarios' },
      {
        value: 'psychological',
        label: 'Psychological',
        description: 'Mind games and mental horror',
      },
    ],
  },
  mystery: {
    label: 'Mystery & Thriller',
    genres: [
      { value: 'detective', label: 'Detective', description: 'Crime solving investigations' },
      { value: 'noir', label: 'Noir', description: 'Dark, cynical crime stories' },
      { value: 'cozy_mystery', label: 'Cozy Mystery', description: 'Light-hearted mysteries' },
      { value: 'legal_thriller', label: 'Legal Thriller', description: 'Courtroom drama and law' },
      {
        value: 'medical_thriller',
        label: 'Medical Thriller',
        description: 'Medical world suspense',
      },
      { value: 'spy', label: 'Spy/Espionage', description: 'Secret agents and intelligence' },
      { value: 'heist', label: 'Heist', description: 'Elaborate theft operations' },
      { value: 'crime', label: 'Crime', description: 'Criminal activities and underworld' },
    ],
  },
  character: {
    label: 'Character Types',
    genres: [
      {
        value: 'overpowered_mc',
        label: 'Overpowered MC',
        description: 'Extremely powerful protagonist',
      },
      { value: 'weak_to_strong', label: 'Weak to Strong', description: 'Growth from weakness' },
      { value: 'anti_hero', label: 'Anti-Hero', description: 'Morally grey protagonist' },
      { value: 'villain', label: 'Villain', description: 'Evil or antagonist protagonist' },
      { value: 'superhero', label: 'Superhero', description: 'Superpowered heroes' },
      { value: 'reincarnation', label: 'Reincarnation', description: 'Rebirth in new life' },
    ],
  },
  setting: {
    label: 'Settings',
    genres: [
      { value: 'academy', label: 'Academy', description: 'School or training institution' },
      { value: 'royal', label: 'Royal/Nobility', description: 'Kings, queens, and nobles' },
      { value: 'military', label: 'Military', description: 'Armed forces and warfare' },
      {
        value: 'historical',
        label: 'Historical Fiction',
        description: 'Set in historical periods',
      },
      { value: 'martial_arts', label: 'Martial Arts', description: 'Combat and fighting arts' },
    ],
  },
  other: {
    label: 'Other',
    genres: [
      { value: 'fanfiction', label: 'Fanfiction', description: 'Based on existing works' },
      { value: 'fairy_tale', label: 'Fairy Tale', description: 'Classic fairy tale style' },
      { value: 'mythology', label: 'Mythology', description: 'Based on mythological stories' },
      { value: 'folklore', label: 'Folklore', description: 'Traditional folk stories' },
      { value: 'sports', label: 'Sports', description: 'Athletic competitions' },
      { value: 'survival', label: 'Survival', description: 'Surviving harsh conditions' },
      { value: 'western', label: 'Western', description: 'Wild west setting' },
      { value: 'satire', label: 'Satire', description: 'Social commentary through humor' },
      { value: 'coming_of_age', label: 'Coming of Age', description: 'Youth to adulthood journey' },
      {
        value: 'literary_fiction',
        label: 'Literary Fiction',
        description: 'Character and theme focused',
      },
      { value: 'anthology', label: 'Anthology', description: 'Collection of short stories' },
      { value: 'other', label: 'Other', description: 'Miscellaneous genres' },
    ],
  },
};

// Flatten all genres for search
const ALL_GENRES = Object.values(GENRE_CATEGORIES).flatMap((cat) => cat.genres);

type Genre = { value: string; label: string; description: string };
type CategoryMap = Record<string, { label: string; genres: readonly Genre[] }>;

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

    const selectedGenres = useMemo((): { value: string; label: string; description: string }[] => {
      return value
        .map((v) => ALL_GENRES.find((g) => g.value === v))
        .filter((g): g is { value: string; label: string; description: string } => g !== undefined);
    }, [value]);

    const filteredCategories = useMemo((): CategoryMap => {
      if (!search.trim()) return GENRE_CATEGORIES;

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
