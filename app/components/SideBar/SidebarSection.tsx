import { DragEvent } from "react";

const SidebarSection = (props: any) => {
  const nodesData = props.nodesData;

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
      {Object.keys(nodesData).map((key) => (
        <div
          className={`dndnode input ${key} h-fit w-full rounded-md flex flex-row items-center gap-2 p-3 border-[1px] border-solid border-background transition hover:border-background/50 hover:cursor-pointer hover:shadow-md hover:-translate-y-1 focus:border-background active:shadow-sm active:translate-y-1`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          <div className="text-foreground">{nodesData[key].icon}</div>
          <div>
            <h6 className="text-sm font-semibold text-foreground">
              {nodesData[key].name}
            </h6>
            <p className="text-xs text-foreground/50 leading-4 overflow-hidden line-clamp-2">
              {nodesData[key].description}.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSection;
