import { getLayoutedElements } from '@/components/stories/flow-layout';
import { addEdge, useEdgesState, useNodesState, type Connection } from '@xyflow/react';
import { useCallback } from 'react';

interface Params {
  onNodeCommentClick: (nodeId: string) => void;
}

export function useStoryTreeLayout({ onNodeCommentClick }: Params) {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const nodesWithHandlers: StoryNode[] = layoutedNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onCommentClick: onNodeCommentClick,
    },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState<StoryNode>(nodesWithHandlers);

  const [edges, setEdges, onEdgesChange] = useEdgesState<StoryEdge>(layoutedEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: 'lightgray', strokeWidth: 2 },
            type: 'smoothstep',
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const { nodes, edges } = getLayoutedElements(nodes, edges, direction);

      setNodes(nodes);
      setEdges(edges);
    },
    [nodes, edges]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onLayout,
  };
}
