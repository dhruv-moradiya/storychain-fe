import CustomCardNode from '@/components/nodes/custom-card-node';
import { CustomEdge } from '@/components/nodes/custom-edge';
import AddNodePlaceholder, {
  type AddNodePlaceholderData,
} from '@/components/nodes/add-node-placeholder';
import type { Edge, EdgeProps, Node, NodeProps } from '@xyflow/react';

export interface IChapterNode {
  _id: string;
  title: string;
  storyId: string;
  status: 'PUBLISHED' | 'PENDING_APPROVAL' | 'REJECTED' | 'DELETED';

  reportCount: number;
  prId: string | null;

  isFlagged: boolean;

  children: IChapterNode[];

  parentChapterId?: string | null;
  ancestorIds: string[];
  depth: number;

  author: {
    username: string;
    clerkId: string;
    avatarUrl: string;
  };

  votes: {
    upvotes: number;
    downvotes: number;
    score: number;
  };

  isEnding: boolean;

  version: number;

  stats: {
    reads: number;
    comments: number;
    childBranches: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface IChapterNodeData extends IChapterNode, Record<string, unknown> {
  onCommentClick: (nodeId: string) => void;
}

export type IChapterNodeType = Node<IChapterNodeData, 'chapterNode'>;

export type IChapterNodeProps = NodeProps<Node<IChapterNodeData>>;

export type IChapterEdgeData = {
  storyId: string;
  // onButtonClick: (id: string) => void;
};

export type IChapterEdge = Edge<IChapterEdgeData, 'chapterEdge'>;

export type IChapterEdgeProps = EdgeProps<IChapterEdge>;

export const nodeWidth = 288;
export const nodeHeight = 175;

export const addNodePlaceholderWidth = 200;
export const addNodePlaceholderHeight = 160;

export type IAddNodePlaceholderType = Node<AddNodePlaceholderData, 'addNodePlaceholder'>;

export const nodeTypes = {
  chapterNode: CustomCardNode,
  addNodePlaceholder: AddNodePlaceholder,
};

export const edgeTypes = {
  chapterEdge: CustomEdge,
};
