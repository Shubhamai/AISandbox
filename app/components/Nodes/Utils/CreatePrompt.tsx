import graphState from "@/app/state/graphState";
import React, { memo, useState } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Textarea } from "@/components/ui/textarea";

export const executeCreatePromptNode = (node: Node, previousNodes: Node[]) => {
  let outText = node.data.input.text;
  for (let previousNode of previousNodes) {
    const nodeId = previousNode.id;

    outText = outText.replace(`\${${nodeId}}`, previousNode.data.output.text);
  }

  node.data.output.text = outText;
  node.data.hasComputed = true;

  return node;
};

const CreatePromptNode = memo(
  ({ data, isConnectable, selected }: NodeProps) => {
    const [hover, setHover] = useState(false);

    const nodeId = useNodeId() || ""; // TODO : Fix this
    const updateNodeData = graphState((s) => s.updateNodeData);

    return (
      <div>
        <div
          className={`flex-col ml-2 mb-1 transition-opacity ${
            hover ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <h1 className="text-md font-semibold text-foreground">
            Create Prompt
          </h1>
        </div>

        <div
          className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Textarea
            className="resize-none border-transparent focus:border-transparent focus:ring-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            placeholder="Hi, my name is ${1} and I am ${2} years old."
            onChange={(e) =>
              updateNodeData(nodeId, { input: { text: e.target.value } })
            }
          >
            {data.input.text}
          </Textarea>

          <div className="flex justify-between items-center gap-2 h-full">
            <Handle
              className="!bg-foreground/50 !border-none"
              type="target"
              id="text"
              position={Position.Left}
              isConnectable={isConnectable}
            />
            <Handle
              className="!bg-foreground/50 !border-none"
              type="source"
              position={Position.Right}
              id="text"
              isConnectable={isConnectable}
            />
            <div />
          </div>
        </div>
      </div>
    );
  }
);

CreatePromptNode.displayName = "CreatePromptNode";

export default CreatePromptNode;
