"use client";

import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import ToolBar from "./components/ToolBar/ToolBar";

import { shallow } from "zustand/shallow";
import useStore from "./state/store";
import { useEffect, useRef } from "react";

const selector = (state: {
  nodes: any;
  edges: any;
  nodeTypes: any;
  setReactFlowWrapper: any;
  setReactFlowInstance: any;
  reactFlowWrapper: any;
  onNodesChange: any;
  onEdgesChange: any;
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
  onConnect: state.onConnect,
  onDragOver: state.onDragOver,
  onDrop: state.onDrop,
});

export default function Home() {
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    nodeTypes,
    setReactFlowWrapper,
    setReactFlowInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
  } = useStore(selector, shallow);

  useEffect(() => {
    setReactFlowWrapper(reactFlowWrapper.current);
  }, [setReactFlowWrapper, reactFlowWrapper]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
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
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <ToolBar />
            <Controls position="bottom-right" />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
