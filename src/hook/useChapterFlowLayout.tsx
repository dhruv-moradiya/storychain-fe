import { useCallback } from 'react';
import dagre from '@dagrejs/dagre';
import type { Position } from '@xyflow/react';
import type { IChapterEdge, IChapterNodeType } from '@/type/story-canvas.type';

type LayoutDirection = 'TB' | 'LR';
const nodeWidth = 288;
const nodeHeight = 175;

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export function useChapterFlowLayout() {
  const layout = useCallback(
    (nodes: IChapterNodeType[], edges: IChapterEdge[], direction: LayoutDirection = 'TB') => {
      const isHorizontal = direction === 'LR';

      // ✅ Set graph config ONCE
      dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 120, // horizontal gap
        ranksep: 100, // vertical gap
        edgesep: 40,
        marginx: 60,
        marginy: 60,
      });

      // Register nodes
      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
          width: nodeWidth,
          height: nodeHeight,
        });
      });

      // Register edges
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      const layoutedNodes: IChapterNodeType[] = nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);

        return {
          ...node,
          sourcePosition: (isHorizontal ? 'right' : 'bottom') as Position,
          targetPosition: (isHorizontal ? 'left' : 'top') as Position,
          position: {
            x: x - nodeWidth / 2,
            y: y - nodeHeight / 2,
          },
        };
      });

      return {
        nodes: layoutedNodes,
        edges,
      };
    },
    []
  );

  return { layout };
}
