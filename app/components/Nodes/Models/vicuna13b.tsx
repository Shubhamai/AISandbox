import { MessagesSquareIcon, Trash2 } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../Shared/Body";
import NodeHandle from "../Shared/Handle";
import NodeExecutionTime from "../Shared/ExecutionTime";

export const executeVicuna13BNode = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const dataJSON = await fetch("/api/replicatellm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_url:
        "replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b",
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

const Vicuna13B = ({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const { zenMode, showStats } = useAppState();
  const nodeId = useNodeId() || ""; // TODO : Fix this

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="Vicuna 13b" zenMode={zenMode} />

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

export default memo(Vicuna13B);
