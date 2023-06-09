import { FileAudioIcon, MessagesSquareIcon, View } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";

export const executeYoloXNode = async (node: Node, previousNode: Node) => {
  // const newForm = new FormData();
  // newForm.append("file", previousNode.data.output.image);
  // const response = await axios.post("/api/yolox", newForm);

  const dataJSON = await fetch("/api/yolox", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image : previousNode.data.output.image }),
  });

  const data = await dataJSON.json();

  node.data.output.text = data.text;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

const YoloXNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">YoloX</h1>
      </div>

      <div
        className="bg-white flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative p-6"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <View size={32} />

        <Handle
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          type="target"
          position={Position.Left}
          id="image"
          isConnectable={isConnectable}
        />

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

YoloXNode.displayName = "YoloXNode";

export default YoloXNode;
