import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import Image from "next/image";

const ImageOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-background rounded-md p-1">
      <Handle
        className="!bg-foreground/50 !border-none"
        type="target"
        id="image"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      {data.input.image ? (
        <Image
          src={data.input.image}
          alt="Output Image"
          width={312}
          height={312}
        />
      ) : (
        <div></div>
      )}
      <Handle
        className="!bg-foreground/50 !border-none"
        type="source"
        id="image"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

ImageOutputNode.displayName = "ImageOutputNode";

export default ImageOutputNode;
