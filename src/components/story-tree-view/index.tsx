import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  type EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { PublishedChapterNode } from './nodes/published-chapter-node';
import { PRChapterNode } from './nodes/pr-chapter-node';
import { StoryEdge } from './edges/story-edge';
import { TreeToolbar } from './tree-toolbar';
import {
  MOCK_PUBLISHED_CHAPTERS,
  MOCK_PR_CHAPTERS,
  MOCK_EDGES,
  MOCK_PR_EDGES,
  type StoryTreeNode,
  type StoryEdge as StoryEdgeType,
} from './story-tree-view.types';

// Node types registration
const nodeTypes: NodeTypes = {
  publishedChapter: PublishedChapterNode,
  prChapter: PRChapterNode,
};

// Edge types registration
const edgeTypes: EdgeTypes = {
  storyEdge: StoryEdge,
};

function StoryTreeViewContent() {
  const [showPRNodes, setShowPRNodes] = useState(false);
  const [highlightMostRead, setHighlightMostRead] = useState(true);

  // Compute nodes based on toggle state
  const initialNodes = useMemo<StoryTreeNode[]>(() => {
    const publishedNodes = MOCK_PUBLISHED_CHAPTERS.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isMostRead: highlightMostRead ? node.data.isMostRead : false,
      },
    }));

    if (showPRNodes) {
      return [...publishedNodes, ...MOCK_PR_CHAPTERS];
    }
    return publishedNodes;
  }, [showPRNodes, highlightMostRead]);

  // Compute edges based on toggle state
  const initialEdges = useMemo<StoryEdgeType[]>(() => {
    const baseEdges = MOCK_EDGES.map((edge) => ({
      ...edge,
      data: {
        ...edge.data,
        isMostReadPath: highlightMostRead ? edge.data?.isMostReadPath : false,
      },
    }));

    if (showPRNodes) {
      return [...baseEdges, ...MOCK_PR_EDGES];
    }
    return baseEdges;
  }, [showPRNodes, highlightMostRead]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when toggles change
  const handleTogglePRNodes = useCallback(() => {
    setShowPRNodes((prev) => {
      const newValue = !prev;
      if (newValue) {
        setNodes((currentNodes) => [...currentNodes, ...MOCK_PR_CHAPTERS]);
        setEdges((currentEdges) => [...currentEdges, ...MOCK_PR_EDGES]);
      } else {
        setNodes((currentNodes) => currentNodes.filter((node) => node.type !== 'prChapter'));
        setEdges((currentEdges) =>
          currentEdges.filter((edge) => !MOCK_PR_EDGES.some((prEdge) => prEdge.id === edge.id))
        );
      }
      return newValue;
    });
  }, [setNodes, setEdges]);

  const handleToggleHighlightMostRead = useCallback(() => {
    setHighlightMostRead((prev) => {
      const newValue = !prev;
      // Update nodes to reflect most read status
      setNodes((currentNodes) =>
        currentNodes.map((node) => {
          if (node.type === 'publishedChapter') {
            const originalNode = MOCK_PUBLISHED_CHAPTERS.find((n) => n.id === node.id);
            return {
              ...node,
              data: {
                ...node.data,
                isMostRead: newValue ? (originalNode?.data.isMostRead ?? false) : false,
              },
            };
          }
          return node;
        })
      );
      // Update edges to reflect most read path
      setEdges((currentEdges) =>
        currentEdges.map((edge) => {
          const originalEdge = MOCK_EDGES.find((e) => e.id === edge.id);
          return {
            ...edge,
            data: {
              ...edge.data,
              isMostReadPath: newValue ? (originalEdge?.data?.isMostReadPath ?? false) : false,
            },
          };
        })
      );
      return newValue;
    });
  }, [setNodes, setEdges]);

  return (
    <div className="from-cream-95 to-cream-90 relative h-[calc(100vh-120px)] w-full overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br via-white">
      {/* Toolbar */}
      <TreeToolbar
        showPRNodes={showPRNodes}
        onTogglePRNodes={handleTogglePRNodes}
        highlightMostRead={highlightMostRead}
        onToggleHighlightMostRead={handleToggleHighlightMostRead}
      />

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'storyEdge',
        }}
        proOptions={{ hideAttribution: true }}
      >
        {/* Background with subtle pattern */}
        <Background gap={32} size={1} color="rgba(42, 45, 102, 0.05)" />

        {/* Controls */}
        <Controls
          className="!bottom-4 !left-4 !rounded-xl !border-black/10 !bg-white/90 !shadow-lg !backdrop-blur-md [&>button]:!rounded-lg [&>button]:!border-black/5 [&>button]:!bg-white [&>button]:hover:!bg-black/5"
          showInteractive={false}
        />

        {/* Minimap */}
        <MiniMap
          className="!right-4 !bottom-4 !rounded-xl !border-black/10 !bg-white/90 !shadow-lg !backdrop-blur-md"
          nodeColor={(node) => {
            if (node.type === 'prChapter') return '#ec4899';
            if ((node.data as { isMostRead?: boolean })?.isMostRead) return '#ff9f68';
            return '#6b7cff';
          }}
          maskColor="rgba(255, 246, 234, 0.8)"
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-4 rounded-xl border border-black/10 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="bg-brand-blue h-3 w-3 rounded-full" />
            <span className="text-text-secondary-65 text-xs">Published</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="border-brand-pink-500 bg-brand-pink-500/20 h-3 w-3 rounded-full border-2 border-dashed" />
            <span className="text-text-secondary-65 text-xs">Open PR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="from-brand-orange to-brand-pink-500 h-3 w-6 rounded-full bg-gradient-to-r" />
            <span className="text-text-secondary-65 text-xs">Most Read Path</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoryTreeView() {
  return (
    <ReactFlowProvider>
      <StoryTreeViewContent />
    </ReactFlowProvider>
  );
}

export default StoryTreeView;
