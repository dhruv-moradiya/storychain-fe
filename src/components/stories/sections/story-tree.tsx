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
import { getLayoutedElements } from '../flow-layout';
import { initialEdges, initialNodes } from '../initialData';
import { useCallback, useState } from 'react';
import type { CustomNodeType } from '@/type/flow.type';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { edgeTypes, nodeTypes } from '../flowConfig';
import CommentsPanel from '../panels/comments/CommentsPanel';
import StorySettingsPanel from '../panels/setting/StorySettingsPanel';
import MergeRequestPanel from '../panels/MergeRequest/MergeRequestPanel';
import '@xyflow/react/dist/style.css';
import LeftActionButtons from '../action-buttons/left-action-buttons';
import TopActionButtons from '../action-buttons/top-action-buttons';

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const StoryTree = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [openStoryEditor, setOpenStoryEditor] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeButtonClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setOpenPanel('comment');
  };

  const nodesWithHandler = layoutedNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onCommentClick: handleNodeButtonClick,
    },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithHandler as CustomNodeType[]);

  const onConnect = (connection: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          animated: true,
          // style: { stroke: "#3b82f6", strokeWidth: 2 },
          // type: "smoothstep",
          style: { stroke: 'lightgray', strokeWidth: 2 },
          type: 'smoothstep',
        },
        eds
      )
    );
  };

  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );
      setNodes([...(layoutedNodes as CustomNodeType[])]);
      setEdges([...layoutedEdges]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes, edges]
  );

  return (
    <section className="relative mx-auto h-[calc(100vh-106px)] w-full max-w-[100%]">
      {/* 80px → your navbar height (adjust) */}

      <ReactFlowProvider>
        {/* IMPORTANT: give full height to panel group */}
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={75} minSize={50} className="h-full">
            <div className="h-full w-full">
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
            </div>
          </ResizablePanel>

          {openPanel && (
            <>
              <ResizableHandle className="!bg-transparent" />
              <ResizablePanel
                defaultSize={25}
                minSize={20}
                maxSize={40}
                className="border-muted m-1 h-full rounded-2xl border shadow-lg"
              >
                {openPanel === 'comments' ? (
                  <CommentsPanel onClose={() => setOpenPanel(null)} />
                ) : openPanel === 'setting' ? (
                  <StorySettingsPanel onClose={() => setOpenPanel(null)} />
                ) : openPanel === 'merge' ? (
                  <MergeRequestPanel onClose={() => setOpenPanel(null)} />
                ) : null}
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
