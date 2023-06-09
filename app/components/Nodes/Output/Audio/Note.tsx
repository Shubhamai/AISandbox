import React, { memo, useEffect } from "react";
import { Handle, NodeProps, NodeToolbarProps, Position } from "reactflow";

const AudioOutputNode = memo(({ data, isConnectable }: NodeProps) => {
  const outputData = data.output.audio;

  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="target"
        id="audio"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>
      <div className="text-slate-600">{outputData}</div>
      <Handle
        type="source"
        id="audio"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

AudioOutputNode.displayName = "AudioOutputNode";

export default AudioOutputNode;
