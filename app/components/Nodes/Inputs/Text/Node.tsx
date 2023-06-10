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
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

const TextInputNode = memo(({ data, isConnectable, selected }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  return (
    <div>
      {/* <NodeResizeControl
        color="#ff0071"
        // isVisible={selected}
        // lineStyle={{ borderWidth: 10 }}
        minWidth={100}
        minHeight={100}
      >
        <MoveDiagonal2 />
      </NodeResizeControl> */}
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">Text Input</h1>
        {/* <p className="text-sm text-slate-600">Text Input</p> */}
      </div>

      <div
        className="bg-white flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Textarea
          className="resize-none border-transparent focus:border-transparent focus:ring-0 "
          placeholder="Input text"
          onChange={(e) =>
            updateNodeData(nodeId, { output: { text: e.target.value } })
          }
        >
          {data.output.text}
        </Textarea>

        <div className="flex justify-between items-center gap-2 h-full">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Handle
                  className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
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
          <div />
        </div>
      </div>
    </div>
  );
});

TextInputNode.displayName = "TextInputNode";

export default TextInputNode;
