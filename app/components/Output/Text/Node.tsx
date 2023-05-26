import React, { memo } from "react";
import { Handle, NodeProps, NodeToolbarProps, Position } from "reactflow";

const TextOutputNode = memo(({ data, isConnectable }: NodeProps) => {
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
