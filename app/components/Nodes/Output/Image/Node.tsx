import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const ImageOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="text-black">An output image</div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

ImageOutputNode.displayName = "ImageOutputNode";

export default ImageOutputNode;
