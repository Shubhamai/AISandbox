import {
  Panel,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  useReactFlow,
} from "reactflow";
import { useCallback, useEffect } from "react";
import graphState from "@/app/state/graphState";
import nodeExecution from "./Execution";
import { LayoutGrid, Maximize, PlayIcon, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAppState from "@/app/state/appState";

const ToolBar = () => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { zenMode } = useAppState();

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

  {
    /* flex-row gap-96 items-center */
    // className={`flex flex-row items-start w-[270px] transition rounded-lg ${
    //   showSidebar ? "translate-x-0" : "-translate-x-full"
    // }`}
    // className={`flex flex-row items-start w-[270px] transition rounded-lg ${
    //   showSidebar ? "translate-x-0" : "-translate-x-full"
    // }`}
    // style={{ top: 150 }}
  }
  return (
    <Panel
      position="bottom-center"
      className={`w-full px-10 transition ${
        zenMode ? "hidden" : ""
      }`}
    >
      <div className="flex flex-row items-center transition justify-between ">
        <div></div>
        <div className="bg-white shadow-lg rounded-full">
          <Button variant="link" onClick={Execute} className="px-3">
            <PlayIcon size={20} />
          </Button>
        </div>
        <div className="flex items-center justify-between bg-white shadow-lg rounded-full">
          <Button
            variant="link"
            className="p-2"
            onClick={() => zoomIn({ duration: 300 })}
          >
            <ZoomIn size={20} />
          </Button>
          <Button
            variant="link"
            className="p-2"
            onClick={() => zoomOut({ duration: 300 })}
          >
            <ZoomOut size={20} />
          </Button>
          <Button
            variant="link"
            className="p-2"
            onClick={() => fitView({ duration: 500 })}
          >
            <Maximize size={20} />
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default ToolBar;
