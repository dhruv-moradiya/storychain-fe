import { useCallback } from 'react';
import dagre from '@dagrejs/dagre/dist/dagre.min.js';
import type { Node, Position, Edge } from '@xyflow/react';
import {
  nodeWidth,
  nodeHeight,
  addNodePlaceholderWidth,
  addNodePlaceholderHeight,
} from '@/type/story-canvas.type';

type LayoutDirection = 'TB' | 'LR';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export function useChapterFlowLayout() {
  const layout = useCallback(
    <N extends Node, E extends Edge>(nodes: N[], edges: E[], direction: LayoutDirection = 'TB') => {
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

      // Register nodes with appropriate dimensions
      nodes.forEach((node) => {
        const isPlaceholder = node.type === 'addNodePlaceholder';
        dagreGraph.setNode(node.id, {
          width: isPlaceholder ? addNodePlaceholderWidth : nodeWidth,
          height: isPlaceholder ? addNodePlaceholderHeight : nodeHeight,
        });
      });

      // Register edges
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      const layoutedNodes: N[] = nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);
        const isPlaceholder = node.type === 'addNodePlaceholder';
        const width = isPlaceholder ? addNodePlaceholderWidth : nodeWidth;
        const height = isPlaceholder ? addNodePlaceholderHeight : nodeHeight;

        return {
          ...node,
          sourcePosition: (isHorizontal ? 'right' : 'bottom') as Position,
          targetPosition: (isHorizontal ? 'left' : 'top') as Position,
          position: {
            x: x - width / 2,
            y: y - height / 2,
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
