import type {
  IPullRequest,
  IPRComment,
  IPRReview,
  IPRVote,
  PRStatus,
  PRType,
} from '@/type/pull-request.type';

// ==================== MOCK AUTHORS ====================

const mockAuthors = {
  gojo: {
    _id: 'user-1',
    username: 'gojo_satoru',
    displayName: 'Gojo Satoru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gojo',
  },
  megumi: {
    _id: 'user-2',
    username: 'megumi_f',
    displayName: 'Megumi Fushiguro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=megumi',
  },
  yuji: {
    _id: 'user-3',
    username: 'itadori_yuji',
    displayName: 'Itadori Yuji',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuji',
  },
  nobara: {
    _id: 'user-4',
    username: 'nobara_k',
    displayName: 'Nobara Kugisaki',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nobara',
  },
  nanami: {
    _id: 'user-5',
    username: 'nanami_kento',
    displayName: 'Nanami Kento',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nanami',
  },
  geto: {
    _id: 'user-6',
    username: 'suguru_geto',
    displayName: 'Suguru Geto',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=geto',
  },
  yuta: {
    _id: 'user-7',
    username: 'yuta_okkotsu',
    displayName: 'Yuta Okkotsu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuta',
  },
  maki: {
    _id: 'user-8',
    username: 'maki_zenin',
    displayName: 'Maki Zenin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maki',
  },
};

// ==================== MOCK STORIES ====================

const mockStories = {
  jujutsuLegacy: {
    _id: 'story-1',
    title: 'The Jujutsu Legacy',
    slug: 'the-jujutsu-legacy',
  },
  darkChronicles: {
    _id: 'story-2',
    title: 'The Dark Chronicles',
    slug: 'the-dark-chronicles',
  },
  celestialMirror: {
    _id: 'story-3',
    title: 'The Celestial Mirror',
    slug: 'the-celestial-mirror',
  },
  shadowWar: {
    _id: 'story-4',
    title: 'The Shadow War',
    slug: 'the-shadow-war',
  },
};

// ==================== MOCK CHAPTERS ====================

const mockChapters = {
  chapter1: { _id: 'ch-1', title: "Gojo's Origins", slug: 'gojos-origins' },
  chapter2: { _id: 'ch-2', title: 'Awakening', slug: 'awakening' },
  chapter3: { _id: 'ch-3', title: 'Echoes of Night', slug: 'echoes-of-night' },
  chapter4: { _id: 'ch-4', title: "Twilight's Edge", slug: 'twilights-edge' },
  chapter5: { _id: 'ch-5', title: 'The Silver Gate', slug: 'the-silver-gate' },
  chapter6: { _id: 'ch-6', title: 'Broken Time', slug: 'broken-time' },
  chapter7: { _id: 'ch-7', title: 'The Last Stand', slug: 'the-last-stand' },
  chapter8: { _id: 'ch-8', title: 'Fading Light', slug: 'fading-light' },
};

// ==================== MOCK PULL REQUESTS ====================

