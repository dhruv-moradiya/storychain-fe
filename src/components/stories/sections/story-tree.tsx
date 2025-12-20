import {
  addEdge,
  Background,
  ConnectionLineType,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { nodeTypes, edgeTypes } from '@/type/story-canvas.type';
import LeftActionButtons from '../action-buttons/left-action-buttons';
import TopActionButtons from '../action-buttons/top-action-buttons';

import CommentsPanel from '../panels/comments/CommentsPanel';
import StorySettingsPanel from '../panels/setting/StorySettingsPanel';
import MergeRequestPanel from '../panels/MergeRequest/MergeRequestPanel';

import type { IStory } from '@/type/story.type';

import useChapterNode from '@/hooks/useChapterNode';
import useChapterEdge from '@/hooks/useChapterEdge';
import { useChapterFlowLayout } from '@/hooks/useChapterFlowLayout';
import type { IChapterEdge, IChapterNodeType } from '@/type/story-canvas.type';
import { useGetStoryBySlug, useGetStoryTree } from '@/hooks/story/story.queries';
import StoryTreeLoading from './story-tree/components/story-tree-loading';
import StoryTreeEmpty from './story-tree/components/story-tree-empty';

const EMPTY_ARRAY: [] = [];

const StoryTree = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [_, setSelectedNodeId] = useState<string | null>(null);
  const [openStoryEditor, setOpenStoryEditor] = useState(false);

  /* ----------------------------------
   * Story data
   * ---------------------------------- */
  const cachedStory = queryClient.getQueryData<IStory>(['story_by_slug', slug]);

  const {
    data: fetchedStory,
    isLoading: isStoryLoading,
    error: storyError,
  } = useGetStoryBySlug(slug ?? '', {
    enabled: !cachedStory,
  });

  const story = cachedStory ?? fetchedStory;

  const {
    data: storyTree,
    isLoading: isTreeLoading,
    error: treeError,
  } = useGetStoryTree(story?._id ?? '');

  /* ----------------------------------
   * Hooks MUST be unconditional
   * ---------------------------------- */
  const chapters = storyTree?.chapters ?? EMPTY_ARRAY;

  const rawNodes = useChapterNode(chapters);
  const rawEdges = useChapterEdge(chapters);
  console.log('rawEdges :>> ', rawEdges);

  const { layout } = useChapterFlowLayout();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () =>
      chapters.length
        ? layout(rawNodes, rawEdges as IChapterEdge[])
        : { nodes: EMPTY_ARRAY, edges: EMPTY_ARRAY },
    [chapters.length, rawNodes, rawEdges, layout]
  );

  /* ----------------------------------
   * Node interaction
   * ---------------------------------- */
  const handleNodeButtonClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setOpenPanel('comments');
  };

  const nodesWithHandlers = useMemo(
    () =>
      layoutedNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onCommentClick: handleNodeButtonClick,
        },
      })),
    [layoutedNodes]
  );

  /* ----------------------------------
   * React Flow state
   * ---------------------------------- */
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithHandlers);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // Sync nodes and edges when chapter data changes (fixes tab switching issue)
  const chaptersKey = chapters.map((c) => c._id).join(',');
  useEffect(() => {
    if (nodesWithHandlers.length > 0) {
      setNodes(nodesWithHandlers as IChapterNodeType[]);
      setEdges(layoutedEdges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chaptersKey]);

  /* ----------------------------------
   * Edge connect
   * ---------------------------------- */
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            type: 'chapterEdge',
            style: { stroke: 'lightgray', strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  /* ----------------------------------
   * Manual layout toggle
   * ---------------------------------- */
  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const { nodes: nextNodes, edges: nextEdges } = layout(nodes, edges, direction);

      setNodes(nextNodes as IChapterNodeType[]);
      setEdges(nextEdges);
    },
    [nodes, edges, layout, setNodes, setEdges]
  );

  /* ----------------------------------
   * Render guards (SAFE now)
   * ---------------------------------- */
  if (isStoryLoading || isTreeLoading) {
    return <StoryTreeLoading />;
  }

  if (storyError || treeError) {
    return (
      <div className="text-destructive flex h-full items-center justify-center">
        Failed to load story
      </div>
    );
  }

  if (!story) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Story not found
      </div>
    );
  }

  if (!chapters.length) {
    return <StoryTreeEmpty onCreateChapter={() => {}} />;
  }

  /* ----------------------------------
   * Render
   * ---------------------------------- */
  return (
    <section className="relative mx-auto h-[calc(100vh-106px)] w-full">
      <ReactFlowProvider>
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={75} minSize={50}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
              fitViewOptions={{ padding: 50 }}
              className="h-full w-full"
            >
              <Background gap={30} />
            </ReactFlow>
          </ResizablePanel>

          {openPanel && (
            <>
              <ResizableHandle />
              <ResizablePanel
                defaultSize={25}
                minSize={20}
                maxSize={40}
                className="border-muted m-1 rounded-2xl border shadow-lg"
              >
                {openPanel === 'comments' && <CommentsPanel onClose={() => setOpenPanel(null)} />}
                {openPanel === 'setting' && (
                  <StorySettingsPanel onClose={() => setOpenPanel(null)} />
                )}
                {openPanel === 'merge' && <MergeRequestPanel onClose={() => setOpenPanel(null)} />}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ReactFlowProvider>

      <LeftActionButtons onLayout={onLayout} setOpenStoryEditor={setOpenStoryEditor} />
      <TopActionButtons setOpenPanel={setOpenPanel} />
    </section>
  );
};

export default StoryTree;
