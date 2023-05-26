import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const TextInputNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>
      <input
        className="border-2 border-black text-slate-900 h-24"
        type="text"
      />
    </div>
  );
});

TextInputNode.displayName = "TextInputNode";

export default TextInputNode;
