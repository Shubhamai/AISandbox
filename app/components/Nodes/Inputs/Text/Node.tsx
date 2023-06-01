import useStore from "@/app/state/store";
import React, { memo, useEffect } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";

const TextInputNode = memo(({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = useStore((s) => s.updateNodeData);

  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="source"
        position={Position.Right}
        id="text"
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>
      {/* <input
        className="border-2 border-black text-slate-900 h-24"
        type="text"
        onChange={(e) => updateNodeData(nodeId, { input_data: e.target.value })}
      /> */}
      <Input
        type="text"
        onChange={(e) =>
          updateNodeData(nodeId, { output: { text: e.target.value } })
        }
      />
    </div>
  );
});

TextInputNode.displayName = "TextInputNode";

export default TextInputNode;
