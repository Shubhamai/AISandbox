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

const AudioInputNode = memo(({ data, isConnectable, selected }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const audioFile = e.target.files[0];

      updateNodeData(nodeId, {
        output: { audio: audioFile },
      });
    } else {
      console.log("no files");
    }
  };

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">Audio Input</h1>
      </div>

      <div
        className="bg-white flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Input
          id="audio"
          type="file"
          className="text-slate-900"
          accept=".webm, .mp3, .mp4, .m4a"
          onChange={handleChange}
        />

        <div className="flex justify-between items-center gap-2 h-full">
          <Handle
            className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
            type="source"
            position={Position.Right}
            id="audio"
            isConnectable={isConnectable}
          />
          <div />
        </div>
      </div>
    </div>
  );
});

AudioInputNode.displayName = "AudioInputNode";

export default AudioInputNode;
