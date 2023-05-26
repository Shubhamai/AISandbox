import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const TextOutputNode = memo(({ data, isConnectable }) => {
  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>
    </div>
  );
});

TextOutputNode.displayName = "TextOutputNode";

export default TextOutputNode;
