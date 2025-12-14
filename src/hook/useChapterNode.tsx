import type { IChapterNode, IChapterNodeType } from '@/type/story-canvas.type';

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  return `${Math.floor(hours / 24)} days ago`;
}

function estimateReadTime(text: string): number {
  const words = text.split(' ').length;
  return Math.max(1, Math.round(words / 200));
}

const HORIZONTAL_GAP = 320;
const VERTICAL_GAP = 140;

const useChapterNode = (chapters: IChapterNode[]): IChapterNodeType[] => {
  const nodes: IChapterNodeType[] = [];
  const yTracker = new Map<number, number>();

  const getNextY = (depth: number) => {
    const current = yTracker.get(depth) ?? 0;
    yTracker.set(depth, current + 1);
    return current * VERTICAL_GAP;
  };

  const traverse = (node: IChapterNode) => {
    const y = getNextY(node.depth);

    nodes.push({
      id: node._id,
      type: 'chapterNode',
      position: {
        x: node.depth * HORIZONTAL_GAP,
        y,
      },
      data: {
        // -----------------------------
        // REQUIRED: IChapterNode fields
        // -----------------------------
        _id: node._id,
        title: node.title,
        storyId: node.storyId,
        status: node.status,

        reportCount: node.reportCount,
        prId: node.prId,

        isFlagged: node.isFlagged,

        children: node.children,

        parentChapterId: node.parentChapterId ?? null,
        ancestorIds: node.ancestorIds,
        depth: node.depth,

        author: {
          username: node.author.username,
          clerkId: node.author.clerkId,
          avatarUrl: node.author.avatarUrl,
        },

        votes: {
          upvotes: node.votes.upvotes,
          downvotes: node.votes.downvotes,
          score: node.votes.score,
        },

        isEnding: node.isEnding,
        version: node.version,

        stats: {
          reads: node.stats.reads,
          comments: node.stats.comments,
          childBranches: node.stats.childBranches,
        },

        createdAt: node.createdAt,
        updatedAt: node.updatedAt,

        // ---------------------------------
        // UI helpers (allowed by Record<>)
        // ---------------------------------
        timeAgo: formatTimeAgo(node.createdAt),
        readTime: estimateReadTime(node.title),
        hasChildren: node.children.length > 0,

        // ---------------------------------
        // REQUIRED by IChapterNodeData
        // ---------------------------------
        onCommentClick: () => {},
      },
    });

    node.children.forEach(traverse);
  };

  chapters.forEach(traverse);

  return nodes;
};

export default useChapterNode;
