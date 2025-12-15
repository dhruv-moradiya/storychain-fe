import { memo, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Textarea } from '../../ui/textarea';

import { type TStoryFormValues } from '@/schema/story.schema';
import { SectionDivider } from './section-divider';
import { GlowCard } from './glow-card';
import MiniTextEditor from '../mini-text-editor/mini-text-editor';

export const StoryFormFields = memo(() => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<TStoryFormValues>();

  // 🔥 Optimized: Only watch INDIVIDUAL fields
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

        <GlowCard>
          <div className="space-y-2">
            <Label>Genre</Label>
            <Select
              value={genre}
              onValueChange={(v) => setValue('genre', v as TStoryFormValues['genre'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'FANTASY',
                  'SCI_FI',
                  'MYSTERY',
                  'ROMANCE',
                  'HORROR',
                  'THRILLER',
                  'ADVENTURE',
                  'DRAMA',
                  'COMEDY',
                  'OTHER',
                ].map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.genre && <p className="text-xs text-red-500">{errors.genre.message}</p>}
          </div>
        </GlowCard>
      </div>

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

      <GlowCard>
        <div className="space-y-2">
          <Label>Description</Label>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MiniTextEditor
                value={field.value}
                placeholder="Write description..."
                minHeight="120px"
                onChange={(html) => {
                  // Optional: strip HTML tags for character count logic
                  const textLength = html.replace(/<[^>]+>/g, '').length;

                  if (textLength <= 2000) {
                    field.onChange(html);
                  }
                }}
              />
            )}
          />

          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}

          <p className="text-muted-foreground text-right text-xs">
            {description?.replace(/<[^>]+>/g, '').length || 0}/2000 characters
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
