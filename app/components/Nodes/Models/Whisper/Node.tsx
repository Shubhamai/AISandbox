import { FileAudioIcon, MessagesSquareIcon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const executeWhisperNode = async (node: Node, previousNode: Node) => {
  const newForm = new FormData();
  newForm.append("model", "whisper-1");

  newForm.append("file", previousNode.data.output.audio, "audio.webm");

  const response = await axios.post("/api/whisper", newForm);

  node.data.output.text = response.data.text;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

const WhisperNode = memo(({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; // TODO : Fix this

  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-foreground">Whisper</h1>
      </div>

      <div
        className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative p-6"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FileAudioIcon size={32} />

        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          position={Position.Left}
          id="audio"
          isConnectable={isConnectable}
        />

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Handle
                className="!bg-foreground/50 !border-none"
                type="source"
                position={Position.Right}
                id="text"
                isConnectable={isConnectable}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{nodeId}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
});

WhisperNode.displayName = "WhisperNode";

export default WhisperNode;
