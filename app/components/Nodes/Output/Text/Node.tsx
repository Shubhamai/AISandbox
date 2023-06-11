import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeToolbarProps,
  Position,
  useNodeId,
} from "reactflow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TextOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = useState(false);
  const nodeId = useNodeId() || ""; // TODO : Fix this

  const outputData = data.output.text || "Sample Output";

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-foreground">Text Output</h1>
      </div>

      <div
        className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          id="text"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <div className="text-foreground min-w-[200px] max-w-[350px] min-h-[80px] p-2 break-words">
          {outputData}
        </div>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Handle
                className="!bg-foreground/50 !border-none"
                type="source"
                id="text"
                position={Position.Right}
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

TextOutputNode.displayName = "TextOutputNode";

export default TextOutputNode;
