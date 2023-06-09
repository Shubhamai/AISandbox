import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizeControl,
  NodeResizer,
  Position,
} from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoxSelect, MoveDiagonal2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const TextInputNode = memo(({ data, isConnectable, selected }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  return (
    <div>
      {/* <NodeResizeControl
        color="#ff0071"
        // isVisible={selected}
        // lineStyle={{ borderWidth: 10 }}
        minWidth={100}
        minHeight={100}
      >
        <MoveDiagonal2 />
      </NodeResizeControl> */}
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">Text Input</h1>
        {/* <p className="text-sm text-slate-600">Text Input</p> */}
      </div>

      <div
        className="bg-white flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Textarea
          className="resize-none border-transparent focus:border-transparent focus:ring-0"
          placeholder="Input text"
          onChange={(e) =>
            updateNodeData(nodeId, { output: { text: e.target.value } })
          }
        />

        <div className="flex justify-between items-center gap-2 h-full">
          {/* <div className="border-[1px] border-solid border-slate-200 flex-1" /> */}
          <Handle
            className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
            type="source"
            position={Position.Right}
            id="text"
            isConnectable={isConnectable}
            // style={{ transform: "scale(1.4)" }}
          />
          <div />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-white flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200">
  //     <div className="flex items-center p-2 bg-slate-50 border-b-2 border-slate-100 border-solid">
  //       <div className="text-slate-700 text-sm">{data.label}</div>
  //     </div>

  //     {/* <input
  //       className="border-2 border-black text-slate-900 h-24"
  //       type="text"
  //       onChange={(e) => updateNodeData(nodeId, { input_data: e.target.value })}
  //     /> */}

  //     <div className="flex flex-col gap-1 px-2 pb-2">
  //       <p className="text-xs lowercase text-slate-500">INPUTS</p>

  //       <div className="">
  //         {/* <Label htmlFor="text-input-bar">Input Text</Label> */}
  //         <Input
  //           name="text-input-bar"
  //           type="text"
  //           placeholder="text"
  //           onChange={(e) =>
  //             updateNodeData(nodeId, { output: { text: e.target.value } })
  //           }
  //         />
  //       </div>
  //     </div>

  //     <div className="border-t-2 border-solid border-slate-100 " />

  //     <div className="flex flex-col gap-3 px-2 pb-2">
  //       <p className="text-xs lowercase text-slate-500">OUTPUTS</p>

  //       <div className="relative flex justify-between items-center gap-2">
  //         <p className="flex gap-1 items-center text-sm text-slate-600">
  //           <BoxSelect size={12} />
  //           text
  //         </p>
  //         {/* <div className="border-[1px] border-solid border-slate-200 flex-1" /> */}
  //         <Handle
  //           type="source"
  //           position={Position.Right}
  //           id="text"
  //           isConnectable={isConnectable}
  //           style={{ transform: "scale(1.4)", top: 6 }}
  //         />
  //         <div />
  //       </div>
  //     </div>
  //   </div>
  // );
});

TextInputNode.displayName = "TextInputNode";

export default TextInputNode;
