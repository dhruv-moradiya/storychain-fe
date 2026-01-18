import { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { X, Hash } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { type TStoryFormValues } from '@/schema/story.schema';

export const BasicInfoStep = memo(() => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<TStoryFormValues>();

  const title = useWatch({ name: 'title' });
  const description = useWatch({ name: 'description' }) || '';
  const slug = useWatch({ name: 'slug' });
  const tags = useWatch({ name: 'tags' }) || [];

  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

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

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (!trimmedTag) {
      setTagInput('');
      return;
    }

    const currentTags = getValues('tags') || [];
    if (!currentTags.includes(trimmedTag)) {
      setValue('tags', [...currentTags, trimmedTag], { shouldValidate: true });
    }
    setTagInput('');
  }, [tagInput, getValues, setValue]);

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      const currentTags = getValues('tags') || [];
      setValue(
        'tags',
        currentTags.filter((t: string) => t !== tagToRemove),
        { shouldValidate: true }
      );
    },
    [getValues, setValue]
  );

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleAddTag();
      } else if (e.key === 'Backspace' && tagInput === '') {
        const currentTags = getValues('tags') || [];
        if (currentTags.length > 0) {
          handleRemoveTag(currentTags[currentTags.length - 1]);
        }
      } else if (e.key === ',' || e.key === ' ') {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag, handleRemoveTag, tagInput, getValues]
  );

  const handleTagInputBlur = useCallback(() => {
    if (tagInput.trim()) {
      handleAddTag();
    }
  }, [tagInput, handleAddTag]);

  return (
    <div className="space-y-5">
      {/* Story Title */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">Story Title</Label>
        <Input
          placeholder="Enter your story title..."
          className="bg-cream-95/50 focus:border-brand-pink-500 focus:ring-brand-pink-500/20 h-10 border-black/10 focus:bg-white"
          {...register('title')}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        {slug && (
          <p className="text-text-secondary-65 text-xs">
            URL: <span className="text-brand-pink-500 font-mono">/stories/{slug}</span>
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">Description</Label>
        <Textarea
          placeholder="Write a compelling description for your story..."
          className="bg-cream-95/50 focus:border-brand-pink-500 focus:ring-brand-pink-500/20 min-h-[100px] resize-none border-black/10 text-sm focus:bg-white"
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        <p className="text-text-secondary-65 text-right text-xs">{description.length}/2000</p>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">
          Tags <span className="text-text-secondary-65 font-normal">(optional)</span>
        </Label>
        <div
          className="focus-within:border-brand-pink-500 focus-within:ring-brand-pink-500/20 bg-cream-95/50 flex min-h-[44px] cursor-text flex-wrap items-center gap-2 rounded-lg border border-black/10 px-3 py-2 transition-colors focus-within:bg-white focus-within:ring-1"
          onClick={() => tagInputRef.current?.focus()}
        >
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-brand-pink-500/10 text-brand-pink-700 inline-flex items-center gap-1.5 rounded-full py-1 pr-2 pl-2.5 text-xs font-medium"
            >
              <Hash className="h-3 w-3 opacity-60" />
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
                className="hover:bg-brand-pink-500/20 -mr-0.5 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            ref={tagInputRef}
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={handleTagInputBlur}
            placeholder={tags.length === 0 ? 'Add tags...' : ''}
            className="min-w-[80px] flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <p className="text-text-secondary-65 text-xs">Press Enter, Space, or Comma to add a tag</p>
      </div>
    </div>
  );
});

BasicInfoStep.displayName = 'BasicInfoStep';
