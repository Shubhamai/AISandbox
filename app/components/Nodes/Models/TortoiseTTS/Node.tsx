import {
  FileAudio,
  FileAudioIcon,
  FileVolume2,
  MessagesSquareIcon,
  View,
} from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";

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

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-foreground">TTS</h1>
      </div>

      <div
        className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative p-6"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FileVolume2 size={32} />

        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          position={Position.Left}
          id="text"
          isConnectable={isConnectable}
        />

        <Handle
          className="!bg-foreground/50 !border-none"
          type="source"
          position={Position.Right}
          id="audio"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

TortoiseTTSNode.displayName = "TortoiseTTSNode";

export default TortoiseTTSNode;
