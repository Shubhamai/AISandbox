import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const ImageInputNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = useState(false);

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  const [file, setFile] = useState("");
  function handleChange(e) {
    var reader = new FileReader();
    reader.onloadend = function () {
      var base64Image = reader.result;
      console.log(base64Image);
      updateNodeData(nodeId, {
        output: { image: base64Image },
      });
    };

    reader.readAsDataURL(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
 
  }

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-slate-800">Image Input</h1>
      </div>

      <div
        className="bg-white flex flex-col rounded-md drop-shadow-lg border-[1px] border-solid border-slate-200 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Handle
          type="source"
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          position={Position.Right}
          id="image"
          isConnectable={isConnectable}
        />

        {file ? (
          <Image src={file} width={300} height={300} alt="Input Image" />
        ) : (
          <Input
            className="text-slate-900"
            id="files"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
        )}

        {file ? <Trash2 /> : <div></div>}
      </div>
    </div>
  );
});

ImageInputNode.displayName = "ImageInputNode";

export default ImageInputNode;
