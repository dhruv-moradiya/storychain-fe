import type { CustomEdge } from "@/type/flow.type";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps<CustomEdge>) {
  const [isHovered, setIsHovered] = useState(false);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: "pointer" }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "none",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button
            size="icon"
            variant="default"
            className="size-6 rounded-full shadow-md pointer-events-auto"
            onClick={() => {
              console.log("Add node between edge:", id);
            }}
          >
            <Plus size={10} />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
