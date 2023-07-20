import graphState from "@/app/state/graphState";
import React, { memo, useState } from "react";
import { Handle, NodeProps, Position, Node } from "reactflow";
import { useNodeId } from "reactflow";
import { Textarea } from "@/app/components/ui/textarea";
import NodeTitle from "../Shared/Title";
import useAppState from "@/app/state/appState";
import NodeBody from "../Shared/Body";
import NodeHandle from "../Shared/Handle";

// export const executeCreatePromptNode = (node: Node, previousNodes: Node[]) => {
//   let outText = node.data.input.text;
//   for (let previousNode of previousNodes) {
//     const nodeId = previousNode.id;

//     outText = outText.replace(`\${${nodeId}}`, previousNode.data.output.text);
//   }

//   node.data.output.text = outText;
//   node.data.hasComputed = true;

//   return node;
// };

const CreatePromptNode = memo(
  ({ data, isConnectable, selected }: NodeProps) => {
    const [hover, setHover] = useState(false);

    const nodeId = useNodeId() || ""; // TODO : Fix this
    const updateNodeData = graphState((s) => s.updateNodeData);

    const { zenMode } = useAppState();

    return (
      <div>
        <NodeTitle hover={hover} title="Create Prompt" zenMode={zenMode} />

        <NodeBody setHover={setHover}>
          <Textarea
            className="resize-none border-transparent focus:border-transparent focus:ring-0 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-background"
            placeholder="Hi, my name is ${1} and I am ${2} years old."
            onChange={(e) =>
              updateNodeData(nodeId, { input: { text: e.target.value } })
            }
          >
            {data.input.text}
          </Textarea>

          <NodeHandle
            type="target"
            id="text"
            position={Position.Left}
            isConnectable={isConnectable}
            nodeId={nodeId}
          />
          <NodeHandle
            type="source"
            id="text"
            position={Position.Right}
            isConnectable={isConnectable}
            nodeId={nodeId}
          />
        </NodeBody>
      </div>
    );
  }
);

CreatePromptNode.displayName = "CreatePromptNode";

export default CreatePromptNode;
