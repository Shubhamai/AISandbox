import { DragEvent } from "react";

const ToolBarItem = (props: any) => {
  const nodesData = props.nodesData;

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      {Object.keys(nodesData).map((key) => (
        <div
          className={`dndnode input ${key} rounded-full hover:cursor-grab`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          {nodesData[key].icon}
        </div>
      ))}
    </div>
  );
};

export default ToolBarItem;
