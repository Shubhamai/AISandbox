import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { FileAudioIcon, MessagesSquareIcon, View } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeHandle from "../Shared/Handle";
import NodeBody from "../Shared/Body";
import NodeTitle from "../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeExecutionTime from "../Shared/ExecutionTime";

const YoloXNode = ({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; 
  const [hover, setHover] = React.useState(false);
  const { zenMode, showStats } = useAppState();

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="YoloX" zenMode={zenMode} />
      <NodeBody setHover={setHover} className="p-6">
        <View strokeWidth={1} size={32} />

        <NodeHandle
          type="target"
          id="image"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <NodeHandle
          type="source"
          id="text"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
      <NodeExecutionTime showStats={showStats} data={data} />
    </div>
  );
};

export default memo(YoloXNode);
