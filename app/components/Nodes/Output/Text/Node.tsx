import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeToolbarProps,
  Position,
  useNodeId,
} from "reactflow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";

const TextOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = useState(false);
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const { zenMode } = useAppState();
  const outputData = data.output.text || "Sample Output";

  return (
    <div>
   
      <NodeTitle hover={hover} title="Text Output" zenMode={zenMode} />

   
      <NodeBody setHover={setHover}>
      
        <NodeHandle
          type="target"
          id="text"
          position={Position.Left}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
        <div className="text-foreground min-w-[200px] max-w-[350px] min-h-[80px] p-2 break-words">
          {outputData}
        </div>

   
        <NodeHandle
          type="source"
          id="text"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
});

TextOutputNode.displayName = "TextOutputNode";

export default TextOutputNode;
