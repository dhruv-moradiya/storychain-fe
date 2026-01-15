import { memo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { CONTENT_RATINGS, type TStoryFormValues } from '@/schema/story.schema';
import { GenrePicker } from './genre-picker';

export const BasicInfoStep = memo(() => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TStoryFormValues>();

  const title = useWatch({ name: 'title' });
  const description = useWatch({ name: 'description' }) || '';
  const slug = useWatch({ name: 'slug' });
  const genres = useWatch({ name: 'genres' }) || [];
  const rating = useWatch({ name: 'rating' });

  // Auto-generate slug from title
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
    <div className="space-y-4">
      {/* Story Title */}
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

      {/* Genre Multi-Select */}
      <div className="space-y-2">
        <Label className="text-text-primary font-medium">
          Genres <span className="text-text-secondary-65 font-normal">(up to 5)</span>
        </Label>
        <GenrePicker
          value={genres}
          onChange={(newGenres) => setValue('genres', newGenres, { shouldValidate: true })}
          maxSelections={5}
          error={errors.genres?.message}
        />
      </div>

      {/* Content Rating Select */}
      <div className="space-y-2">
        <Label className="text-text-primary font-medium">Content Rating</Label>
        <Select
          value={rating}
          onValueChange={(v) => setValue('rating', v as TStoryFormValues['rating'])}
        >
          <SelectTrigger className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 border-black/10 bg-white/50">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {CONTENT_RATINGS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                <div className="flex items-center gap-2">
                  <span>{r.label}</span>
                  <span className="text-muted-foreground text-xs">— {r.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-text-primary font-medium">Description</Label>
        <Textarea
          placeholder="Write a compelling description for your story..."
          className="focus:border-brand-pink-500 focus:ring-brand-pink-500/20 min-h-[80px] border-black/10 bg-white/50 font-mono text-sm"
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        <p className="text-text-secondary-65 text-right text-xs">{description.length}/2000</p>
      </div>
    </div>
  );
});

BasicInfoStep.displayName = 'BasicInfoStep';