export const mockPullRequests: IPullRequest[] = [
  {
    _id: 'pr-1',
    title: "Add Gojo's Past Chapter",
    description:
      "Explores Gojo's childhood and early mastery of Limitless before joining Jujutsu High. This chapter delves deep into his relationship with Geto during their school days and sets up the tragic events that would later unfold.",
    storyId: mockStories.jujutsuLegacy._id,
    chapterId: mockChapters.chapter1._id,
    parentChapterId: mockChapters.chapter1._id,
    authorId: mockAuthors.gojo._id,
    author: mockAuthors.gojo,
    story: mockStories.jujutsuLegacy,
    chapter: mockChapters.chapter1,
    prType: 'NEW_CHAPTER',
    changes: {
      proposed: `The morning mist clung to Jujutsu High like a shroud as young Gojo Satoru walked through the gates for the first time. His silver hair, already distinctive, caught the early light as his Six Eyes scanned every corner of the ancient institution.

"So this is where they make sorcerers," he muttered, a smirk playing on his lips. Even at fifteen, the confidence that would later define him was unmistakable.

Behind him, another figure emerged from the mist—Suguru Geto, his dark hair tied back, expression thoughtful as always. "Don't get too cocky, Satoru. I heard they have some real monsters here."

Gojo's grin widened. "Good. I was hoping for a challenge."

Little did they know that their friendship, forged in these halls, would one day shatter the very foundations of the jujutsu world.`,
      lineCount: 15,
      additionsCount: 15,
      deletionsCount: 0,
    },
    status: 'OPEN',
    votes: { upvotes: 24, downvotes: 3, score: 21 },
    commentCount: 8,
    autoApprove: { enabled: true, threshold: 10, timeWindow: 7 },
    labels: ['GOOD_FIRST_PR'],
    isDraft: false,
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.gojo._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        action: 'REVIEW_REQUESTED',
        performedBy: mockAuthors.gojo._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
        metadata: { reviewers: [mockAuthors.nanami._id] },
      },
    ],
    stats: { views: 156, discussions: 3, reviewsReceived: 2 },
    approvalsStatus: {
      required: 2,
      received: 1,
      pending: 1,
      approvers: [mockAuthors.nanami._id],
      blockers: [],
      canMerge: false,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    _id: 'pr-2',
    title: 'Revise Dialogue Tone',
    description:
      "Improves character dialogue to match emotional pacing during Yuji's confrontation. The current dialogue feels too casual for such a pivotal moment.",
    storyId: mockStories.jujutsuLegacy._id,
    chapterId: mockChapters.chapter2._id,
    parentChapterId: mockChapters.chapter2._id,
    authorId: mockAuthors.megumi._id,
    author: mockAuthors.megumi,
    story: mockStories.jujutsuLegacy,
    chapter: mockChapters.chapter2,
    prType: 'EDIT_CHAPTER',
    changes: {
      original: '"Hey, that\'s not cool," Yuji said, frowning at the curse.',
      proposed:
        '"You think you can just take lives like they mean nothing?" Yuji\'s voice cracked, his fists trembling. "I\'ll make sure you understand the weight of every soul you\'ve devoured."',
      diff: '- "Hey, that\'s not cool," Yuji said, frowning at the curse.\n+ "You think you can just take lives like they mean nothing?" Yuji\'s voice cracked, his fists trembling. "I\'ll make sure you understand the weight of every soul you\'ve devoured."',
      lineCount: 2,
      additionsCount: 1,
      deletionsCount: 1,
    },
    status: 'APPROVED',
    votes: { upvotes: 45, downvotes: 2, score: 43 },
    commentCount: 12,
    autoApprove: {
      enabled: true,
      threshold: 10,
      timeWindow: 7,
      qualifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    },
    labels: ['QUALITY_ISSUE'],
    isDraft: false,
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.megumi._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        action: 'REVIEW_SUBMITTED',
        performedBy: mockAuthors.nanami._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        metadata: { decision: 'APPROVE', rating: 5 },
      },
      {
        action: 'APPROVED',
        performedBy: null,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      },
    ],
    stats: { views: 234, discussions: 5, reviewsReceived: 3 },
    approvalsStatus: {
      required: 2,
      received: 2,
      pending: 0,
      approvers: [mockAuthors.nanami._id, mockAuthors.gojo._id],
      blockers: [],
      canMerge: true,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    _id: 'pr-3',
    title: 'Add Flashback Scene',
    description:
      'Adds a flashback revealing the first encounter with the masked entity. This provides crucial context for the main antagonist.',
    storyId: mockStories.darkChronicles._id,
    chapterId: mockChapters.chapter3._id,
    parentChapterId: mockChapters.chapter3._id,
    authorId: mockAuthors.yuji._id,
    author: mockAuthors.yuji,
    story: mockStories.darkChronicles,
    chapter: mockChapters.chapter3,
    prType: 'EDIT_CHAPTER',
    changes: {
      original: 'The night was silent.',
      proposed: `The night was silent, but in Yuji's mind, memories surfaced unbidden—

*Three years ago*

The alleyway was dark, the kind of darkness that seemed to swallow sound itself. Young Yuji, barely fourteen, had taken a shortcut home when he first saw it: a figure in a white mask, standing perfectly still at the end of the passage.

"Who are you?" his voice had trembled.

The figure tilted its head, and for a moment, Yuji could have sworn he saw it smile beneath the mask.

*Present day*

The night was silent, but Yuji knew now that silence often preceded the storm.`,
      diff: `- The night was silent.
+ The night was silent, but in Yuji's mind, memories surfaced unbidden—
+
+ *Three years ago*
+
+ The alleyway was dark...`,
      lineCount: 18,
      additionsCount: 17,
      deletionsCount: 1,
    },
    status: 'REJECTED',
    votes: { upvotes: 8, downvotes: 15, score: -7 },
    commentCount: 6,
    autoApprove: { enabled: false, threshold: 10, timeWindow: 7 },
    labels: ['PLOT_HOLE'],
    isDraft: false,
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    closedBy: mockAuthors.geto._id,
    closeReason:
      'The flashback disrupts pacing significantly. Consider placing it in a dedicated chapter instead.',
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.yuji._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      },
      {
        action: 'CHANGES_REQUESTED',
        performedBy: mockAuthors.geto._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
      },
      {
        action: 'CLOSED',
        performedBy: mockAuthors.geto._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        metadata: { reason: 'Pacing issues' },
      },
    ],
    stats: { views: 89, discussions: 2, reviewsReceived: 2 },
    approvalsStatus: {
      required: 2,
      received: 0,
      pending: 2,
      approvers: [],
      blockers: [mockAuthors.geto._id],
      canMerge: false,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    _id: 'pr-4',
    title: 'Expand Ending Monologue',
    description:
      'Extends the ending scene to emphasize moral contrast and inner conflict. The current ending feels rushed.',
    storyId: mockStories.shadowWar._id,
    chapterId: mockChapters.chapter4._id,
    parentChapterId: mockChapters.chapter4._id,
    authorId: mockAuthors.nobara._id,
    author: mockAuthors.nobara,
    story: mockStories.shadowWar,
    chapter: mockChapters.chapter4,
    prType: 'EDIT_CHAPTER',
    changes: {
      original: 'She turned away, unsure of what tomorrow would bring.',
      proposed: `She turned away, but her feet felt rooted to the spot. The weight of her choices pressed down on her shoulders like a physical burden.

"Was I right?" she whispered to the empty room. "Or have I become the very thing I swore to destroy?"

The mirror on the wall showed her reflection—but for a moment, she didn't recognize the person staring back. The fire in her eyes had dimmed, replaced by something colder. Something harder.

Tomorrow would bring new battles. New choices. New chances to prove—or disprove—that her path was the righteous one.

She turned away, finally, carrying the weight of uncertainty into the darkness.`,
      diff: `- She turned away, unsure of what tomorrow would bring.
+ She turned away, but her feet felt rooted to the spot...`,
      lineCount: 14,
      additionsCount: 13,
      deletionsCount: 1,
    },
    status: 'OPEN',
    votes: { upvotes: 18, downvotes: 4, score: 14 },
    commentCount: 5,
    autoApprove: { enabled: true, threshold: 15, timeWindow: 7 },
    labels: ['NEEDS_REVIEW'],
    isDraft: false,
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.nobara._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      },
    ],
    stats: { views: 67, discussions: 2, reviewsReceived: 1 },
    approvalsStatus: {
      required: 2,
      received: 1,
      pending: 1,
      approvers: [mockAuthors.maki._id],
      blockers: [],
      canMerge: false,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: 'pr-5',
    title: 'Add Background Lore',
    description:
      'Introduces historical context of the Mirror Realm for upcoming arcs. Essential worldbuilding for the series.',
    storyId: mockStories.celestialMirror._id,
    chapterId: mockChapters.chapter5._id,
    parentChapterId: mockChapters.chapter5._id,
    authorId: mockAuthors.yuta._id,
    author: mockAuthors.yuta,
    story: mockStories.celestialMirror,
    chapter: mockChapters.chapter5,
    prType: 'NEW_CHAPTER',
    changes: {
      proposed: `# The History of the Mirror Realm

Long before humanity walked the earth, the Mirror Realm existed as a parallel dimension—a reflection of our world, but twisted. Where our world had light, the Mirror Realm had shadow. Where we had hope, they had despair.

The ancient texts speak of the First Crossing, when a sorcerer named Amara discovered a way to breach the barrier between worlds. What she found there changed everything.

"The mirrors don't just reflect," she wrote in her journal, the last entry before her disappearance. "They remember. They hunger. And they wait."

For centuries, the knowledge of the Mirror Realm was suppressed, hidden in the deepest vaults of the sorcerer academies. But secrets have a way of surfacing, especially when they're needed most.

And now, the barrier is weakening once again.`,
      lineCount: 16,
      additionsCount: 16,
      deletionsCount: 0,
    },
    status: 'MERGED',
    votes: { upvotes: 67, downvotes: 5, score: 62 },
    commentCount: 23,
    autoApprove: {
      enabled: true,
      threshold: 10,
      timeWindow: 7,
      autoApprovedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    },
    labels: [],
    isDraft: false,
    mergedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    mergedBy: mockAuthors.gojo._id,
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.yuta._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
      {
        action: 'APPROVED',
        performedBy: null,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
      },
      {
        action: 'MERGED',
        performedBy: mockAuthors.gojo._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      },
    ],
    stats: { views: 445, discussions: 8, reviewsReceived: 4, timeToMerge: 720 },
    approvalsStatus: {
      required: 2,
      received: 2,
      pending: 0,
      approvers: [mockAuthors.gojo._id, mockAuthors.nanami._id],
      blockers: [],
      canMerge: true,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    _id: 'pr-6',
    title: 'Fix Timeline Inconsistency',
    description: 'Corrects event order and adds transitions between battle and aftermath scenes.',
    storyId: mockStories.darkChronicles._id,
    chapterId: mockChapters.chapter6._id,
    parentChapterId: mockChapters.chapter6._id,
    authorId: mockAuthors.nanami._id,
    author: mockAuthors.nanami,
    story: mockStories.darkChronicles,
    chapter: mockChapters.chapter6,
    prType: 'EDIT_CHAPTER',
    changes: {
      original:
        'The battle ended at midnight. Earlier that evening, they had prepared their strategy.',
      proposed:
        'Earlier that evening, they had prepared their strategy with meticulous care. By midnight, the battle had reached its devastating conclusion.',
      diff: '- The battle ended at midnight. Earlier that evening, they had prepared their strategy.\n+ Earlier that evening, they had prepared their strategy with meticulous care. By midnight, the battle had reached its devastating conclusion.',
      lineCount: 2,
      additionsCount: 1,
      deletionsCount: 1,
    },
    status: 'APPROVED',
    votes: { upvotes: 32, downvotes: 1, score: 31 },
    commentCount: 4,
    autoApprove: { enabled: true, threshold: 10, timeWindow: 7 },
    labels: ['GRAMMAR'],
    isDraft: false,
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.nanami._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      },
      {
        action: 'APPROVED',
        performedBy: null,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      },
    ],
    stats: { views: 112, discussions: 1, reviewsReceived: 2 },
    approvalsStatus: {
      required: 2,
      received: 2,
      pending: 0,
      approvers: [mockAuthors.gojo._id, mockAuthors.megumi._id],
      blockers: [],
      canMerge: true,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    _id: 'pr-7',
    title: 'Rewrite Final Battle Scene',
    description: 'Rewrites the climactic fight for better pacing and balance between protagonists.',
    storyId: mockStories.shadowWar._id,
    chapterId: mockChapters.chapter7._id,
    parentChapterId: mockChapters.chapter7._id,
    authorId: mockAuthors.geto._id,
    author: mockAuthors.geto,
    story: mockStories.shadowWar,
    chapter: mockChapters.chapter7,
    prType: 'EDIT_CHAPTER',
    changes: {
      original: 'They fought bravely.',
      proposed: `The clash of cursed energy lit up the night sky like a violent aurora. Gojo moved first, his Infinity warping the space around him as he closed the distance in an instant.

"You always were predictable, Satoru," Geto murmured, summoning a massive curse spirit to intercept.

But Gojo was already past it, his fist wreathed in cursed energy aimed directly at his former friend's heart. "And you always talked too much."

Behind them, Yuji and Megumi coordinated their assault on the lesser curses, their teamwork seamless despite the chaos. Nobara's nails sang through the air, each one finding its mark with deadly precision.

This was it. The final stand. Everything they'd fought for came down to this moment.`,
      diff: '- They fought bravely.\n+ The clash of cursed energy lit up the night sky...',
      lineCount: 14,
      additionsCount: 13,
      deletionsCount: 1,
    },
    status: 'OPEN',
    votes: { upvotes: 56, downvotes: 8, score: 48 },
    commentCount: 15,
    autoApprove: { enabled: false, threshold: 10, timeWindow: 7 },
    labels: ['NEEDS_REVIEW', 'QUALITY_ISSUE'],
    isDraft: true,
    draftReason: 'Still working on the choreography details',
    draftedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.geto._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
      },
      {
        action: 'MARKED_DRAFT',
        performedBy: mockAuthors.geto._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      },
    ],
    stats: { views: 289, discussions: 6, reviewsReceived: 3 },
    approvalsStatus: {
      required: 3,
      received: 1,
      pending: 2,
      approvers: [mockAuthors.gojo._id],
      blockers: [mockAuthors.nanami._id],
      canMerge: false,
    },
    requiresModeration: false,
    flaggedForReview: false,
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    _id: 'pr-8',
    title: 'Delete Redundant Chapter',
    description:
      'Removes the filler chapter that was added during the hiatus. Community consensus is that it disrupts the flow.',
    storyId: mockStories.jujutsuLegacy._id,
    chapterId: mockChapters.chapter8._id,
    parentChapterId: mockChapters.chapter8._id,
    authorId: mockAuthors.maki._id,
    author: mockAuthors.maki,
    story: mockStories.jujutsuLegacy,
    chapter: mockChapters.chapter8,
    prType: 'DELETE_CHAPTER',
    changes: {
      original: `This chapter was added as filler content during the author's hiatus. It doesn't contribute to the main storyline and has received negative feedback from readers.

The events described here contradict established canon and should be removed to maintain story integrity.`,
      proposed: '',
      diff: '- This chapter was added as filler content...\n- The events described here contradict established canon...',
      lineCount: 6,
      additionsCount: 0,
      deletionsCount: 6,
    },
    status: 'CLOSED',
    votes: { upvotes: 12, downvotes: 28, score: -16 },
    commentCount: 34,
    autoApprove: { enabled: false, threshold: 10, timeWindow: 7 },
    labels: ['PLOT_HOLE'],
    isDraft: false,
    closedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    closedBy: mockAuthors.gojo._id,
    closeReason:
      'Community vote resulted in keeping the chapter with revisions instead of deletion.',
    timeline: [
      {
        action: 'CREATED',
        performedBy: mockAuthors.maki._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      },
      {
        action: 'CLOSED',
        performedBy: mockAuthors.gojo._id,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
    stats: { views: 567, discussions: 12, reviewsReceived: 5 },
    approvalsStatus: {
      required: 3,
      received: 1,
      pending: 2,
      approvers: [mockAuthors.maki._id],
      blockers: [mockAuthors.gojo._id, mockAuthors.yuji._id],
      canMerge: false,
    },
    requiresModeration: false,
    flaggedForReview: true,
    moderationNotes: 'Controversial deletion request - requires owner approval',
    reportIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// ==================== MOCK PR COMMENTS ====================

export const mockPRComments: IPRComment[] = [
  {
    _id: 'comment-1',
    pullRequestId: 'pr-1',
    userId: mockAuthors.nanami._id,
    content:
      'This chapter idea is solid. The characterization of young Gojo feels authentic. Consider adding more details about his relationship with Geto during their early training days.',
    commentType: 'APPROVAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
    user: mockAuthors.nanami,
  },
  {
    _id: 'comment-2',
    pullRequestId: 'pr-1',
    userId: mockAuthors.megumi._id,
    content: 'The opening line about the mist is evocative. Nice atmospheric touch.',
    commentType: 'GENERAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    user: mockAuthors.megumi,
  },
  {
    _id: 'comment-3',
    pullRequestId: 'pr-1',
    userId: mockAuthors.yuji._id,
    parentCommentId: 'comment-1',
    content: 'Agreed! Maybe we could see their first sparring session?',
    commentType: 'SUGGESTION',
    suggestion: {
      line: 8,
      originalText: 'Behind him, another figure emerged',
      suggestedText: 'Behind him, his future rival and closest friend emerged',
    },
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    user: mockAuthors.yuji,
  },
  {
    _id: 'comment-4',
    pullRequestId: 'pr-2',
    userId: mockAuthors.gojo._id,
    content:
      "The revised dialogue is much more impactful. Yuji's emotional state really comes through now.",
    commentType: 'APPROVAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    user: mockAuthors.gojo,
  },
  {
    _id: 'comment-5',
    pullRequestId: 'pr-3',
    userId: mockAuthors.geto._id,
    content:
      'The flashback disrupts pacing significantly. This information could be revealed more organically through dialogue or a dedicated chapter.',
    commentType: 'REQUEST_CHANGES',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    user: mockAuthors.geto,
  },
  {
    _id: 'comment-6',
    pullRequestId: 'pr-4',
    userId: mockAuthors.maki._id,
    content: "Love the mirror metaphor. It ties beautifully into the story's themes of identity.",
    commentType: 'APPROVAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    user: mockAuthors.maki,
  },
  {
    _id: 'comment-7',
    pullRequestId: 'pr-7',
    userId: mockAuthors.nanami._id,
    content:
      'The battle choreography needs work. The transitions between fighters feel abrupt. Can we add more connective tissue between the different combat sequences?',
    commentType: 'REQUEST_CHANGES',
    isEdited: true,
    editedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    user: mockAuthors.nanami,
  },
  {
    _id: 'comment-8',
    pullRequestId: 'pr-7',
    userId: mockAuthors.geto._id,
    parentCommentId: 'comment-7',
    content:
      "Working on it! I've drafted some transition paragraphs that should smooth out the flow.",
    commentType: 'GENERAL',
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    user: mockAuthors.geto,
  },
];

// ==================== MOCK PR REVIEWS ====================

export const mockPRReviews: IPRReview[] = [
  {
    _id: 'review-1',
    pullRequestId: 'pr-1',
    reviewerId: mockAuthors.nanami._id,
    reviewStatus: 'APPROVED',
    summary:
      'Excellent character work. The dialogue feels natural and the pacing is well-balanced.',
    feedback: [
      { section: 'Opening', rating: 5, comment: 'Atmospheric and engaging' },
      { section: 'Dialogue', rating: 4, comment: 'Natural flow, minor polish needed' },
      { section: 'Character Development', rating: 5, comment: 'Perfect capture of young Gojo' },
    ],
    overallRating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    reviewer: mockAuthors.nanami,
  },
  {
    _id: 'review-2',
    pullRequestId: 'pr-2',
    reviewerId: mockAuthors.nanami._id,
    reviewStatus: 'APPROVED',
    summary: 'The emotional weight is much better now. Approved.',
    feedback: [
      { section: 'Dialogue', rating: 5, comment: 'Significant improvement' },
      { section: 'Emotional Impact', rating: 5, comment: 'Really hits hard now' },
    ],
    overallRating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    reviewer: mockAuthors.nanami,
  },
  {
    _id: 'review-3',
    pullRequestId: 'pr-3',
    reviewerId: mockAuthors.geto._id,
    reviewStatus: 'CHANGES_REQUESTED',
    summary: 'Flashback placement is problematic. Consider restructuring.',
    feedback: [
      { section: 'Pacing', rating: 2, comment: 'Flashback interrupts flow' },
      { section: 'Content', rating: 4, comment: 'Good content, wrong placement' },
    ],
    overallRating: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    reviewer: mockAuthors.geto,
  },
  {
    _id: 'review-4',
    pullRequestId: 'pr-5',
    reviewerId: mockAuthors.gojo._id,
    reviewStatus: 'APPROVED',
    summary: 'Essential worldbuilding. Well-written and engaging.',
    feedback: [
      { section: 'Worldbuilding', rating: 5, comment: 'Fills important gaps' },
      { section: 'Writing Quality', rating: 5, comment: 'Polished prose' },
      { section: 'Integration', rating: 4, comment: 'Fits well with existing lore' },
    ],
    overallRating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    reviewer: mockAuthors.gojo,
  },
  {
    _id: 'review-5',
    pullRequestId: 'pr-7',
    reviewerId: mockAuthors.nanami._id,
    reviewStatus: 'CHANGES_REQUESTED',
    summary: 'Good foundation but needs more work on transitions.',
    feedback: [
      { section: 'Action Sequences', rating: 4, comment: 'Exciting but disjointed' },
      { section: 'Character Balance', rating: 3, comment: 'Some characters feel sidelined' },
      { section: 'Pacing', rating: 3, comment: 'Transitions need smoothing' },
    ],
    overallRating: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    reviewer: mockAuthors.nanami,
  },
];

// ==================== MOCK PR VOTES ====================

export const mockPRVotes: IPRVote[] = [
  {
    _id: 'vote-1',
    pullRequestId: 'pr-1',
    userId: mockAuthors.nanami._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    user: mockAuthors.nanami,
  },
  {
    _id: 'vote-2',
    pullRequestId: 'pr-1',
    userId: mockAuthors.megumi._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 0.5).toISOString(),
    user: mockAuthors.megumi,
  },
  {
    _id: 'vote-3',
    pullRequestId: 'pr-1',
    userId: mockAuthors.yuji._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: mockAuthors.yuji,
  },
  {
    _id: 'vote-4',
    pullRequestId: 'pr-2',
    userId: mockAuthors.gojo._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    user: mockAuthors.gojo,
  },
  {
    _id: 'vote-5',
    pullRequestId: 'pr-2',
    userId: mockAuthors.nobara._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
    user: mockAuthors.nobara,
  },
  {
    _id: 'vote-6',
    pullRequestId: 'pr-3',
    userId: mockAuthors.geto._id,
    vote: -1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 65).toISOString(),
    user: mockAuthors.geto,
  },
  {
    _id: 'vote-7',
    pullRequestId: 'pr-5',
    userId: mockAuthors.gojo._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
    user: mockAuthors.gojo,
  },
  {
    _id: 'vote-8',
    pullRequestId: 'pr-5',
    userId: mockAuthors.nanami._id,
    vote: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 44).toISOString(),
    user: mockAuthors.nanami,
  },
];

// ==================== HELPER FUNCTIONS ====================

export function getPullRequestById(id: string): IPullRequest | undefined {
  return mockPullRequests.find((pr) => pr._id === id);
}

export function getCommentsByPRId(pullRequestId: string): IPRComment[] {
  return mockPRComments.filter((c) => c.pullRequestId === pullRequestId);
}

export function getReviewsByPRId(pullRequestId: string): IPRReview[] {
  return mockPRReviews.filter((r) => r.pullRequestId === pullRequestId);
}

export function getVotesByPRId(pullRequestId: string): IPRVote[] {
  return mockPRVotes.filter((v) => v.pullRequestId === pullRequestId);
}

export function filterPullRequests(
  status?: PRStatus | 'all',
  prType?: PRType | 'all',
  searchQuery?: string
): IPullRequest[] {
  return mockPullRequests.filter((pr) => {
    if (status && status !== 'all' && pr.status !== status) return false;
    if (prType && prType !== 'all' && pr.prType !== prType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        pr.title.toLowerCase().includes(query) ||
        pr.description.toLowerCase().includes(query) ||
        pr.author?.displayName?.toLowerCase().includes(query) ||
        pr.story?.title.toLowerCase().includes(query)
      );
    }
    return true;
  });
}
