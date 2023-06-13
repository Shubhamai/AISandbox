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

const RectangleTool = ({ data, isConnectable, selected }: NodeProps) => {
  const divRef = useRef();
  // const [h, setH] = useState(20);
  // console.log(w, h);

  return (
    <div
      ref={divRef}
      className={`border-[4px] border-solid border-foreground`}
      style={{
        width: `200px`,
        height: `200px`,
      }}
    >
      <NodeResizer
        color="#000000"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
        onResize={(e) => {
          if (divRef.current) {
            divRef.current.style.width = `${e.x + 5}px`;
            divRef.current.style.height = `${e.y + 5}px`;
          }

          // setW(e.x);
          // setH(e.y);
        }}
      />
    </div>
  );
};

export default memo(RectangleTool);
