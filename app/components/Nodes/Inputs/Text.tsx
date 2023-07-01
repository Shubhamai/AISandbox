import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizeControl,
  NodeResizer,
  Position,
} from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { BoxSelect, MoveDiagonal2 } from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import useAppState from "@/app/state/appState";
import NodeHandle from "../Shared/Handle";
import NodeTitle from "../Shared/Title";
import NodeBody from "../Shared/Body";

const TextInputNode = ({ data, isConnectable, selected }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  const { zenMode } = useAppState();

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} zenMode={zenMode} title="Text Input" />

      <NodeBody setHover={setHover}>
        <Textarea
          className="resize-none border-transparent focus:border-transparent focus:ring-0 "
          placeholder="Input text"
          onChange={(e) =>
            updateNodeData(nodeId, { output: { text: e.target.value } })
          }
        >
          {data.output.text}
        </Textarea>
        <NodeHandle
          type="source"
          position={Position.Right}
          id="text"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
};

export default memo(TextInputNode);
