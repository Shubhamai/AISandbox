import { Brush, Hexagon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";

export const executeStableDiffusionNode = (
  node: Node,
  previousNodes: Node[]
) => {
  let image;
  let text;
  for (const prevNode of previousNodes) {
    if (prevNode.data.output.image) {
      image = prevNode.data.output.image;
    }
    if (prevNode.data.output.text) {
      text = prevNode.data.output.text;
    }
  }
  node.data.hasComputed = true;
  node.data.output.image = "Output Image : " + image + "__" + text;
  return node;
};

const StableDiffusionNode = memo(({ data, isConnectable }: NodeProps) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-foreground">SD</h1>
      </div>

      <div
        className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative p-6"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          id="image"
          key="image"
          position={Position.Left}
          isConnectable={isConnectable}
          style={{
            top: "calc(50% + -20px)",
          }}
        />
        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          id="text"
          key="text"
          position={Position.Left}
          isConnectable={isConnectable}
          style={{
            top: "calc(50% + 20px)",
          }}
        />

        <Brush size={36} />
        <Handle
          className="!bg-foreground/50 !border-none"
          type="source"
          id="image"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
});

StableDiffusionNode.displayName = "StableDiffusionNode";

export default StableDiffusionNode;
