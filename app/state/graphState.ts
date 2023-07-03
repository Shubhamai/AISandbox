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
import { debounce, isEqual, sortBy } from "lodash";

import nodeTypes from "../components/Nodes/nodeTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type RFState = {
  projectId: string | null;
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
  id: 0, // TODO : Could be problematic, either numerical or string id
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
    // TODO : Clean this up
    let id = get().id + 1;
    set({ id: id });
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
  const supabase = createClientComponentClient();
  supabase
    .from("projects")
    .update({
      data: { nodes, edges },
    })
    .eq("id", projectId).then((res) => {
      console.log(res);
    });
});

const nodeMapFn = (nodes: Node[]) => {
  return sortBy(
    nodes.map((node) => {
      const {
        position,
        positionAbsolute,
        selected,
        height,
        width,
        dragging,
        ...otherProps
      } = node;
      return otherProps;
    }),
    ["id"]
  );
};

const edgeMapFn = (nodes: Edge[]) => {
  return sortBy(
    nodes.map((node) => {
      const { ...otherProps } = node;
      return otherProps;
    }),
    ["id"]
  );
};

const compareNodes = (nodes1: Node[], nodes2: Node[]) => {
  const filterdNodes1 = nodeMapFn(nodes1);
  const filterdNodes2 = nodeMapFn(nodes2);

  return isEqual(filterdNodes1, filterdNodes2);
};

const compareEdges = (edges1: Edge[], edges2: Edge[]) => {
  const filterdEdges1 = edgeMapFn(edges1);
  const filterdEdges2 = edgeMapFn(edges2);

  return isEqual(filterdEdges1, filterdEdges2);
};
