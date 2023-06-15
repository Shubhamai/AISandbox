import { MessagesSquareIcon, Trash2 } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";
import NodeExecutionTime from "../../Shared/ExecutionTime";

export const executeMpt7bNode = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const dataJSON = await fetch("/api/replicatellm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_url:
        "replicate/mpt-7b-storywriter:a38b8ba0d73d328040e40ecfbb2f63a938dec8695fe15dfbd4218fa0ac3e76bf",
      text: previousNode.data.output.text,
    }),
  });

  let endTime = performance.now();

  const data = await dataJSON.json();

  node.data.output.text = data.text;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true;
  return node;
};

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
