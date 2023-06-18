import { NextRequest, NextResponse } from "next/server";
import { Connection, Edge, Node } from "reactflow";
import { executeOpenAIChatGPTNode } from "../../(models)/chatgpt/route";
import { executeStableDiffusionNode } from "../../(models)/stablediffusion/route";
import { executeWhisperNode } from "../../(models)/whisper/route";
import { executeYoloXNode } from "../../(models)/yolox/route";
import { executeTortoiseTTSNode } from "../../(models)/tortoisetts/route";
import {
  executeDollyV2Node,
  executeMpt7bNode,
  executeOpenAssistantNode,
  executeStableLMNode,
  executeVicuna13BNode,
} from "../../(models)/replicatellm/route";
import { executeCreatePromptNode } from "../../(models)/util";
import { supabaseService } from "@/lib/supabaseServer";

export const runtime = "edge";

export async function POST(
  request: NextRequest,
  context: { params: { id: number } }
) {
  const reqData = await request.json();
  const nodesInput = reqData;

  let id = context?.params.id;

  try {
    // GET NODES & EDGES DATA
    const { data, error } = await supabaseService
      .from("data")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.log("ERROR SUPABASE");

      return NextResponse.json({
        type: "error",
        error: error.message,
      });
    }

    if (!data || !data.data) {
      console.log("ERROR SUPABASE NO DATA");

      return NextResponse.json({
        type: "error",
        error: "No data found with given Id",
      });
    }

    const { nodes, edges } = JSON.parse(data.data);

    for (const nodeInput of nodesInput.data) {
      const node = nodes.find((n: Node) => n.id === nodeInput.id);
      if (node) {
        node.data.input = nodeInput.data;
        node.data.output = nodeInput.data;
      }
    }

    // EXECUTE
    try {
      // Create a queue to manage nodes to process and a set to keep track of visited nodes
      let queue = getStartingInputNodes(nodes, edges);
      let visited = new Set();

      // FINAL OUTPUT NODES DATA
      const outputs: Node[] = [];

      while (queue.length > 0) {
        let node = queue.shift(); // Remove node from the front of the queue

        // If we've already visited this node, skip it
        if (node === undefined || visited.has(node.id)) {
          continue;
        }

        // Get incoming and outgoing nodes
        const incomingNodes = getIncomers(node, nodes, edges);
        const outgoingNodes = getOutgoers(node, nodes, edges);

        const allInputsComputed = incomingNodes.every(
          (n) => n.data.hasComputed
        );

        if (allInputsComputed) {
          visited.add(node.id);

          const updatedNode = await nodeExecution(node, incomingNodes || []);
          // console.log(updatedNode.id, updatedNode.data.output);
          node = updatedNode;
          //   updateNodeData(updatedNode.id, { ...updatedNode.data });

          // is this node an output node?
          if (
            !!getIncomers(updatedNode, nodes, edges).length &&
            !getOutgoers(updatedNode, nodes, edges).length
          ) {
            outputs.push(updatedNode);
          }

          queue.push(...outgoingNodes.filter((n) => !visited.has(n.id)));

          // Update edges
          //   for (const edge of getConnectedEdges(queue, edges)) {
          // if (edge.source === node.id) {
          // const updatedEdge = await nodeExecution(edge, incomingNodes);
          // updateEdgeData(edge.id, { animated: true });
          // }
          //   }
        }

        queue.push(...incomingNodes.filter((n) => !visited.has(n.id)));
      }

      // return OutputData
      let processedOutputs = [];
      for (let output of outputs) {
        // console.log("OUTPUT", output.id, output.data.output);
        processedOutputs.push({
          id: output.id,
          data: output.data.output,
          type: output.type,
        });
      }

      return NextResponse.json({
        type: "success",
        data: processedOutputs,
      });
    } catch (err: any) {
      console.log("ERROR EXECUTING", err);

      return NextResponse.json({
        type: "error",
        error: err.message,
      });
    }
  } catch (error: any) {
    console.log("ERROR API ROUTE", error);

    return NextResponse.json({
      type: "error",
      error: error.message,
    });
  }
}

