// src/schema/story.schema.ts
import { z } from 'zod';

// Content rating options with descriptions (lowercase values for API payload)
export const CONTENT_RATINGS = [
  { value: 'all_ages', label: 'All Ages (全年齢)', description: 'Suitable for everyone' },
  { value: 'general', label: 'General (一般)', description: 'May contain mild themes' },
  { value: 'teen', label: 'Teen (15+)', description: 'May contain violence, mild language' },
  { value: 'young_adult', label: 'Young Adult (17+)', description: 'May contain strong themes' },
  { value: 'mature', label: 'Mature (18+)', description: 'Adult content, violence, language' },
  { value: 'r18', label: 'R-18 (成人向け)', description: 'Explicit adult content' },
  { value: 'r18g', label: 'R-18G (過激)', description: 'Extreme/gore content' },
] as const;

export const StoryFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Story name must be at least 3 characters')
    .max(200, 'Story name cannot exceed 200 characters'),

  slug: z
    .string()
    .trim()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug cannot exceed 200 characters'),

  description: z.string().trim().max(2000, 'Description cannot exceed 2000 characters'),

  genres: z
    .array(z.string())
    .min(1, 'Select at least one genre')
    .max(5, 'Maximum 5 genres allowed'),

  rating: z.enum(['all_ages', 'general', 'teen', 'young_adult', 'mature', 'r18', 'r18g']),

  visibility: z.enum(['public', 'private']),
  branching: z.boolean(),
  approvalMode: z.enum(['open', 'curated']),
  commentsEnabled: z.boolean(),
  votingEnabled: z.boolean(),
});

export type TStoryFormValues = z.infer<typeof StoryFormSchema>;
