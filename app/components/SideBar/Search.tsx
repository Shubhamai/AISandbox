import allNodes, { allNodesData } from "@/app/components/Nodes/nodeTypes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { outputNodesData } from "../Nodes/Output/outputs";
import { DragEvent } from "react";

type SideBarSearchProps = {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
};

const SideBarSearch = (props: SideBarSearchProps) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Command
      className="rounded-lg border shadow-md"
      // onBlur={(e) => {
      //   // console.log(e.nativeEvent.target?.classList?.contains?.("dndnode"));
      //   props.setIsFocused(false);
      // }}
    >
      <CommandInput
        onFocus={() => {
          props.setIsFocused(true);
        }}
        placeholder="Search your nodes..."
      />
      {props.isFocused ? (
        <CommandList className="overflow-y-scroll  scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-background border-[1px]">
          <CommandEmpty>No Nodes found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {Object.keys(allNodesData).map((key) => (
              <CommandItem
                key={key}
                className="dndnode aria-selected:bg-transparent aria-selected:"
              >
                <div
                  className={`dndnode input ${key} h-fit w-full rounded-md flex flex-row items-center gap-2 p-3 border-[1px] hover:shadow-xl border-solid border-foreground/1`}
                  key={key}
                  onDragStart={(event) => onDragStart(event, key)}
                  draggable
                >
                  <div className="dndnode text-foreground">
                    {allNodesData[key as keyof typeof allNodesData].icon}
                  </div>
                  <div>
                    <h6 className="dndnode text-sm font-semibold text-foreground">
                      {allNodesData[key as keyof typeof allNodesData].name}
                    </h6>
                    <p className="dndnode text-xs text-foreground/50 leading-4 overflow-hidden line-clamp-2">
                      {
                        allNodesData[key as keyof typeof allNodesData]
                          .description
                      }
                      .
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      ) : (
        <></>
      )}
    </Command>
  );
};

export default SideBarSearch;
