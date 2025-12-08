import CustomCardNode from "@/components/nodes/custom-card-node";
import { CustomEdge } from "../nodes/custom-edge";

export const nodeWidth = 288;
export const nodeHeight = 175;

export const nodeTypes = {
  customCard: CustomCardNode,
};

export const edgeTypes = {
  smoothstep: CustomEdge,
};
