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
import { useEffect, useRef, useState } from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";
import styled, { ThemeProvider } from "styled-components";
import useAppState from "@/app/state/appState";
import graphState from "@/app/state/graphState";
import Header from "@/app/components/project/Header";
import ToolBar from "@/app/components/project/ToolBar";
import ContextItems from "@/app/components/project/ContextMenu";
import SideBar from "@/app/components/project/SideBar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ui/use-toast";

export const runtime = "edge";

export default function Home({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const [projectName, setProjectName] = useState<string>("");

  const {
    nodes,
    edges,
    nodeTypes,
    setReactFlowWrapper,
    setReactFlowInstance,
    updateGraph,
    onNodesChange,
    onEdgesChange,
    setEdgeUpdateSuccessful,
    onEdgeUpdateStart,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onConnect,
    onDragOver,
    onDrop,
    setProjectId,
  } = graphState();
  const { zenMode, showMiniMap, background } = useAppState();

  useEffect(() => {
    setReactFlowWrapper(reactFlowWrapper.current);
  }, [setReactFlowWrapper, reactFlowWrapper]);

  useEffect(() => {
    setEdgeUpdateSuccessful(edgeUpdateSuccessful.current);
  }, [setEdgeUpdateSuccessful, edgeUpdateSuccessful]);

  useEffect(() => {
    const getProjectData = async () => {
      let { data: project, error } = await supabase
        .from("projects")
        .select("data,name")
        .eq("id", params.id)
        .single();

      if (project) {
        const { nodes, edges } = project.data;

        updateGraph(nodes, edges);
        setProjectName(project.name);
        setProjectId(params.id);
      } else {
        // console.log(error);
        toast({
          title: "Error",
          description: error?.message,
        });
        router.push("/dashboard");
      }
    };

    getProjectData();
  }, []);

  useEffect(() => {
    return () => {
      setProjectId("");
    };
  }, []);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Header projectName={projectName} projectId={params.id} />
        <ToolBar />
        <SideBar />
        {/* <Settings /> */}
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
