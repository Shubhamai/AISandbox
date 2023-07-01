import { Dog, MessagesSquareIcon, Trash2 } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../Shared/Body";
import NodeHandle from "../Shared/Handle";
import NodeExecutionTime from "../Shared/ExecutionTime";

export const executeDollyV2Node = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const dataJSON = await fetch("/api/replicatellm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_url:
        "replicate/dolly-v2-12b:ef0e1aefc61f8e096ebe4db6b2bacc297daf2ef6899f0f7e001ec445893500e5",
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

const DollyV2 = ({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const { zenMode, showStats } = useAppState();
  const nodeId = useNodeId() || ""; // TODO : Fix this

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="DollyV2 12b" zenMode={zenMode} />

      <NodeBody setHover={setHover} className="p-6 w-fit">
        <NodeHandle
          type="target"
          position={Position.Left}
          id="text"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <Dog strokeWidth={1} size={32} />

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

export default memo(DollyV2);
