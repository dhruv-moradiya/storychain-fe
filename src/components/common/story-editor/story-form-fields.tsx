import { memo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Textarea } from '../../ui/textarea';

import { type TStoryFormValues } from '@/schema/story.schema';
import { GlowCard } from './glow-card';
import { SectionDivider } from './section-divider';
import { cn } from '@/lib/utils';
import {
  Sword,
  Rocket,
  Search,
  Heart,
  Skull,
  Zap,
  Mountain,
  Drama,
  Laugh,
  Sparkles,
  Flame,
  Ghost,
  Crown,
  Users,
  type LucideIcon,
} from 'lucide-react';

// Genre configuration with icons and colors
const GENRES: { value: string; label: string; icon: LucideIcon; color: string }[] = [
  {
    value: 'FANTASY',
    label: 'Fantasy',
    icon: Sparkles,
    color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/60',
  },
  {
    value: 'SCI_FI',
    label: 'Sci-Fi',
    icon: Rocket,
    color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/60',
  },
  {
    value: 'MYSTERY',
    label: 'Mystery',
    icon: Search,
    color: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 hover:border-amber-500/60',
  },
  {
    value: 'ROMANCE',
    label: 'Romance',
    icon: Heart,
    color: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-500/60',
  },
  {
    value: 'HORROR',
    label: 'Horror',
    icon: Skull,
    color: 'from-red-900/20 to-red-900/5 border-red-900/30 hover:border-red-900/60',
  },
  {
    value: 'THRILLER',
    label: 'Thriller',
    icon: Zap,
    color: 'from-orange-500/20 to-orange-500/5 border-orange-500/30 hover:border-orange-500/60',
  },
  {
    value: 'ADVENTURE',
    label: 'Adventure',
    icon: Mountain,
    color: 'from-green-500/20 to-green-500/5 border-green-500/30 hover:border-green-500/60',
  },
  {
    value: 'ACTION',
    label: 'Action',
    icon: Sword,
    color: 'from-red-500/20 to-red-500/5 border-red-500/30 hover:border-red-500/60',
  },
  {
    value: 'DRAMA',
    label: 'Drama',
    icon: Drama,
    color: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 hover:border-indigo-500/60',
  },
  {
    value: 'COMEDY',
    label: 'Comedy',
    icon: Laugh,
    color: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/60',
  },
  {
    value: 'SUPERNATURAL',
    label: 'Supernatural',
    icon: Ghost,
    color: 'from-violet-500/20 to-violet-500/5 border-violet-500/30 hover:border-violet-500/60',
  },
  {
    value: 'HISTORICAL',
    label: 'Historical',
    icon: Crown,
    color: 'from-amber-700/20 to-amber-700/5 border-amber-700/30 hover:border-amber-700/60',
  },
  {
    value: 'SLICE_OF_LIFE',
    label: 'Slice of Life',
    icon: Users,
    color: 'from-teal-500/20 to-teal-500/5 border-teal-500/30 hover:border-teal-500/60',
  },
  {
    value: 'DARK_FANTASY',
    label: 'Dark Fantasy',
    icon: Flame,
    color: 'from-gray-800/20 to-gray-800/5 border-gray-800/30 hover:border-gray-800/60',
  },
  {
    value: 'OTHER',
    label: 'Other',
    icon: Sparkles,
    color: 'from-gray-500/20 to-gray-500/5 border-gray-500/30 hover:border-gray-500/60',
  },
];

export const StoryFormFields = memo(() => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TStoryFormValues>();

  const title = useWatch({ name: 'title' });
  const description = useWatch({ name: 'description' }) || '';
  const slug = useWatch({ name: 'slug' });
  const genre = useWatch({ name: 'genre' });
  const visibility = useWatch({ name: 'visibility' });
  const approvalMode = useWatch({ name: 'approvalMode' });
  const branching = useWatch({ name: 'branching' });
  const commentsEnabled = useWatch({ name: 'commentsEnabled' });
  const votingEnabled = useWatch({ name: 'votingEnabled' });

  // Auto-generate slug — but does NOT re-render whole dialog now
  useEffect(() => {
    if (!title?.trim()) {
      setValue('slug', '', { shouldDirty: true });
      return;
    }

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-') // spaces & underscores → hyphens
      .replace(/[^a-z0-9-]/g, '') // remove special characters
      .replace(/--+/g, '-') // collapse multiple hyphens
      .replace(/^-+|-+$/g, ''); // trim hyphens from start/end

    setValue('slug', slug, { shouldDirty: true });
  }, [title, setValue]);

  return (
    <div className="space-y-8">
      <SectionDivider label="Story Info" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <GlowCard>
          <div className="space-y-2">
            <Label>Story Name</Label>
            <Input placeholder="Enter story name..." {...register('title')} />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}

            {slug && (
              <p className="text-muted-foreground pt-1 text-xs">
                Slug: <span className="font-mono">{slug}</span>
              </p>
            )}
          </div>
        </GlowCard>
      </div>

      {/* Genre Selection Grid */}
      <GlowCard>
        <div className="space-y-3">
          <Label>Genre</Label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {GENRES.map((g) => {
              const Icon = g.icon;
              const isSelected = genre === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setValue('genre', g.value as TStoryFormValues['genre'])}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-lg border p-2.5 transition-all',
                    'bg-gradient-to-br',
                    g.color,
                    isSelected && 'ring-brand-pink-500 border-brand-pink-500 ring-2 ring-offset-1'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isSelected ? 'text-brand-pink-500' : 'text-text-secondary-65'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isSelected ? 'text-brand-pink-500' : 'text-text-secondary'
                    )}
                  >
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.genre && <p className="text-xs text-red-500">{errors.genre.message}</p>}
        </div>
      </GlowCard>

      <GlowCard>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea className="min-h-[120px]" {...register('description')} />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
          <p className="text-muted-foreground text-right text-xs">
            {description.length}/2000 characters
          </p>
        </div>
      </GlowCard>

      <SectionDivider label="Settings" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <GlowCard>
          <div className="space-y-2">
            <Label>Visibility</Label>
            <Select
              value={visibility}
              onValueChange={(v) => setValue('visibility', v as TStoryFormValues['visibility'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlowCard>

        <GlowCard>
          <div className="space-y-2">
            <Label>Approval Mode</Label>
            <Select
              value={approvalMode}
              onValueChange={(v) => setValue('approvalMode', v as TStoryFormValues['approvalMode'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open (auto-publish)</SelectItem>
                <SelectItem value="curated">Curated (requires approval)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </GlowCard>
      </div>

      <GlowCard>
        <div className="flex items-center justify-between">
          <div>
            <Label>Branching Mode</Label>
            <p className="text-muted-foreground text-xs">Allow readers to continue.</p>
          </div>
          <Switch checked={branching} onCheckedChange={(v) => setValue('branching', v)} />
        </div>
      </GlowCard>

      <SectionDivider label="Community" />

      <GlowCard>
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Comments</Label>
          </div>
          <Switch
            checked={commentsEnabled}
            onCheckedChange={(v) => setValue('commentsEnabled', v)}
          />
        </div>
      </GlowCard>

      <GlowCard>
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Voting</Label>
          </div>
          <Switch checked={votingEnabled} onCheckedChange={(v) => setValue('votingEnabled', v)} />
        </div>
      </GlowCard>
    </div>
  );
});
