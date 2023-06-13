import useAppState from "@/app/state/appState";
import { Brush, Hexagon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../../Shared/Title";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";
import NodeExecutionTime from "../../Shared/ExecutionTime";

export const executeStableDiffusionNode = (
  node: Node,
  previousNodes: Node[]
) => {
  let image;
  let text;
  for (const prevNode of previousNodes) {
    if (prevNode.data.output.image) {
      image = prevNode.data.output.image;
    }
    if (prevNode.data.output.text) {
      text = prevNode.data.output.text;
    }
  }
  node.data.hasComputed = true;
  node.data.output.image = "Output Image : " + image + "__" + text;
  return node;
};

const StableDiffusionNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const nodeId = useNodeId() || ""; // TODO : Fix this

  const { zenMode } = useAppState();

  return (
    <div>
      <NodeTitle hover={hover} title="SD" zenMode={zenMode} />
      <NodeBody setHover={setHover} className="p-6">
        <NodeHandle
          type="target"
          id="image"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
          style={{
            top: "calc(50% + -20px)",
          }}
        />

        <NodeHandle
          type="target"
          id="text"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
          style={{
            top: "calc(50% + 20px)",
          }}
        />

        <Brush size={36} />

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
});

StableDiffusionNode.displayName = "StableDiffusionNode";

export default StableDiffusionNode;
