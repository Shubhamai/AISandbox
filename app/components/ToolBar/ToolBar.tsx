import ReactFlow, { Background, Panel } from "reactflow";
import Image from "next/image";
import { DragEvent } from "react";

const ToolBar = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel
      position="bottom-center"
      className="flex items-center justify-between gap-3 mx-auto"
    >
      <button className="bg-slate-600 text-white font-bold py-2 px-4 rounded">
        <Image src="/play.svg" width={20} height={20} alt="Run Inference" />
      </button>
      <aside className="flex gap-3">
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "TextInputNode")}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "OpenAIChatGPTNode")}
          draggable
        >
          Model Node
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "TextOutputNode")}
          draggable
        >
          Output Node
        </div>
      </aside>
    </Panel>
  );
};

export default ToolBar;
