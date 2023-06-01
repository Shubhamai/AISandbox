import React, { memo, useEffect } from "react";
import { Handle, NodeProps, NodeToolbarProps, Position } from "reactflow";

const TextOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const outputData = data.output.text;

  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="target"
        id="text"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>
      <div className="text-slate-600">{outputData}</div>
      <Handle
        type="source"
        id="text"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

TextOutputNode.displayName = "TextOutputNode";

export default TextOutputNode;
