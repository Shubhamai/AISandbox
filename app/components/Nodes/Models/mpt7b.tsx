import { MessagesSquareIcon, Trash2 } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../Shared/Body";
import NodeHandle from "../Shared/Handle";
import NodeExecutionTime from "../Shared/ExecutionTime";


const Mpt7b = ({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const { zenMode, showStats } = useAppState();
  const nodeId = useNodeId() || ""; // TODO : Fix this

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="Mpt 7b" zenMode={zenMode} />

      <NodeBody setHover={setHover} className="p-6 w-fit">
        <NodeHandle
          type="target"
          position={Position.Left}
          id="text"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <MessagesSquareIcon strokeWidth={1} size={32} />

        <NodeHandle
          type="source"
          position={Position.Right}
          id="text"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>

      <NodeExecutionTime showStats={showStats} data={data} />
    </div>
  );
};

export default memo(Mpt7b);
