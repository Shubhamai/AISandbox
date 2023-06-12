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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoxSelect, MoveDiagonal2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import useAppState from "@/app/state/appState";
import NodeHandle from "../../Shared/Handle";
import NodeTitle from "../../Shared/Title";
import NodeBody from "../../Shared/Body";

const TextInputNode = memo(({ data, isConnectable, selected }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  const { zenMode } = useAppState();

  return (
    <div>
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
});

TextInputNode.displayName = "TextInputNode";

export default TextInputNode;
