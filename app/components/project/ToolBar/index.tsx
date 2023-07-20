"use client";

import {
  Panel,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  useReactFlow,
} from "reactflow";
import { useCallback, useEffect, useState } from "react";
import graphState from "@/app/state/graphState";
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
import { Button } from "@/app/components/ui/button";
import useAppState from "@/app/state/appState";
import ToolBarItem from "./ToolBarItem";
import { ToolsNodesData } from "../../Nodes/Tools/tools";
import { APICodeDialog } from "./APICode";
import { cn } from "@/app/utils";
import { ExecuteNodes } from "@/app/lib/execute";
import { nodeExecution } from "@/app/api/(models)/execution";

const ToolBar = () => {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { zenMode } = useAppState();

  const updateNodeData = graphState((s) => s.updateNodeData);
  const updateEdgeData = graphState((s) => s.updateEdgeData);
  const resetNodesIsComputed = graphState((s) => s.resetNodesIsComputed);

  const [isExecuting, setIsExecuting] = useState(false);

  const Execute = async () => {
    setIsExecuting(true);
    const { nodes, edges } = graphState.getState();

    await ExecuteNodes(
      nodes,
      edges,
      true, // isFrontEnd
      nodeExecution,
      resetNodesIsComputed,
      updateNodeData,
      updateEdgeData
    );

    setIsExecuting(false);
  };

  return (
    <>
      <Panel
        position="bottom-center"
        className={`w-full !p-0 !py-4 !m-0 transition ${
          zenMode ? "hidden" : ""
        }`}
      >
        <div className="flex flex-row items-center transition justify-center">
          <div className="flex items-center gap-4">
            <Button
              className="invisible gap-2 bg-background shadow-lg shadow-foreground/5 border bottom-border rounded-full"
              variant="secondary"
            >
              <Webhook /> API Code
            </Button>

            <div className="flex flex-row items-center gap-4 px-4 py-1 bg-background rounded-full drop-shadow-2xl border-[1px] border-solid border-foreground/10">
              <ToolBarItem
                nodesData={{ RectangleTool: ToolsNodesData.RectangleTool }}
              />

              <Button
                variant="link"
                className="bg-foreground rounded-full px-[10px]"
                style={{
                  outline: "8px solid hsl(var(--foreground))",
                  outlineOffset: -1,
                }}
              >
                {isExecuting ? (
                  <Square
                    // onClick={() => {
                    //   setStopExecution(true);
                    // }}
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
        </div>
      </Panel>

      <div
        className={cn(
          "fixed bottom-4 right-4",
          "border-[1px] border-solid border-foreground/10 px-1 flex items-center justify-between bg-background shadow-lg rounded-full z-50"
        )}
      >
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
    </>
  );
};

export default ToolBar;
