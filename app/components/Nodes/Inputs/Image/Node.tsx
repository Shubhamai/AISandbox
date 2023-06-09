import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const ImageInputNode = memo(({ data, isConnectable }: NodeProps) => {
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
    // updateNodeData(nodeId, {
    //   output: { image: e.target.files[0] },
    // });
  }

  return (
    <div className="bg-white rounded-md p-2">
      <Handle
        type="source"
        position={Position.Right}
        id="image"
        isConnectable={isConnectable}
      />
      <div className="text-black">{data.label}</div>

      {file ? (
        <Image src={file} width={300} height={300} alt="Input Image" />
      ) : (
        <Input
          className="text-slate-900"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
        />
      )}

      {file ? <Trash2 /> : <div></div>}
    </div>
  );
});

ImageInputNode.displayName = "ImageInputNode";

export default ImageInputNode;
