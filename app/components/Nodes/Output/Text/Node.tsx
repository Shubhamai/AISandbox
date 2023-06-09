import React, { memo, useEffect, useState } from "react";
import { Handle, NodeProps, NodeToolbarProps, Position } from "reactflow";

const TextOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const outputData = data.output.text || "Sample Output";

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">Text Output</h1>
      </div>

      <div
        className="bg-white flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Handle
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          type="target"
          id="text"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <div className="text-slate-600 min-w-[200px] max-w-[350px] min-h-[80px] p-2 break-words">{outputData}</div>
        <Handle
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          type="source"
          id="text"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

TextOutputNode.displayName = "TextOutputNode";

export default TextOutputNode;
