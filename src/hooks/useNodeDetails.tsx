import { useReactFlow } from "@xyflow/react";
import { useMemo } from "react";

export function useNodeDetails(nodeId: string) {
  const { getNodes, getEdges } = useReactFlow();

  const node = useMemo(
    () => getNodes().find((n) => n.id === nodeId),
    [getNodes, nodeId]
  );

  const incomingEdges = useMemo(
    () => getEdges().filter((edge) => edge.target === nodeId),
    [getEdges, nodeId]
  );

  const outgoingEdges = useMemo(
    () => getEdges().filter((edge) => edge.source === nodeId),
    [getEdges, nodeId]
  );

  const connectedNodeIds = useMemo(() => {
    const connectedIds = new Set();
    incomingEdges.forEach((edge) => connectedIds.add(edge.source));
    outgoingEdges.forEach((edge) => connectedIds.add(edge.target));
    return Array.from(connectedIds);
  }, [incomingEdges, outgoingEdges]);

  return {
    node,
    incomingEdges,
    outgoingEdges,
    connectedNodeIds,
  };
}
