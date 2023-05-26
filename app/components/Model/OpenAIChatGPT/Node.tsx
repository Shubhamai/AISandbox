import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const OpenAIChatGPTNode = memo(({ data, isConnectable } : NodeProps) => {
  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div className="text-black">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

OpenAIChatGPTNode.displayName = "OpenAIChatGPTNode";

export default OpenAIChatGPTNode;
