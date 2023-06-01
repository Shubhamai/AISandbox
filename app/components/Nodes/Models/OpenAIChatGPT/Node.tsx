import React, { memo } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";

export const executeOpenAIChatGPTNode = (node: Node, previousNode: Node) => {
  node.data.output.text =
    "Here is the output from the model : " + previousNode.data.output.text;

  node.data.hasComputed = true;
  return node;
};

const OpenAIChatGPTNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="target"
        id="text"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div className="text-black">{data.label}</div>
      <Handle
        type="source"
        id="text"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

OpenAIChatGPTNode.displayName = "OpenAIChatGPTNode";

export default OpenAIChatGPTNode;
