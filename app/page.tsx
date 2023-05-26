"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";
import ToolBar from "./components/ToolBar/ToolBar";
import TextInputNode from "./components/Inputs/Text/Node";
import TextOutputNode from "./components/Output/Text/Node";
import OpenAIChatGPT from "./components/Model/OpenAIChatGPT/Node";

import { shallow } from "zustand/shallow";
import useStore from "./state/store";

const selector = (state: {
  nodes: any;
  edges: any;
  nodeTypes: any;
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
}) => ({
  nodes: state.nodes,
  edges: state.edges,
  nodeTypes: state.nodeTypes,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function Home() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes } =
    useStore(selector, shallow);

  // const onConnect = useCallback(
  //   (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls position="bottom-right" />
        <ToolBar />
        {/* <MiniMap zoomable pannable /> */}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
