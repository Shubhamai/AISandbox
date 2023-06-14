import useAppState from "@/app/state/appState";
import {
  FileAudio,
  FileAudioIcon,
  FileVolume2,
  MessagesSquareIcon,
  View,
} from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import NodeTitle from "../../Shared/Title";
import NodeBody from "../../Shared/Body";
import NodeHandle from "../../Shared/Handle";
import NodeExecutionTime from "../../Shared/ExecutionTime";

export const executeTortoiseTTSNode = async (
  node: Node,
  previousNode: Node
) => {
  const dataJSON = await fetch("/api/tortoisetts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: previousNode.data.output.text }),
  });

  const data = await dataJSON.json();

  node.data.output.audio = data.audio;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

const TortoiseTTSNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);
  const { zenMode } = useAppState();
  const nodeId = useNodeId() || ""; // TODO : Fix this

  return (
    <div>
      <NodeTitle hover={hover} title="TTS" zenMode={zenMode} />

      <NodeBody setHover={setHover} className="p-6">
        <FileVolume2 strokeWidth={1} size={32} />

        <NodeHandle
          type="target"
          position={Position.Left}
          id="text"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />

        <NodeHandle
          type="source"
          position={Position.Right}
          id="audio"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
      {/* <NodeExecutionTime showStats={showStats} data={data} /> */}
    </div>
  );
});

TortoiseTTSNode.displayName = "TortoiseTTSNode";

export default TortoiseTTSNode;
