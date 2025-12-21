export const QueryKey = {
  user: {
    me: ['user', 'me'] as const,
    searchByUsername: (username: string) => ['user', 'search', username] as const,
  },

  notification: {
    list: ['notification', 'list'] as const,
  },

  story: {
    // ----------------
    // STORY ROUTES
    // ----------------
    list: ['story', 'list'] as const,
    new: ['story', 'new'] as const,
    my: ['story', 'my'] as const,

    bySlug: (slug: string) => ['story', 'slug', slug] as const,
    byId: (storyId: string) => ['story', 'detail', storyId] as const,
    collaborators: (storyId: string) => ['story', storyId, 'collaborators'] as const,

    // ----------------
    // CHAPTER ROUTES
    // ----------------
    chapters: (storyId: string) => ['story', storyId, 'chapters'] as const,

    // ----------------
    // CHAPTER AUTO SAVE ROUTES
    // ----------------
    autoSave: {
      base: ['chapter', 'autosave'] as const,

      enable: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'enable', chapterId ?? null, draftId ?? null] as const,

      save: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'save', chapterId ?? null, draftId ?? null] as const,

      disable: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'disable', chapterId ?? null, draftId ?? null] as const,

      draft: (chapterId?: string, draftId?: string) =>
        ['chapter', 'autosave', 'draft', chapterId ?? null, draftId ?? null] as const,

      interval: (draftId: string) => ['chapter', 'autosave', 'interval', draftId] as const,
    },
  },
};
