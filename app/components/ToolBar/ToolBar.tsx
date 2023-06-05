import { Panel, getIncomers, getOutgoers, getConnectedEdges } from "reactflow";
import { useEffect } from "react";
import graphState from "@/app/state/graphState";
import nodeExecution from "./Execution";
import { PlayIcon } from "lucide-react";

const ToolBar = () => {
  const updateNodeData = graphState((s) => s.updateNodeData);
  const updateEdgeData = graphState((s) => s.updateEdgeData);

  const resetNodesIsComputed = graphState((s) => s.resetNodesIsComputed);

  const getStartingInputNodes = () => {
    const { nodes, edges } = graphState.getState();

    const inputNodes = [];
    for (const node of nodes) {
      const incomingNodes = getIncomers(node, nodes, edges);

      if (incomingNodes.length === 0) {
        inputNodes.push(node);
      }
    }

    return inputNodes;
  };

  const Execute = async () => {
    const { nodes, edges } = graphState.getState();

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

      // Get incoming and outgoing nodes
      const incomingNodes = getIncomers(node, nodes, edges);
      const outgoingNodes = getOutgoers(node, nodes, edges);

      const allInputsComputed = incomingNodes.every((n) => n.data.hasComputed);

      if (allInputsComputed) {
        visited.add(node.id);

        const updatedNode = await nodeExecution(node, incomingNodes);
        updateNodeData(updatedNode.id, { ...updatedNode.data });
        queue.push(...outgoingNodes.filter((n) => !visited.has(n.id)));

        // Update edges
        for (const edge of getConnectedEdges(queue, edges)) {
          // if (edge.source === node.id) {
          // const updatedEdge = await nodeExecution(edge, incomingNodes);
          updateEdgeData(edge.id, { animated: true });
          // }
        }
      }

      queue.push(...incomingNodes.filter((n) => !visited.has(n.id)));
    }

    for (const edge of edges) {
      updateEdgeData(edge.id, { animated: false });
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
