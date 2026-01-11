import { memo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Textarea } from '../../ui/textarea';

import { type TStoryFormValues } from '@/schema/story.schema';

// Genre options for the dropdown
const GENRES = [
  { value: 'FANTASY', label: 'Fantasy' },
  { value: 'SCI_FI', label: 'Sci-Fi' },
  { value: 'MYSTERY', label: 'Mystery' },
  { value: 'ROMANCE', label: 'Romance' },
  { value: 'HORROR', label: 'Horror' },
  { value: 'THRILLER', label: 'Thriller' },
  { value: 'ADVENTURE', label: 'Adventure' },
  { value: 'ACTION', label: 'Action' },
  { value: 'DRAMA', label: 'Drama' },
  { value: 'COMEDY', label: 'Comedy' },
  { value: 'SUPERNATURAL', label: 'Supernatural' },
  { value: 'HISTORICAL', label: 'Historical Fiction' },
  { value: 'SLICE_OF_LIFE', label: 'Slice of Life' },
  { value: 'DARK_FANTASY', label: 'Dark Fantasy' },
  { value: 'URBAN_FANTASY', label: 'Urban Fantasy' },
  { value: 'DYSTOPIAN', label: 'Dystopian' },
  { value: 'POST_APOCALYPTIC', label: 'Post-Apocalyptic' },
  { value: 'CYBERPUNK', label: 'Cyberpunk' },
  { value: 'STEAMPUNK', label: 'Steampunk' },
  { value: 'PARANORMAL', label: 'Paranormal' },
  { value: 'CRIME', label: 'Crime' },
  { value: 'PSYCHOLOGICAL', label: 'Psychological' },
  { value: 'COMING_OF_AGE', label: 'Coming of Age' },
  { value: 'LITERARY_FICTION', label: 'Literary Fiction' },
  { value: 'SATIRE', label: 'Satire' },
  { value: 'MAGICAL_REALISM', label: 'Magical Realism' },
  { value: 'WESTERN', label: 'Western' },
  { value: 'MILITARY', label: 'Military' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'FANFICTION', label: 'Fanfiction' },
  { value: 'OTHER', label: 'Other' },
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

  // Auto-generate slug
  useEffect(() => {
    if (!title?.trim()) {
      setValue('slug', '', { shouldDirty: true });
      return;
    }

    const generatedSlug = title
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');

    setValue('slug', generatedSlug, { shouldDirty: true });
  }, [title, setValue]);

  return (
    <div className="space-y-6">
      {/* Section: Basic Info */}
      <div className="space-y-4">
        <p className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Basic Information
        </p>

        {/* Story Name */}
        <div className="space-y-2">
          <Label className="text-text-primary font-medium">Story Title</Label>
          <Input
            placeholder="Enter your story title..."
            className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50 font-mono"
            {...register('title')}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          {slug && (
            <p className="text-text-secondary-65 text-xs">
              URL: <span className="text-brand-pink-500 font-mono">/stories/{slug}</span>
            </p>
          )}
        </div>

        {/* Genre Select */}
        <div className="space-y-2">
          <Label className="text-text-primary font-medium">Genre</Label>
          <Select
            value={genre}
            onValueChange={(v) => setValue('genre', v as TStoryFormValues['genre'])}
          >
            <SelectTrigger className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {GENRES.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.genre && <p className="text-xs text-red-500">{errors.genre.message}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-text-primary font-medium">Description</Label>
          <Textarea
            placeholder="Write a compelling description for your story..."
            className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 min-h-[100px] border-black/10 bg-white/50 font-mono text-sm"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
          <p className="text-text-secondary-65 text-right text-xs">{description.length}/2000</p>
        </div>
      </div>

      {/* Section: Settings */}
      <div className="space-y-4">
        <p className="text-text-secondary-65 font-mono text-xs tracking-wider uppercase">
          Story Settings
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Visibility */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">Visibility</Label>
            <Select
              value={visibility}
              onValueChange={(v) => setValue('visibility', v as TStoryFormValues['visibility'])}
            >
              <SelectTrigger className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50">
                <SelectValue placeholder="Visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Approval Mode */}
          <div className="space-y-2">
            <Label className="text-text-primary font-medium">Contributions</Label>
            <Select
              value={approvalMode}
              onValueChange={(v) => setValue('approvalMode', v as TStoryFormValues['approvalMode'])}
            >
              <SelectTrigger className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open (auto-publish)</SelectItem>
                <SelectItem value="curated">Curated (requires approval)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-3 rounded-xl border border-black/5 bg-black/[0.02] p-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-text-primary font-medium">Allow Branching</Label>
              <p className="text-text-secondary-65 text-xs">
                Let readers create alternate story paths
              </p>
            </div>
            <Switch checked={branching} onCheckedChange={(v) => setValue('branching', v)} />
          </div>

          <div className="h-px bg-black/5" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-text-primary font-medium">Enable Comments</Label>
              <p className="text-text-secondary-65 text-xs">Allow readers to discuss chapters</p>
            </div>
            <Switch
              checked={commentsEnabled}
              onCheckedChange={(v) => setValue('commentsEnabled', v)}
            />
          </div>

          <div className="h-px bg-black/5" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-text-primary font-medium">Enable Voting</Label>
              <p className="text-text-secondary-65 text-xs">Let readers vote on chapters</p>
            </div>
            <Switch checked={votingEnabled} onCheckedChange={(v) => setValue('votingEnabled', v)} />
          </div>
        </div>
      </div>
    </div>
  );
});

StoryFormFields.displayName = 'StoryFormFields';
