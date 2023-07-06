import { NextRequest, NextResponse } from "next/server";
import { Connection, Edge, Node } from "reactflow";
import { executeOpenAIChatGPTNode } from "../../(models)/chatgpt/util";
import { executeCreatePromptNode } from "../../(models)/util";
import { supabaseService } from "@/app/lib/supabase/server";
import { executeStableDiffusionNode } from "../../(models)/stablediffusion/util";
import { executeWhisperNode } from "../../(models)/whisper/util";
import { executeYoloXNode } from "../../(models)/yolox/util";
import { executeTortoiseTTSNode } from "../../(models)/tortoisetts/util";
import {
  executeDollyV2Node,
  executeMpt7bNode,
  executeOpenAssistantNode,
  executeStableLMNode,
  executeVicuna13BNode,
} from "../../(models)/replicatellm/util";
import { ExecuteNodes } from "@/app/lib/execute";
import { Response } from "@/app/utils/response";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const Authorization = request.headers.get("Authorization");
  const ProjectId = request.headers.get("Project");

  if (!Authorization || !ProjectId) {
    return NextResponse.json(
      Response.Error("API Key or Project ID not provided"),
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabaseService
      .from("projects")
      .select("data")
      .eq("id", ProjectId)
      .single();

    if (error) {
      return NextResponse.json(Response.Error(error.message));
    }

    const { nodes, edges } = data.data;

    for (const nodeInput of reqBody.data) {
      const node = nodes.find((n: Node) => n.id === nodeInput.id);
      if (node) {
        node.data.input = nodeInput.data;
        node.data.output = nodeInput.data;
      }
    }

    try {
      let processedOutputs = await ExecuteNodes(
        nodes,
        edges,
        false,
        nodeExecution
      );

      return NextResponse.json(Response.Success(processedOutputs));
    } catch (err: any) {
      return NextResponse.json(Response.Error(err.message));
    }
  } catch (error: any) {
    return NextResponse.json(Response.Error(error.message));
  }
}

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
      throw new Error("Invalid Node");
    }
  } catch (err) {
    console.log("RUN ERROR EXECUTING NODE", err);

    return node;
  }
};
