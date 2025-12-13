export const QueryKey = {
  user: {
    me: ['user', 'me'] as const,

    searchByUsername: (username: string) => ['user', 'search', username] as const,
  },

  notification: {
    list: ['notification', 'list'] as const,
  },

  story: {
    list: ['story', 'list'] as const,
    byId: (id: string) => ['story', 'detail', id] as const,
  },
};
