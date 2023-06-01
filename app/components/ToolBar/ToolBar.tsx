import ReactFlow, {
  Background,
  Panel,
  Node,
  getIncomers,
  getOutgoers,
  Edge,
} from "reactflow";
import Image from "next/image";
import { DragEvent, useEffect } from "react";
import useStore from "@/app/state/store";
import nodeTypes from "@/app/state/nodeTypes";
import nodeExecution from "./Execution";
import { PlayIcon } from "lucide-react";

const ToolBar = () => {
  const updateNodeData = useStore((s) => s.updateNodeData);
  const resetNodesIsComputed = useStore((s) => s.resetNodesIsComputed);

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

  const Execute = () => {
    const { nodes, edges } = useStore.getState();

    resetNodesIsComputed();

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

      const allInputsComputed = incomingNodes.every((n) => n.data.hasComputed);

      if (allInputsComputed) {
        const updatedNode = nodeExecution(node, incomingNodes);
        updateNodeData(updatedNode.id, { ...updatedNode.data });
        queue.push(...outgoingNodes.filter((n) => !visited.has(n.id)));
      }

      queue.push(...incomingNodes.filter((n) => !visited.has(n.id)));
    }
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") Execute();
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <Panel
      position="bottom-center"
      className="flex items-center justify-between gap-3 mx-auto"
    >
      <button
        onClick={Execute}
        className="flex flex-row gap-3 items-center font-bold py-2 px-4 rounded"
      >
        <PlayIcon size={20} />
        Run Inference
      </button>
    </Panel>
  );
};

export default ToolBar;
