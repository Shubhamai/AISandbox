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
  updateEdge,
} from "reactflow";

import nodeTypes from "../types/nodeTypes";

type RFState = {
  id: number;
  nodes: Node[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  reactFlowWrapper: null | HTMLDivElement;
  reactFlowInstance: any;
  updateGraph: (nodes: Node[], edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  edgeUpdateSuccessful: any;
  onEdgeUpdateStart: () => void;
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void;
  onEdgeUpdateEnd: (_: any, edge: Edge) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  updateEdgeData: (edgeId: string, data: any) => void;
  resetNodesIsComputed: () => void;
  onConnect: OnConnect;
  setReactFlowWrapper: (ref: HTMLDivElement) => void;
  setReactFlowInstance: (instance: any) => void;
  setEdgeUpdateSuccessful: (success: any) => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  getId: () => string;
};

const graphState = create<RFState>((set, get) => ({
  id: 0, // TODO : Could be problematic, either numerical or string id
  nodes: [], // TODO : Maybe load from local storage
  edges: [], // TODO : Maybe load from local storage
  nodeTypes: nodeTypes,
  edgeUpdateSuccessful: null,
  reactFlowWrapper: null,
  reactFlowInstance: null,
  setReactFlowWrapper: (ref: HTMLDivElement) => {
    set({ reactFlowWrapper: ref });
  },
  setReactFlowInstance: (instance: any) => {
    set({ reactFlowInstance: instance });
  },
  updateGraph: (nodes: Node[], edges: Edge[]) => {
    set({ nodes, edges });
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
  setEdgeUpdateSuccessful: (success: boolean) => {
    set({ edgeUpdateSuccessful: success });
  },
  onEdgeUpdateStart: () => {
    get().setEdgeUpdateSuccessful(false);
  },
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => {
    get().setEdgeUpdateSuccessful(false);
    set({
      edges: updateEdge(oldEdge, newConnection, get().edges),
    });
  },
  onEdgeUpdateEnd: (_, edge) => {
    if (!get().edgeUpdateSuccessful) {
      set({
        edges: get().edges.filter((e) => e.id !== edge.id),
      });
    }
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
  updateEdgeData: (edgeId: string, data: any) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === edgeId) {
          edge = { ...edge, ...data };
        }
        return edge;
      }),
    });
  },
  resetNodesIsComputed: () => {
    set({
      nodes: get().nodes.map((node) => {
        node.data = {
          ...node.data,
          hasComputed: false,
          // output: defaultNodeData.output,
          // ...JSON.parse(JSON.stringify(defaultNodeData)),
        };
        return node;
      }),
    });
  },
  onConnect: (connection: Connection) => {
    if (connection.sourceHandle === connection.targetHandle) {
      set({
        edges: addEdge(
          { ...connection, animated: false, type: "smoothstep" },
          get().edges
        ),
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

        // TODO : Default data now lives, might need to be moved
        input: {
          text: null,
          image: null,
        },
        output: {
          text: null,
          image: null,
        },
        hasComputed: false,
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

export default graphState;
