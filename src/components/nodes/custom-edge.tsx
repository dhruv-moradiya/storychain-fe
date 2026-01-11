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

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 12,
  });

  return (
    <>
      {/* Subtle glow effect */}
      <path
        d={path}
        fill="none"
        stroke="url(#edgeGradient)"
        strokeWidth={6}
        strokeOpacity={0.15}
        style={{ filter: 'blur(3px)' }}
      />

      {/* Main edge with gradient */}
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: 'url(#edgeGradient)',
          strokeWidth: 2,
          strokeLinecap: 'round',
        }}
      />

      {/* Invisible wider path for easier interaction */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ cursor: 'pointer' }}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6b7cff" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

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
            className="from-brand-blue to-brand-pink-500 pointer-events-auto size-6 rounded-full border-2 border-white bg-gradient-to-br shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
            onClick={() => {
              const parentId = id.split('-')[0];
              navigate(`/stories/${data?.storyId ?? 'root'}/chapter/${parentId}/new`);
            }}
          >
            <Plus size={10} className="text-white" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
