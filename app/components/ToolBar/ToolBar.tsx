import {
  Panel,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  useReactFlow,
} from "reactflow";
import { useCallback, useEffect, useState } from "react";
import graphState from "@/app/state/graphState";
import nodeExecution from "./Execution";
import {
  LayoutGrid,
  Maximize,
  PersonStanding,
  PlayIcon,
  Square,
  Webhook,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useAppState from "@/app/state/appState";
import ToolBarItem from "./ToolBarItem";
import { ToolsNodesData } from "../Nodes/Tools/tools";
import axios from "axios";
import { APICodeDialog } from "./APICode";

const ToolBar = () => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { zenMode } = useAppState();

  const updateNodeData = graphState((s) => s.updateNodeData);
  const updateEdgeData = graphState((s) => s.updateEdgeData);
  const [stopExecution, setStopExecution] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

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
    setIsExecuting(true);
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

      if (stopExecution) {
        setStopExecution(false);
        break;
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
    setIsExecuting(false);
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

  const postData = async () => {
    const nodesInput = {
      data: [
        {
          id: "1",
          data: { text: "hello, tallest tower?" },
        },
      ],
    };

    const res = await axios.post("/api/rdr/2", nodesInput);

    console.log("RDR RES", res);
  };

  return (
    <Panel
      position="bottom-center"
      className={`w-full px-10 transition ${zenMode ? "hidden" : ""}`}
    >
      <div className="flex flex-row items-center transition justify-between">
        <div></div>
        <div className="flex items-center gap-4">
          <div className="flex flex-row items-center gap-4 px-4 py-1 bg-background rounded-full drop-shadow-2xl border-[1px] border-solid border-foreground/10">
            <ToolBarItem
              nodesData={{ RectangleTool: ToolsNodesData.RectangleTool }}
            />

            <Button
              variant="link"
              // onClick={Execute}
              className="bg-foreground rounded-full px-[10px]"
            >
              {isExecuting ? (
                <Square
                  onClick={() => {
                    setStopExecution(true);
                  }}
                  className="text-background"
                  size={20}
                />
              ) : (
                <PlayIcon
                  onClick={Execute}
                  className="text-background"
                  size={20}
                />
              )}
            </Button>

            <ToolBarItem
              nodesData={{ HeadingTool: ToolsNodesData.HeadingTool }}
            />
          </div>

          <APICodeDialog />
        </div>

        <div className="border-[1px] border-solid border-foreground/10 px-1 flex items-center justify-between bg-background shadow-lg rounded-full">
          <Button
            variant="ghost"
            className="p-2 rounded-full"
            onClick={() => zoomIn({ duration: 300 })}
          >
            <ZoomIn size={20} />
          </Button>
          <Button
            variant="ghost"
            className="p-2 rounded-full"
            onClick={() => zoomOut({ duration: 300 })}
          >
            <ZoomOut size={20} />
          </Button>
          <Button
            variant="ghost"
            className="p-2 rounded-full"
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
