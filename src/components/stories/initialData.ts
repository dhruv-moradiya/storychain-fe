import { type Node, type Edge } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "customCard",
    position: { x: 100, y: 100 },
    data: {
      userInitial: "A",
      username: "Alice Reader",
      timeAgo: "2 min ago",
      chapter: "Ch. 1",
      title: "The Beginning",
      readers: 245,
      readTime: 8,
      likes: 15,
      genre: "fantasy",
    },
  },
  {
    id: "2",
    type: "customCard",
    position: { x: 500, y: 50 },
    data: {
      userInitial: "B",
      username: "Bob Writer",
      timeAgo: "5 min ago",
      chapter: "Ch. 2",
      title: "The Journey Starts",
      readers: 189,
      readTime: 6,
      likes: 23,
      genre: "sci-fi",
    },
  },
  {
    id: "3",
    type: "customCard",
    position: { x: 900, y: 150 },
    data: {
      userInitial: "C",
      username: "Carol Editor",
      timeAgo: "10 min ago",
      chapter: "Ch. 3",
      title: "The Mysterious Forest",
      readers: 124,
      readTime: 5,
      likes: 12,
      genre: "mystery",
    },
  },
  {
    id: "4",
    type: "customCard",
    position: { x: 300, y: 400 },
    data: {
      userInitial: "D",
      username: "David Critic",
      timeAgo: "15 min ago",
      chapter: "Ch. 4",
      title: "Hidden Secrets",
      readers: 156,
      readTime: 7,
      likes: 18,
      genre: "thriller",
    },
  },
  {
    id: "5",
    type: "customCard",
    position: { x: 700, y: 450 },
    data: {
      userInitial: "E",
      username: "Emma Fan",
      timeAgo: "20 min ago",
      chapter: "Ch. 5",
      title: "The Final Chapter",
      readers: 298,
      readTime: 12,
      likes: 45,
      genre: "adventure",
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "lightgray", strokeWidth: 2 },
    type: "smoothstep",
  },
];

export type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
};

export const comments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Alice",
      avatar: "https://github.com/shadcn.png",
    },
    text: "This is a reusable button component.",
    createdAt: "1 min ago",
    likes: 12,
    dislikes: 3,
    replies: [
      {
        id: "1-1",
        user: {
          name: "Bob",
          avatar: "https://github.com/shadcn.png",
        },
        text: "I agree! It looks super clean.",
        createdAt: "just now",
        likes: 4,
        dislikes: 0,
        replies: [
          {
            id: "1-1-1",
            user: {
              name: "Charlie",
              avatar: "https://github.com/shadcn.png",
            },
            text: "Yes, and easy to extend with Tailwind.",
            createdAt: "30 sec ago",
            likes: 2,
            dislikes: 0,
            replies: [],
          },
        ],
      },
      {
        id: "1-2",
        user: {
          name: "David",
          avatar: "https://github.com/shadcn.png",
        },
        text: "Can you share the props you're passing?",
        createdAt: "2 min ago",
        likes: 1,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    user: {
      name: "Eve",
      avatar: "https://github.com/shadcn.png",
    },
    text: "I think this could be optimized for accessibility.",
    createdAt: "5 min ago",
    likes: 8,
    dislikes: 1,
    replies: [],
  },
];
