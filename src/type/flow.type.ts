import type { Edge, Node, NodeProps } from "@xyflow/react";

type StoryNodeData = {
  title: string;
  chapter: string;
  username: string;
  userInitial: string;
  timeAgo: string;
  readTime: number;
  readers: number;
  likes: number;
  hovered: boolean;
  onCommentClick: (nodeId: string) => void;
};

export type CustomNodeType = Node<StoryNodeData, "customCard">;

export type CustomNodeProps = NodeProps<Node<StoryNodeData>>;

export type CustomEdgeData = {
  onButtonClick: (id: string) => void;
};

export type CustomEdge = Edge<CustomEdgeData, "custom">;
export type { StoryNodeData };

// Updated TypeScript type
export type RequestStatus = "open" | "approved" | "rejected" | "merged";
export type ChangeType = "new" | "update";

export interface User {
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timeAgo: string;
}

export interface Request {
  id: string;
  title: string;
  storyTitle: string;
  chapterName: string;
  description: string;
  author: User;
  contributors?: string[];
  timeAgo: string;
  status: RequestStatus;
  changeType: ChangeType; // NEW FIELD: new or update
  priority?: "low" | "medium" | "high";
  tags?: string[];
  comments?: Comment[];
}
