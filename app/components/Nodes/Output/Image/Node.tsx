import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import Image from "next/image";

const ImageOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="bg-white rounded-md p-1">
      <Handle
        className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
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
        className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
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
