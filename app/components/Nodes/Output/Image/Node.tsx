import React, { memo, useState } from "react";
import { Handle, NodeProps, Position, useNodeId } from "reactflow";
import Image from "next/image";
import NodeHandle from "../../Shared/Handle";
import NodeBody from "../../Shared/Body";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";

const ImageOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const [hover, setHover] = useState(false);
  const { zenMode } = useAppState();

  return (
    <div>
      <NodeTitle hover={hover} zenMode={zenMode} title="Image Output" />

      <NodeBody setHover={setHover}>
        <NodeHandle
          type="target"
          id="image"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
        {data.input.image ? (
          <Image
            src={data.input.image}
            alt="Output Image"
            width={312}
            height={312}
          />
        ) : (
          <div className="w-80 h-56 flex flex-row items-center justify-center">
            {" "}
            No Image Found{" "}
          </div>
        )}

        <NodeHandle
          type="source"
          id="image"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
});

ImageOutputNode.displayName = "ImageOutputNode";

export default ImageOutputNode;
