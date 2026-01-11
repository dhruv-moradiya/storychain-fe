import type { Edge, Node, NodeProps, EdgeProps } from '@xyflow/react';

// Chapter status types
export type ChapterStatus = 'published' | 'pr_open' | 'pr_approved' | 'pr_rejected';

// Node data for published chapters
export interface PublishedChapterData extends Record<string, unknown> {
  id: string;
  title: string;
  chapterNumber: number;
  author: {
    name: string;
    avatar?: string;
  };
  stats: {
    reads: number;
    comments: number;
    likes: number;
  };
  isEnding: boolean;
  isMostRead: boolean;
  publishedAt: string;
}

// Node data for PR chapters
export interface PRChapterData extends Record<string, unknown> {
  id: string;
  title: string;
  chapterNumber: number;
  author: {
    name: string;
    avatar?: string;
  };
  prStatus: 'open' | 'approved' | 'changes_requested';
  prNumber: number;
  votes: {
    up: number;
    down: number;
  };
  createdAt: string;
}

// Node types
export type PublishedChapterNode = Node<PublishedChapterData, 'publishedChapter'>;
export type PRChapterNode = Node<PRChapterData, 'prChapter'>;
export type StoryTreeNode = PublishedChapterNode | PRChapterNode;

// Node props
export type PublishedChapterNodeProps = NodeProps<PublishedChapterNode>;
export type PRChapterNodeProps = NodeProps<PRChapterNode>;

// Edge data
export interface StoryEdgeData extends Record<string, unknown> {
  isHighlighted?: boolean;
  isMostReadPath?: boolean;
}

export type StoryEdge = Edge<StoryEdgeData, 'storyEdge'>;
export type StoryEdgeProps = EdgeProps<StoryEdge>;

// Static mock data
export const MOCK_PUBLISHED_CHAPTERS: PublishedChapterNode[] = [
  {
    id: 'ch-1',
    type: 'publishedChapter',
    position: { x: 0, y: 0 },
    data: {
      id: 'ch-1',
      title: 'The Beginning of Everything',
      chapterNumber: 1,
      author: { name: 'Sarah Mitchell', avatar: undefined },
      stats: { reads: 15420, comments: 234, likes: 1892 },
      isEnding: false,
      isMostRead: true,
      publishedAt: '2024-01-15',
    },
  },
  {
    id: 'ch-2',
    type: 'publishedChapter',
    position: { x: -200, y: 200 },
    data: {
      id: 'ch-2',
      title: 'The Dark Forest Path',
      chapterNumber: 2,
      author: { name: 'James Wilson', avatar: undefined },
      stats: { reads: 12350, comments: 189, likes: 1456 },
      isEnding: false,
      isMostRead: true,
      publishedAt: '2024-01-18',
    },
  },
  {
    id: 'ch-3',
    type: 'publishedChapter',
    position: { x: 200, y: 200 },
    data: {
      id: 'ch-3',
      title: 'The Mountain Route',
      chapterNumber: 2,
      author: { name: 'Emily Chen', avatar: undefined },
      stats: { reads: 8920, comments: 145, likes: 987 },
      isEnding: false,
      isMostRead: false,
      publishedAt: '2024-01-20',
    },
  },
  {
    id: 'ch-4',
    type: 'publishedChapter',
    position: { x: -300, y: 400 },
    data: {
      id: 'ch-4',
      title: 'Encounter with the Guardian',
      chapterNumber: 3,
      author: { name: 'Sarah Mitchell', avatar: undefined },
      stats: { reads: 10280, comments: 312, likes: 1678 },
      isEnding: false,
      isMostRead: true,
      publishedAt: '2024-01-25',
    },
  },
  {
    id: 'ch-5',
    type: 'publishedChapter',
    position: { x: -100, y: 400 },
    data: {
      id: 'ch-5',
      title: 'The Hidden Sanctuary',
      chapterNumber: 3,
      author: { name: 'Alex Rivera', avatar: undefined },
      stats: { reads: 6540, comments: 98, likes: 723 },
      isEnding: false,
      isMostRead: false,
      publishedAt: '2024-01-28',
    },
  },
  {
    id: 'ch-6',
    type: 'publishedChapter',
    position: { x: -300, y: 600 },
    data: {
      id: 'ch-6',
      title: 'The Final Confrontation',
      chapterNumber: 4,
      author: { name: 'Sarah Mitchell', avatar: undefined },
      stats: { reads: 9870, comments: 456, likes: 2134 },
      isEnding: true,
      isMostRead: true,
      publishedAt: '2024-02-01',
    },
  },
];

export const MOCK_PR_CHAPTERS: PRChapterNode[] = [
  {
    id: 'pr-1',
    type: 'prChapter',
    position: { x: 100, y: 400 },
    data: {
      id: 'pr-1',
      title: 'The Unexpected Ally',
      chapterNumber: 3,
      author: { name: 'Michael Brown', avatar: undefined },
      prStatus: 'open',
      prNumber: 42,
      votes: { up: 24, down: 3 },
      createdAt: '2024-02-05',
    },
  },
  {
    id: 'pr-2',
    type: 'prChapter',
    position: { x: 300, y: 400 },
    data: {
      id: 'pr-2',
      title: 'A Different Perspective',
      chapterNumber: 3,
      author: { name: 'Lisa Park', avatar: undefined },
      prStatus: 'changes_requested',
      prNumber: 43,
      votes: { up: 12, down: 8 },
      createdAt: '2024-02-06',
    },
  },
  {
    id: 'pr-3',
    type: 'prChapter',
    position: { x: -100, y: 600 },
    data: {
      id: 'pr-3',
      title: 'The Secret Passage',
      chapterNumber: 4,
      author: { name: 'David Kim', avatar: undefined },
      prStatus: 'approved',
      prNumber: 44,
      votes: { up: 45, down: 2 },
      createdAt: '2024-02-07',
    },
  },
];

export const MOCK_EDGES: StoryEdge[] = [
  {
    id: 'e-1-2',
    source: 'ch-1',
    target: 'ch-2',
    type: 'storyEdge',
    data: { isMostReadPath: true },
  },
  {
    id: 'e-1-3',
    source: 'ch-1',
    target: 'ch-3',
    type: 'storyEdge',
    data: { isMostReadPath: false },
  },
  {
    id: 'e-2-4',
    source: 'ch-2',
    target: 'ch-4',
    type: 'storyEdge',
    data: { isMostReadPath: true },
  },
  {
    id: 'e-2-5',
    source: 'ch-2',
    target: 'ch-5',
    type: 'storyEdge',
    data: { isMostReadPath: false },
  },
  {
    id: 'e-4-6',
    source: 'ch-4',
    target: 'ch-6',
    type: 'storyEdge',
    data: { isMostReadPath: true },
  },
];

export const MOCK_PR_EDGES: StoryEdge[] = [
  {
    id: 'e-3-pr1',
    source: 'ch-3',
    target: 'pr-1',
    type: 'storyEdge',
    data: { isMostReadPath: false },
  },
  {
    id: 'e-3-pr2',
    source: 'ch-3',
    target: 'pr-2',
    type: 'storyEdge',
    data: { isMostReadPath: false },
  },
  {
    id: 'e-4-pr3',
    source: 'ch-4',
    target: 'pr-3',
    type: 'storyEdge',
    data: { isMostReadPath: false },
  },
];

// Dimensions
export const NODE_WIDTH = 280;
export const NODE_HEIGHT = 160;
