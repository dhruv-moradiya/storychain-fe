import {
  ReactFlow,
  Background,
  ConnectionLineType,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from '@xyflow/react';
import { ResizablePanel } from '@/components/ui/resizable';
import {
  edgeTypes,
  nodeTypes,
  type IChapterEdge,
  type IChapterNodeType,
} from '@/type/story-canvas.type';

interface Props {
  nodes: IChapterNodeType[];
  edges: IChapterEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

const StoryTreeCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }: Props) => {
  return (
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
  );
};

export default StoryTreeCanvas;
