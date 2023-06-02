import graphState from "@/app/state/graphState";
import React, { memo, useEffect } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";

const ImageInputNode = memo(({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="source"
        position={Position.Right}
        id="image"
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>
      <Input
        className="border-2 border-black text-slate-900 h-24"
        type="text"
        onChange={(e) =>
          updateNodeData(nodeId, {
            output: { image: e.target.value },
          })
        }
      />
      An image input node
    </div>
  );
});

ImageInputNode.displayName = "ImageInputNode";

export default ImageInputNode;
