import ReactFlow, {
  Background,
  Panel,
  Node,
  getIncomers,
  getOutgoers,
  Edge,
} from "reactflow";
import Image from "next/image";
import { DragEvent } from "react";
import useStore from "@/app/state/store";
import TextInputNode from "../Inputs/Text/Node";

const executeCode = (node: Node, previousNode: Node) => {
  const type = node.type;
  const data = node.data;

  if (type === "TextInputNode") {
    return node;
  } else if (type === "OpenAIChatGPTNode") {
    const modelOutput = {
      ...data,
      output:
        "Here is the output from the model : " + previousNode.data.input_data,
    };

    return { ...node, data: modelOutput };
  } else if (type === "TextOutputNode") {
    if (previousNode.type === "OpenAIChatGPTNode") {
      const output = {
        ...data,
        output: previousNode.data.output,
      };
      return { ...node, data: output };
    } else if (previousNode.type === "TextInputNode") {
      const output = {
        ...data,
        output: previousNode.data.input_data,
      };
      return { ...node, data: output };
    } else {
      const output = {
        ...data,
        output: "Invalid Input",
      };
      return { ...node, data: output };
    }
  } else {
    console.log("Invalid Node...");
  }
};

const ToolBar = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const updateNodeData = useStore((s) => s.updateNodeData);

  const getStartingInputNodes = () => {
    const { nodes, edges } = useStore.getState();

    const inputNodes = [];
    for (const node of nodes) {
      const incomingNodes = getIncomers(node, nodes, edges);

      if (incomingNodes.length === 0) {
        inputNodes.push(node);
      }
    }

    return inputNodes;
  };

  // TODO : Execute all the nodes on a breath first search while previous the previous node data
  // TODO : Update the components with data as necessary
  const Execute = () => {
    const { nodes, edges } = useStore.getState();

    // Create a queue to manage nodes to process and a set to keep track of visited nodes
    let queue = getStartingInputNodes();
    let visited = new Set();

    while (queue.length > 0) {
      let node = queue.shift(); // Remove node from the front of the queue

      // If we've already visited this node, skip it
      if (node === undefined || visited.has(node.id)) {
        continue;
      }

      // Mark the node as visited
      visited.add(node.id);

      // Get incoming and outgoing nodes
      const incomingNodes = getIncomers(node, nodes, edges);
      const outgoingNodes = getOutgoers(node, nodes, edges);

      for (const incomingNode of incomingNodes) {
        // console.log(incomingNode);
        const updatedNode = executeCode(node, incomingNode);
        if (updatedNode) {
          updateNodeData(updatedNode.id, { ...updatedNode.data });
        }
      }

      console.log("Updated node:", node);

      queue.push(...incomingNodes.filter((n) => !visited.has(n.id)));
      queue.push(...outgoingNodes.filter((n) => !visited.has(n.id)));
    }
  };

  return (
    <Panel
      position="bottom-center"
      className="flex items-center justify-between gap-3 mx-auto"
    >
      <button
        onClick={Execute}
        className="bg-slate-600 text-white font-bold py-2 px-4 rounded"
      >
        <Image src="/play.svg" width={20} height={20} alt="Run Inference" />
      </button>
      <aside className="flex gap-3">
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "TextInputNode")}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "OpenAIChatGPTNode")}
          draggable
        >
          Model Node
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "TextOutputNode")}
          draggable
        >
          Output Node
        </div>
      </aside>
    </Panel>
  );
};

export default ToolBar;
