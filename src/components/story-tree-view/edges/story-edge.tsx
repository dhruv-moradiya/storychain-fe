import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import type { StoryEdgeProps } from '../story-tree-view.types';

export function StoryEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: StoryEdgeProps) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  const isMostReadPath = data?.isMostReadPath ?? false;

  return (
    <>
      {/* SVG Defs for gradients */}
      <defs>
        <linearGradient id="storyEdgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6b7cff" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="mostReadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff9f68" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#6b7cff" />
        </linearGradient>
      </defs>

      {/* Glow effect */}
      <path
        d={path}
        fill="none"
        stroke={isMostReadPath ? 'url(#mostReadGradient)' : 'url(#storyEdgeGradient)'}
        strokeWidth={isMostReadPath ? 8 : 5}
        strokeOpacity={isMostReadPath ? 0.3 : 0.12}
        style={{ filter: 'blur(3px)' }}
      />

      {/* Main edge */}
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: isMostReadPath ? 'url(#mostReadGradient)' : 'url(#storyEdgeGradient)',
          strokeWidth: isMostReadPath ? 3 : 2,
          strokeLinecap: 'round',
        }}
      />

      {/* Animated dot for most read path */}
      {isMostReadPath && (
        <circle r={3} fill="#ff9f68">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={path} />
        </circle>
      )}
    </>
  );
}
