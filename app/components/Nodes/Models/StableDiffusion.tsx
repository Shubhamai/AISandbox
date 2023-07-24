import useAppState from "@/app/state/appState";
import { Brush, Hexagon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../Shared/Title";
import NodeBody from "../Shared/Body";
import NodeHandle from "../Shared/Handle";
import NodeExecutionTime from "../Shared/ExecutionTime";


const StableDiffusionNode = ({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const nodeId = useNodeId() || ""; 

  const { zenMode } = useAppState();

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="Stable Diffusion" zenMode={zenMode} />
      <NodeBody setHover={setHover} className="p-6">
        <NodeHandle
          type="target"
          id="text"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <Brush strokeWidth={1} size={36} />

        <NodeHandle
          type="source"
          id="image"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
      {/* <NodeExecutionTime showStats={showStats} data={data} /> */}
    </div>
  );
};

export default memo(StableDiffusionNode);
