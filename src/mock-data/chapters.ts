export interface IChapter {
  _id: string;
  storyId: string;

  parentChapterId: string | null;
  ancestorIds: string[];
  depth: number;

  authorId: string;

  title: string | null;
  content: string;
  chapterNumber: number | null;

  votes: {
    upvotes: number;
    downvotes: number;
    score: number;
  };

  status: 'PUBLISHED' | 'PENDING_APPROVAL' | 'REJECTED' | 'DELETED';
  isEnding: boolean;

  pullRequest: {
    isPR: boolean;
    prId?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'MERGED';
    submittedAt?: string;
    reviewedBy?: string;
    reviewedAt?: string;
    rejectionReason?: string;
  };

  version: number;
  previousVersionId: string | null;

  stats: {
    reads: number;
    comments: number;
    childBranches: number;
  };

  reportCount: number;
  isFlagged: boolean;

  // IMPORTANT PART ↓↓↓
  childChapters: IChapter[];
}

export const chaptersData: IChapter[] = [
  {
    _id: 'c1',
    storyId: 's1',
    parentChapterId: null,
    ancestorIds: [],
    depth: 0,
    title: 'Root Chapter',
    authorId: 'user_1',
    content: 'This is the start of the story where the world and the hero are introduced.',
    status: 'PUBLISHED',
    chapterNumber: 1,

    votes: { upvotes: 0, downvotes: 0, score: 0 },
    isEnding: false,
    pullRequest: { isPR: false },
    version: 1,
    previousVersionId: null,
    stats: { reads: 0, comments: 0, childBranches: 0 },
    reportCount: 0,
    isFlagged: false,

    childChapters: [
      {
        _id: 'c2',
        storyId: 's1',
        parentChapterId: 'c1',
        ancestorIds: ['c1'],
        depth: 1,
        title: 'Child A',
        authorId: 'user_2',
        content: 'The hero begins exploring the eastern forest, discovering new dangers.',
        chapterNumber: 2,
        status: 'PENDING_APPROVAL',

        votes: { upvotes: 0, downvotes: 0, score: 0 },
        isEnding: false,
        pullRequest: { isPR: false },
        version: 1,
        previousVersionId: null,
        stats: { reads: 0, comments: 0, childBranches: 0 },
        reportCount: 0,
        isFlagged: false,

        childChapters: [
          {
            _id: 'c3',
            storyId: 's1',
            parentChapterId: 'c2',
            ancestorIds: ['c1', 'c2'],
            depth: 2,
            title: 'Grandchild A1',
            authorId: 'user_3',
            content: 'The hero finds a mysterious clue glowing beneath an old tree.',
            chapterNumber: 3,
            status: 'PUBLISHED',

            votes: { upvotes: 0, downvotes: 0, score: 0 },
            isEnding: false,
            pullRequest: { isPR: false },
            version: 1,
            previousVersionId: null,
            stats: { reads: 0, comments: 0, childBranches: 0 },
            reportCount: 0,
            isFlagged: false,

            childChapters: [],
          },
          {
            _id: 'c4',
            storyId: 's1',
            parentChapterId: 'c2',
            ancestorIds: ['c1', 'c2'],
            depth: 2,
            title: 'Grandchild A2',
            authorId: 'user_4',
            content: 'A strange figure appears and warns the hero about a coming threat.',
            chapterNumber: 3,
            status: 'PUBLISHED',

            votes: { upvotes: 0, downvotes: 0, score: 0 },
            isEnding: false,
            pullRequest: { isPR: false },
            version: 1,
            previousVersionId: null,
            stats: { reads: 0, comments: 0, childBranches: 0 },
            reportCount: 0,
            isFlagged: false,

            childChapters: [],
          },
        ],
      },

      {
        _id: 'c5',
        storyId: 's1',
        parentChapterId: 'c1',
        ancestorIds: ['c1'],
        depth: 1,
        title: 'Child B',
        authorId: 'user_5',
        content: 'A different route leads the hero into a deserted ancient village.',
        chapterNumber: 2,
        status: 'DELETED',

        votes: { upvotes: 0, downvotes: 0, score: 0 },
        isEnding: false,
        pullRequest: { isPR: false },
        version: 1,
        previousVersionId: null,
        stats: { reads: 0, comments: 0, childBranches: 0 },
        reportCount: 0,
        isFlagged: false,

        childChapters: [
          {
            _id: 'c6',
            storyId: 's1',
            parentChapterId: 'c5',
            ancestorIds: ['c1', 'c5'],
            depth: 2,
            title: 'Grandchild B1',
            authorId: 'user_6',
            content: 'Inside a ruined house, the hero discovers an injured traveler.',
            chapterNumber: 3,
            status: 'PUBLISHED',

            votes: { upvotes: 0, downvotes: 0, score: 0 },
            isEnding: false,
            pullRequest: { isPR: false },
            version: 1,
            previousVersionId: null,
            stats: { reads: 0, comments: 0, childBranches: 0 },
            reportCount: 0,
            isFlagged: false,

            childChapters: [],
          },
        ],
      },

      {
        _id: 'c7',
        storyId: 's1',
        parentChapterId: 'c1',
        ancestorIds: ['c1'],
        depth: 1,
        title: 'Child C',
        authorId: 'user_7',
        content: 'A hidden cave is revealed, rumored to hold ancient secrets.',
        chapterNumber: 2,
        status: 'PUBLISHED',

        votes: { upvotes: 0, downvotes: 0, score: 0 },
        isEnding: false,
        pullRequest: { isPR: false },
        version: 1,
        previousVersionId: null,
        stats: { reads: 0, comments: 0, childBranches: 0 },
        reportCount: 0,
        isFlagged: false,

        childChapters: [
          {
            _id: 'c8',
            storyId: 's1',
            parentChapterId: 'c7',
            ancestorIds: ['c1', 'c7'],
            depth: 2,
            title: 'Grandchild C1',
            authorId: 'user_8',
            content: 'The hero enters the cave and finds ancient carvings on the wall.',
            chapterNumber: 3,
            status: 'REJECTED',

            votes: { upvotes: 0, downvotes: 0, score: 0 },
            isEnding: false,
            pullRequest: { isPR: false },
            version: 1,
            previousVersionId: null,
            stats: { reads: 0, comments: 0, childBranches: 0 },
            reportCount: 0,
            isFlagged: false,

            childChapters: [],
          },
          {
            _id: 'c9',
            storyId: 's1',
            parentChapterId: 'c7',
            ancestorIds: ['c1', 'c7'],
            depth: 2,
            title: 'Grandchild C2',
            authorId: 'user_9',
            content: 'A deep rumble suggests something is awakening beneath the cave.',
            chapterNumber: 3,
            status: 'PUBLISHED',

            votes: { upvotes: 0, downvotes: 0, score: 0 },
            isEnding: false,
            pullRequest: { isPR: false },
            version: 1,
            previousVersionId: null,
            stats: { reads: 0, comments: 0, childBranches: 0 },
            reportCount: 0,
            isFlagged: false,

            childChapters: [],
          },
          {
            _id: 'c10',
            storyId: 's1',
            parentChapterId: 'c7',
            ancestorIds: ['c1', 'c7'],
            depth: 2,
            title: 'Grandchild C3',
            authorId: 'user_10',
            content: 'The cave collapses, trapping the hero inside a hidden chamber.',
            chapterNumber: 3,
            status: 'PENDING_APPROVAL',

            votes: { upvotes: 0, downvotes: 0, score: 0 },
            isEnding: false,
            pullRequest: { isPR: false },
            version: 1,
            previousVersionId: null,
            stats: { reads: 0, comments: 0, childBranches: 0 },
            reportCount: 0,
            isFlagged: false,

            childChapters: [],
          },
        ],
      },
    ],
  },
];
