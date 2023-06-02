import React, { memo } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";

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
  return (
    <div className="bg-white rounded-md p-2 relative">
      <Handle
        type="target"
        id="image"
        key="image"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          top: "calc(50% + -5px)",
        }}
      />
      <Handle
        type="target"
        id="text"
        key="text"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          top: "calc(50% + 5px)",
        }}
      />

      <div className="text-black">{data.label}</div>
      <Handle
        type="source"
        id="image"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

StableDiffusionNode.displayName = "StableDiffusionNode";

export default StableDiffusionNode;
