import graphState from "@/app/state/graphState";
import React, { memo, useEffect, useState } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NodeHandle from "../../Shared/Handle";
import NodeBody from "../../Shared/Body";
import NodeTitle from "../../Shared/Title";
import useAppState from "@/app/state/appState";

const ImageInputNode = memo(({ data, isConnectable }: NodeProps) => {
  const { zenMode } = useAppState();

  const [hover, setHover] = useState(false);
  const [showTrash, setShowTrash] = useState(false); // add this
  const [file, setFile] = useState("");

  const nodeId = useNodeId() || ""; // TODO : Fix this
  const updateNodeData = graphState((s) => s.updateNodeData);

  function handleChange(e: any) {
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
    setFile("");
    updateNodeData(nodeId, {
      output: { image: "" },
    });
  };

  return (
    <div>
      <NodeTitle hover={hover} title="Image Input" zenMode={zenMode} />

      <NodeBody setHover={setHover}>
        {file ? (
          <div
            className="relative"
            onMouseEnter={() => setShowTrash(true)}
            onMouseLeave={() => setShowTrash(false)}
          >
            <Image src={file} width={300} height={300} alt="Input Image" />
            {showTrash && (
              <div className="absolute top-0 right-0 p-0">
                <Button
                  className="bg-transparent hover:bg-background/50 p-2 rounded-full"
                  onClick={trashButtonHandler}
                >
                  <Trash2 className="text-foreground" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Input
              className="text-foreground hidden"
              id="image-uploader"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <label htmlFor="image-uploader" className="p-20">
              <i className="fa-solid fa-upload"></i>Choose Or Drop Images
            </label>
          </>
        )}

        <NodeHandle
          type="source"
          position={Position.Right}
          id="image"
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>
    </div>
  );
});

ImageInputNode.displayName = "ImageInputNode";

export default ImageInputNode;
