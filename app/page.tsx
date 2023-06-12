"use client";

import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  SelectionMode,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";
import ToolBar from "./components/ToolBar/ToolBar";
import graphState from "./state/graphState";
import { useEffect, useRef } from "react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import Header from "./components/Header/header";
import Sidebar from "./components/SideBar/SideBar";
import Settings from "./components/Settings/Settings";
import ContextItems from "./components/Context/ContextItems";
import useAppState from "./state/appState";

export default function Home() {
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  const {
    nodes,
    edges,
    nodeTypes,
    setReactFlowWrapper,
    setReactFlowInstance,
    onNodesChange,
    onEdgesChange,
    setEdgeUpdateSuccessful,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onConnect,
    onDragOver,
    onDrop,
  } = graphState();
  const { zenMode, showMiniMap, background } = useAppState();

  useEffect(() => {
    setReactFlowWrapper(reactFlowWrapper.current);
  }, [setReactFlowWrapper, reactFlowWrapper]);

  useEffect(() => {
    setEdgeUpdateSuccessful(edgeUpdateSuccessful.current);
  }, [setEdgeUpdateSuccessful, edgeUpdateSuccessful]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Header />
        <ToolBar />
        <Sidebar />
        <Settings />
        <ContextItems>
          <div
            className="reactflow-wrapper"
            style={{ width: "100vw", height: "100vh" }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              // selectionOnDrag
              // panOnDrag={[2, 1]}
              selectionMode={SelectionMode.Partial}
            >
              {showMiniMap ? (
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
              ) : (
                <></>
              )}
              {background.enable ? (
                <Background
                  variant={background.variant}
                  gap={background.gap}
                  size={background.size}
                />
              ) : (
                <></>
              )}
            </ReactFlow>
          </div>
        </ContextItems>
      </ReactFlowProvider>
    </div>
  );
}
