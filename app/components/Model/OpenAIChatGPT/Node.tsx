import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const OpenAIChatGPT = memo(({ data, isConnectable }) => {
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

OpenAIChatGPT.displayName = "OpenAIChatGPT";

export default OpenAIChatGPT;
