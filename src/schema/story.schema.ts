// src/schema/story.schema.ts
import { z } from 'zod';
import { GENRE_VALUES, CONTENT_RATING_VALUES, STORY_STATUSES } from '@/constants/story.constants';

// Re-export constants for backward compatibility
export { CONTENT_RATINGS, STORY_STATUSES } from '@/constants/story.constants';

export const StoryFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .max(200, 'Title cannot exceed 200 characters'),

  slug: z.string().trim().toLowerCase().min(3, 'Slug must be at least 3 characters long'),

  description: z.string().trim().max(2000, 'Description cannot exceed 2000 characters'),

  coverImage: z
    .object({
      url: z.string().url().optional(),
      publicId: z.string().optional(),
    })
    .optional(),

  settings: z
    .object({
      isPublic: z.boolean().default(true),
      allowBranching: z.boolean().default(true),
      requireApproval: z.boolean().default(false),
      allowComments: z.boolean().default(true),
      allowVoting: z.boolean().default(true),
      genres: z.array(z.enum(GENRE_VALUES)).default([]),
      contentRating: z.enum(CONTENT_RATING_VALUES).default('general'),
    })
    .default({
      isPublic: true,
      allowBranching: true,
      requireApproval: false,
      allowComments: true,
      allowVoting: true,
      genres: [],
      contentRating: 'general',
    }),

  tags: z.array(z.string().trim().toLowerCase()).default([]),

  status: z.enum(STORY_STATUSES).default('draft'),
});

export type TStoryFormValues = z.infer<typeof StoryFormSchema>;
