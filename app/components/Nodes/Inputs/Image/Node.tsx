import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageInputNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = useState(false);
  const [showTrash, setShowTrash] = useState(false); // add this
  const [file, setFile] = useState("");

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  function handleChange(e : any) {
    var reader = new FileReader();
    reader.onloadend = function () {
      var base64Image = reader.result;

      updateNodeData(nodeId, {
        output: { image: base64Image },
      });
    };

    reader.readAsDataURL(e.target.files[0]);

    const url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
  }

  const trashButtonHandler = () => {
    console.log("trash button clicked");
    setFile("");
    updateNodeData(nodeId, {
      output: { image: "" },
    });
  };

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
        {file ? (
          <div
            className="relative"
            onMouseEnter={() => setShowTrash(true)}
            onMouseLeave={() => setShowTrash(false)}
          >
            <Image src={file} width={300} height={300} alt="Input Image" />
            {showTrash && (
              <div className="absolute top-0 right-0 p-0">
                <Button className="bg-transparent" onClick={trashButtonHandler}>
                  <Trash2 className=" text-slate-400" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Input
            className="text-slate-900"
            id="files"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
        )}

        <Handle
          type="source"
          className="!bg-slate-400 !scale-[1.4] !w-1.5 !h-1.5 rotate-45 !border-none"
          position={Position.Right}
          id="image"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

ImageInputNode.displayName = "ImageInputNode";

export default ImageInputNode;
