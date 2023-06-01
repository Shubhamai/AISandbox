import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  NodeTypes,
} from "reactflow";

import initialNodes from "./nodes";
import initialEdges from "./edges";
import nodeTypes from "./nodeTypes";
import defaultNodeData from "@/app/data/nodes.json";

type RFState = {
  id: number;
  nodes: Node[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  reactFlowWrapper: null | HTMLDivElement;
  reactFlowInstance: any;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateNodeData: (nodeId: string, data: any) => void;
  resetNodesIsComputed: () => void;
  onConnect: OnConnect;
  setReactFlowWrapper: (ref: HTMLDivElement) => void;
  setReactFlowInstance: (instance: any) => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  getId: () => string;
};

const useStore = create<RFState>((set, get) => ({
  id: 0, // TODO : Could be problematic, either numerical or string id
  nodes: initialNodes,
  edges: initialEdges,
  nodeTypes: nodeTypes,
  reactFlowWrapper: null,
  reactFlowInstance: null,
  setReactFlowWrapper: (ref: HTMLDivElement) => {
    set({ reactFlowWrapper: ref });
  },
  setReactFlowInstance: (instance: any) => {
    set({ reactFlowInstance: instance });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  updateNodeData: (nodeId: string, data: any) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, ...data };
        }
        return node;
      }),
    });
  },
  resetNodesIsComputed: () => {
    set({
      nodes: get().nodes.map((node) => {
        node.data = {
          ...node.data,
          hasComputed: false,
          // ...JSON.parse(JSON.stringify(defaultNodeData)),
        };
        return node;
      }),
    });
  },
  onConnect: (connection: Connection) => {
    if (connection.sourceHandle === connection.targetHandle) {
      set({
        edges: addEdge(connection, get().edges),
      });
    } else {
      console.log("Invalid connection");
    }
  },
  onDragOver: (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  },
  onDrop: (event: DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = get().reactFlowWrapper?.getBoundingClientRect();
    const type = event.dataTransfer?.getData("application/reactflow");

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      console.log("Invalid type");
      return;
    }

    if (!reactFlowBounds) {
      console.log("Invalid reactFlowBounds");
      return;
    }
    const position = get().reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: get().getId(),
      type,
      position,
      data: {
        label: type,
        ...JSON.parse(JSON.stringify(defaultNodeData)),
      },
    };

    set({
      nodes: get().nodes.concat(newNode),
    });
  },
  getId: () => {
    // TODO : Clean this up
    let id = get().id + 1;
    set({ id: id });
    return `dndnode_${id}`;
  },
}));

export default useStore;