const getOutgoers = <T = any, U extends T = T>(
  node: Node<U>,
  nodes: Node<T>[],
  edges: Edge[]
): Node<T>[] => {
  if (!isNode(node)) {
    return [];
  }

  const outgoerIds = edges
    .filter((e) => e.source === node.id)
    .map((e) => e.target);
  return nodes.filter((n) => outgoerIds.includes(n.id));
};

const getIncomers = <T = any, U extends T = T>(
  node: Node<U>,
  nodes: Node<T>[],
  edges: Edge[]
): Node<T>[] => {
  if (!isNode(node)) {
    return [];
  }

  const incomersIds = edges
    .filter((e) => e.target === node.id)
    .map((e) => e.source);
  return nodes.filter((n) => incomersIds.includes(n.id));
};

const isNode = (element: Node | Connection | Edge): element is Node =>
  "id" in element && !("source" in element) && !("target" in element);

const getConnectedEdges = (nodes: Node[], edges: Edge[]): Edge[] => {
  const nodeIds = nodes.map((node) => node.id);

  return edges.filter(
    (edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target)
  );
};

const getStartingInputNodes = (nodes: Node[], edges: Edge[]) => {
  const inputNodes = [];
  for (const node of nodes) {
    const incomingNodes = getIncomers(node, nodes, edges);

    if (incomingNodes.length === 0) {
      inputNodes.push(node);
    }
  }

  return inputNodes;
};

const nodeExecution = async (
  node: Node,
  previousNodes: Node[] = []
): Promise<Node> => {
  const type = node.type;

  // TODO : Improve this VERY bad logic

  try {
    if (type === "OpenAIChatGPTNode" && previousNodes.length === 1) {
      return await executeOpenAIChatGPTNode(node, previousNodes[0]);
    } else if (type === "StableDiffusionNode" && previousNodes.length === 1) {
      return executeStableDiffusionNode(node, previousNodes[0]);
    } else if (type === "WhisperNode" && previousNodes.length === 1) {
      return executeWhisperNode(node, previousNodes[0]);
    } else if (type === "YoloXNode" && previousNodes.length === 1) {
      return executeYoloXNode(node, previousNodes[0]);
    } else if (type === "TortoiseTTSNode" && previousNodes.length === 1) {
      return executeTortoiseTTSNode(node, previousNodes[0]);
    } else if (type === "Vicuna13B" && previousNodes.length === 1) {
      return executeVicuna13BNode(node, previousNodes[0]);
    } else if (type === "DollyV2" && previousNodes.length === 1) {
      return executeDollyV2Node(node, previousNodes[0]);
    } else if (type === "Mpt7b" && previousNodes.length === 1) {
      return executeMpt7bNode(node, previousNodes[0]);
    } else if (type === "OpenAssistant" && previousNodes.length === 1) {
      return executeOpenAssistantNode(node, previousNodes[0]);
    } else if (type === "StableLM" && previousNodes.length === 1) {
      return executeStableLMNode(node, previousNodes[0]);
    } else if (previousNodes.length === 0) {
      node.data.hasComputed = true;
      return node;
    } else if (type === "CreatePromptNode") {
      return executeCreatePromptNode(node, previousNodes);
    } else if (previousNodes.length === 1) {
      node.data = {
        ...node.data,
        hasComputed: true,
        input: previousNodes[0].data.output, // TODO: This is a hack, need to fix this
        output: previousNodes[0].data.output,
      };

      return node;
    } else {
      // window.alert("Invalid Node...");
      // node.data = {
      //   ...node.data,
      //   hasComputed: true,
      //   // input: previousNodes[0].data.output, // TODO: This is a hack, need to fix this
      //   output: node.data.input,
      // };
      // return node;
      // Return error
      throw new Error("Invalid Node");
    }
  } catch (err) {
    console.log("RUN ERROR EXECUTING NODE", err);

    return node;
  }
};
