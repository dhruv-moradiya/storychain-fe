import { Button } from '@/components/ui/button';
import type { IChapterEdgeProps } from '@/type/story-canvas.type';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: IChapterEdgeProps) {
  const navigate = useNavigate();

  console.log('data :>> ', data);
  console.log('id :>> ', id);

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} />
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ cursor: 'pointer' }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'none',
          }}
        >
          <Button
            size="icon"
            variant="default"
            className="pointer-events-auto size-6 rounded-full shadow-md"
            onClick={() => {
              const parentId = id.split('-')[0];
              navigate(`/stories/${data?.storyId ?? 'root'}/chapter/${parentId}/new`);
              console.log('Add node between edge:', id);
            }}
          >
            <Plus size={10} />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
