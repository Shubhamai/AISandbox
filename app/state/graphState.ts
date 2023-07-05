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
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";

import nodeTypes from "../components/Nodes/nodeTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { compareEdges, compareNodes } from "../utils";
import { toBlob, toJpeg } from "html-to-image";
import { nanoid } from "nanoid";

type RFState = {
  projectId: string | null;
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
  setReactFlowWrapper: (ref: HTMLDivElement | null) => void;
  setReactFlowInstance: (instance: any) => void;
  setEdgeUpdateSuccessful: (success: any) => void;
  onDragOver: (event: any) => void;
  onDrop: (event: any) => void;
  getId: (type: string) => string;
  setProjectId: (projectId: string) => void;
};

const graphState = create<RFState>((set, get) => ({
  projectId: null,
  nodes: [], // TODO : Maybe load from local storage
  edges: [], // TODO : Maybe load from local storage
  nodeTypes: nodeTypes,
  edgeUpdateSuccessful: null,
  reactFlowWrapper: null,
  reactFlowInstance: null,
  setReactFlowWrapper: (ref: HTMLDivElement | null) => {
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
  onDragOver: (event: any) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  },
  onDrop: (event: any) => {
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
      id: get().getId(type),
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
  getId: (type: string) => {
    let id = nanoid();
    return `${type}-${id}`;
  },
  setProjectId: (projectId: string) => {
    set({ projectId });
  },
}));

export default graphState;

graphState.subscribe((state, prevState) => {
  const { nodes, edges, projectId } = state;
  if (!projectId) {
    console.log("No project id");
    return;
  }
  if (
    compareNodes(nodes, prevState.nodes) &&
    compareEdges(edges, prevState.edges)
  ) {
    return;
  }

  if (
    prevState.nodes.length === state.nodes.length &&
    prevState.edges.length === state.edges.length
  ) {
    return;
  }

  const supabase = createClientComponentClient();
  const viewport: HTMLElement | null = document.querySelector(
    ".react-flow__viewport"
  );

  const imageWidth = 1024;
  const imageHeight = 768;

  const nodesBounds = getRectOfNodes(nodes);
  const transform = getTransformForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.5,
    2
  );

  if (viewport) {
    toBlob(viewport, {
      backgroundColor: "#ffffff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}`,
        height: `${imageHeight}`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(async (outImage) => {
      if (!outImage) {
        console.log("No outImage");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // for (let edge of edges) {
      //   edge = { ...edge, animated: false };
      // }
      for (let i = 0; i < edges.length; i++) {
        edges[i] = { ...edges[i], animated: false };
      }

      // console.log("Saving...", projectId);

      await supabase
        .from("projects")
        .update({
          data: { nodes, edges },
        })
        .eq("id", projectId);
      // .then((res) => {
      //   console.log(res);
      // });

      const { data, error } = await supabase.storage
        .from("projects")
        .upload(`${session?.user.id}/${projectId}.jpeg`, outImage, {
          upsert: true,
        });
    });
  } else {
    console.log("Viewport not found! Unable to Download");
  }
});
