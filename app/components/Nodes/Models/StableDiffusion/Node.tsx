import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const StableDiffusionNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-white rounded-md p-2 relative">
      <Handle
        type="target"
        key="0"
        id="0"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          top: "calc(50% + -5px)",
        }}
      />
      <Handle
        type="target"
        key="1"
        id="1"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          top: "calc(50% + 5px)",
        }}
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

StableDiffusionNode.displayName = "StableDiffusionNode";

export default StableDiffusionNode;
