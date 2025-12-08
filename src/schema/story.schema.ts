// src/schema/story.schema.ts
import { z } from 'zod';

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

  genre: z.enum([
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
  ]),

  rating: z.enum(['GENERAL', 'TEEN', 'MATURE']),

  visibility: z.enum(['public', 'private']),
  branching: z.boolean(),
  approvalMode: z.enum(['open', 'curated']),
  commentsEnabled: z.boolean(),
  votingEnabled: z.boolean(),
});

export type TStoryFormValues = z.infer<typeof StoryFormSchema>;
