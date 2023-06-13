import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileAudioIcon, MessagesSquareIcon, View } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeHandle from "../../Shared/Handle";
import NodeBody from "../../Shared/Body";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeExecutionTime from "../../Shared/ExecutionTime";

export const executeYoloXNode = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const dataJSON = await fetch("/api/yolox", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: previousNode.data.output.image }),
  });

  const data = await dataJSON.json();
  let endTime = performance.now();

  node.data.output.text = data.text;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

const YoloXNode = memo(({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const [hover, setHover] = React.useState(false);
  const { zenMode, showStats } = useAppState();

  return (
    <div>
      <NodeTitle hover={hover} title="YoloX" zenMode={zenMode} />
      <NodeBody setHover={setHover} className="p-6">
        <View size={32} />

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
});

YoloXNode.displayName = "YoloXNode";

export default YoloXNode;
