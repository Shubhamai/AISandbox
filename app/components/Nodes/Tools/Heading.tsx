import { Textarea } from "@/components/ui/textarea";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizer,
  NodeToolbarProps,
  Position,
  useNodeId,
} from "reactflow";

const HeadingTool = ({ data, isConnectable, selected }: NodeProps) => {
  const [w, setW] = useState(0);
  const divRef = useRef<HTMLDivElement>();

  return (
    <div className="bg-transparent">
      <NodeResizer
        color="#000000"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
        onResize={(e) => {
          setW(e.x);
        }}
      />
      <input
        style={{ fontSize: `${w * 0.1 || 20}px` }}
        className={`text-foreground bg-transparent border-[0px] focus-visible:ring-0 focus-visible:ring-ring w-full h-full`}
        placeholder="Heading"
      />
    </div>
  );
};

export default memo(HeadingTool);
