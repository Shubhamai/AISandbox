import { Panel } from "reactflow";
import nodeTypes, {
  inputNodes,
  outputNodes,
  modelNodes,
} from "@/app/state/nodeTypes";
import { DragEvent } from "react";
import { Separator } from "@radix-ui/react-context-menu";

const SideBar = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel
      position="top-left"
      className="flex flex-col items-center justify-between w-[200px] px-6 py-4 bg-white shadow-lg"
      style={{ margin: 0, top: 72, height: "calc(100vh - 72px)" }}
    >
      {Object.keys(inputNodes).map((key) => (
        <div
          className={`dndnode input ${key}`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          {key}
        </div>
      ))}
      {Object.keys(modelNodes).map((key) => (
        <div
          className={`dndnode model ${key}`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          {key}
        </div>
      ))}
      {Object.keys(outputNodes).map((key) => (
        <div
          className={`dndnode output ${key}`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          {key}
        </div>
      ))}
    </Panel>
  );
};

export default SideBar;
