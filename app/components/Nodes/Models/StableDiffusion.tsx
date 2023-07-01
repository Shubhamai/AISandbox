import useAppState from "@/app/state/appState";
import { Brush, Hexagon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../Shared/Title";
import NodeBody from "../Shared/Body";
import NodeHandle from "../Shared/Handle";
import NodeExecutionTime from "../Shared/ExecutionTime";

export const executeStableDiffusionNode = async (
  node: Node,
  previousNode: Node
) => {
  let startTime = performance.now();

  const dataJSON = await fetch("/api/stablediffusion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: previousNode.data.output.text }),
  });

  const data = await dataJSON.json();
  let endTime = performance.now();

  node.data.output.image = data.image;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

const StableDiffusionNode = ({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const nodeId = useNodeId() || ""; // TODO : Fix this

  const { zenMode } = useAppState();

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="Stable Diffusion" zenMode={zenMode} />
      <NodeBody setHover={setHover} className="p-6">
        <NodeHandle
          type="target"
          id="text"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <Brush strokeWidth={1} size={36} />

        <NodeHandle
          type="source"
          id="image"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
      {/* <NodeExecutionTime showStats={showStats} data={data} /> */}
    </div>
  );
};

export default memo(StableDiffusionNode);
