export const storyHistory = [
  {
    id: "h1",
    storyId: "s101",
    type: "creation", // creation | edit | chapter_add | comment | fork | merge | publish | rename | delete | restore | tag_update | collaboration
    user: {
      id: "u1",
      name: "Aarav Mehta",
      username: "aaravm",
      avatar: "https://example.com/avatar1.png",
    },
    action: "Created the story",
    details: {
      title: "The Lost City",
      genre: "Adventure",
      description:
        "A group of explorers discover a city hidden deep within the Amazon.",
      visibility: "public",
    },
    timestamp: "2025-10-10T08:32:00Z",
  },
  {
    id: "h2",
    storyId: "s101",
    type: "chapter_add",
    user: {
      id: "u2",
      name: "Riya Shah",
      username: "riya_writes",
      avatar: "https://example.com/avatar2.png",
    },
    action: "Added a new chapter",
    details: {
      chapterId: "c12",
      chapterName: "Into the Jungle",
      wordCount: 2400,
      previousChapter: "c11",
      position: 3,
    },
    timestamp: "2025-10-11T10:45:00Z",
  },
  {
    id: "h3",
    storyId: "s101",
    type: "edit",
    user: {
      id: "u1",
      name: "Aarav Mehta",
      username: "aaravm",
    },
    action: "Edited story title and summary",
    details: {
      changes: [
        {
          field: "title",
          oldValue: "The Lost City",
          newValue: "The Hidden City",
        },
        {
          field: "description",
          oldValue:
            "A group of explorers discover a city hidden deep within the Amazon.",
          newValue:
            "A team of adventurers uncover ancient secrets in a city long forgotten.",
        },
      ],
    },
    timestamp: "2025-10-11T12:10:00Z",
  },
  {
    id: "h4",
    storyId: "s101",
    type: "comment",
    user: {
      id: "u3",
      name: "Dev Patel",
      username: "devreads",
    },
    action: "Commented on Chapter 3",
    details: {
      chapterId: "c12",
      commentId: "cm45",
      comment: "Loved how the jungle scene was described!",
    },
    timestamp: "2025-10-11T13:30:00Z",
  },
  {
    id: "h5",
    storyId: "s101",
    type: "fork",
    user: {
      id: "u4",
      name: "Maya Rao",
      username: "maya_fantasy",
    },
    action: "Forked this story into a new storyline",
    details: {
      newStoryId: "s202",
      forkReason: "Wanted to explore an alternate ending",
    },
    timestamp: "2025-10-12T09:15:00Z",
  },
  {
    id: "h6",
    storyId: "s101",
    type: "collaboration",
    user: {
      id: "u1",
      name: "Aarav Mehta",
      username: "aaravm",
    },
    action: "Invited collaborator",
    details: {
      collaborator: {
        id: "u2",
        name: "Riya Shah",
        role: "Editor",
      },
    },
    timestamp: "2025-10-12T10:05:00Z",
  },
  {
    id: "h7",
    storyId: "s101",
    type: "tag_update",
    user: {
      id: "u2",
      name: "Riya Shah",
      username: "riya_writes",
    },
    action: "Updated tags",
    details: {
      added: ["Mystery"],
      removed: ["Adventure"],
    },
    timestamp: "2025-10-12T11:40:00Z",
  },
  {
    id: "h8",
    storyId: "s101",
    type: "publish",
    user: {
      id: "u1",
      name: "Aarav Mehta",
      username: "aaravm",
    },
    action: "Published story update",
    details: {
      version: "v2.1",
      changelog: "Added Chapter 3 and improved flow.",
    },
    timestamp: "2025-10-12T12:00:00Z",
  },
];
