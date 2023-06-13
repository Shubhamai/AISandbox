import { MessagesSquareIcon, Trash2 } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";
import NodeExecutionTime from "../../Shared/ExecutionTime";

export const executeOpenAIChatGPTNode = async (
  node: Node,
  previousNode: Node
) => {
  let startTime = performance.now();

  const dataJSON = await fetch("/api/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: previousNode.data.output.text }),
  });

  let endTime = performance.now();

  const data = await dataJSON.json();

  node.data.output.text = data.data;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true;
  return node;
};

const OpenAIChatGPTNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const { zenMode, showStats } = useAppState();
  const nodeId = useNodeId() || ""; // TODO : Fix this

  return (
    <div>
      <NodeTitle hover={hover} title="GPT4" zenMode={zenMode} />

      <NodeBody setHover={setHover} className="p-6">
        <NodeHandle
          type="target"
          position={Position.Left}
          id="text"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <MessagesSquareIcon size={32} />

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
});

OpenAIChatGPTNode.displayName = "OpenAIChatGPTNode";

export default OpenAIChatGPTNode;
