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
import NodeHandle from "../../Shared/Handle";
import NodeBody from "../../Shared/Body";
import useAppState from "@/app/state/appState";
import NodeTitle from "../../Shared/Title";

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
  const { zenMode } = useAppState();
  const [hover, setHover] = React.useState(false);

  return (
    <div>
     
      <NodeTitle hover={hover} title="Whisper" zenMode={zenMode} />

     
      <NodeBody setHover={setHover} className="p-6">
        <FileAudioIcon size={32} />

       
        <NodeHandle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          id="audio"
          nodeId={nodeId}
        />

       
        <NodeHandle
          id="text"
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
});

WhisperNode.displayName = "WhisperNode";

export default WhisperNode;
