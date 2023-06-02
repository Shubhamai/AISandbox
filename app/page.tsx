"use client";

import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  SelectionMode,
} from "reactflow";

import "reactflow/dist/style.css";
import ToolBar from "./components/ToolBar/ToolBar";

import { shallow } from "zustand/shallow";
import useStore from "./state/store";
import { useEffect, useRef } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Header from "./components/Header/header";
import Sidebar from "./components/SideBar/SideBar";

const selector = (state: {
  nodes: any;
  edges: any;
  nodeTypes: any;
  setReactFlowWrapper: any;
  setReactFlowInstance: any;
  reactFlowWrapper: any;
  onNodesChange: any;
  onEdgesChange: any;
  setEdgeUpdateSuccessful: any;
  onEdgeUpdateStart: any;
  onEdgeUpdate: any;
  onEdgeUpdateEnd: any;
  onConnect: any;
  onDragOver: any;
  onDrop: any;
}) => ({
  nodes: state.nodes,
  edges: state.edges,
  nodeTypes: state.nodeTypes,
  setReactFlowWrapper: state.setReactFlowWrapper,
  setReactFlowInstance: state.setReactFlowInstance,
  reactFlowWrapper: state.reactFlowWrapper,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  setEdgeUpdateSuccessful: state.setEdgeUpdateSuccessful,
  onEdgeUpdateStart: state.onEdgeUpdateStart,
  onEdgeUpdate: state.onEdgeUpdate,
  onEdgeUpdateEnd: state.onEdgeUpdateEnd,
  onConnect: state.onConnect,
  onDragOver: state.onDragOver,
  onDrop: state.onDrop,
});

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
  } = useStore(selector, shallow);

  useEffect(() => {
    setReactFlowWrapper(reactFlowWrapper.current);
  }, [setReactFlowWrapper, reactFlowWrapper]);

  useEffect(() => {
    setEdgeUpdateSuccessful(edgeUpdateSuccessful.current);
  }, [setEdgeUpdateSuccessful, edgeUpdateSuccessful]);

  return (
    <div className="dndflow">
      <ContextMenu>
        <ContextMenuTrigger>
          <ReactFlowProvider>
            <Header />
            <ToolBar />
            <Sidebar />

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
                <Controls position="bottom-right" />
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={12}
                  size={1}
                />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
