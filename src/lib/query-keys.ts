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

    list: ['story', 'list'] as const, // GET /
    new: ['story', 'new'] as const, // GET /new
    my: ['story', 'my'] as const, // GET /my

    bySlug: (slug: string) => ['story', 'slug', slug] as const, // GET /:slug

    byId: (storyId: string) => ['story', 'detail', storyId] as const,

    collaborators: (storyId: string) => ['story', storyId, 'collaborators'] as const, // GET /:storyId/collaborators

    // ----------------
    // CHAPTER ROUTES
    // ----------------

    chapters: (storyId: string) => ['story', storyId, 'chapters'] as const,
  },
};
