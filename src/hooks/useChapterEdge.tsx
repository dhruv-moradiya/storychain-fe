import type { IChapterEdge, IChapterNode } from '@/type/story-canvas.type';

const EDGE_STYLE = {
  stroke: 'lightgray',
  strokeWidth: 2,
} as const;

const EDGE_TYPE = 'chapterEdge' as const;

const useChapterEdge = (chapters: IChapterNode[]): IChapterEdge[] => {
  const edges: IChapterEdge[] = [];

  const traverse = (node: IChapterNode, parentId?: string) => {
    if (parentId) {
      edges.push({
        id: `${parentId}-${node._id}`,
        source: parentId,
        target: node._id,
        animated: true,
        style: EDGE_STYLE,
        type: EDGE_TYPE,
        data: {
          storyId: node.storyId,
        },
      });
    }

    node.children.forEach((child) => {
      traverse(child, node._id);
    });
  };

  // start from roots
  chapters.forEach((root) => {
    traverse(root);
  });

  return edges;
};

export default useChapterEdge;
