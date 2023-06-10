import { MessagesSquareIcon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";

export const executeOpenAIChatGPTNode = async (
  node: Node,
  previousNode: Node
) => {
  const dataJSON = await fetch("/api/chatgpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: previousNode.data.output.text }),
  });

  const data = await dataJSON.json();

  node.data.output.text = data.data;
  node.data.hasComputed = true;
  return node;
};

const OpenAIChatGPTNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">GPT4</h1>
        {/* <p className="text-sm text-slate-600">Text Input</p> */}
      </div>

      <div
        className="bg-white flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative p-6"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Handle
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          type="target"
          position={Position.Left}
          id="text"
          isConnectable={isConnectable}
        />

        <MessagesSquareIcon size={32} />

        <Handle
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          type="source"
          position={Position.Right}
          id="text"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

OpenAIChatGPTNode.displayName = "OpenAIChatGPTNode";

export default OpenAIChatGPTNode;
