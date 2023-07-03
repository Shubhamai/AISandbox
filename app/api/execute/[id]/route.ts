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
  const Project = request.headers.get("Project");

  if (!Authorization || !Project) {
    return NextResponse.json(
      Response.Error("API Key or Project ID not provided"),
      { status: 401 }
    );
  } else {
    return NextResponse.json(
      Response.Success("API Key and Project ID provided"),
      { status: 200 }
    );
  }

  // const nodesInput = reqData;

  // let id = context?.params.id;

  // try {
  //   // GET NODES & EDGES DATA
  //   const { data, error } = await supabaseService
  //     .from("data")
  //     .select()
  //     .eq("id", id)
  //     .single();

  //   if (error) {
  //     console.log("ERROR SUPABASE");

  //     return NextResponse.json({
  //       type: "error",
  //       error: error.message,
  //     });
  //   }

  //   if (!data || !data.data) {
  //     console.log("ERROR SUPABASE NO DATA");

  //     return NextResponse.json({
  //       type: "error",
  //       error: "No data found with given Id",
  //     });
  //   }

  //   const { nodes, edges } = JSON.parse(data.data);

  //   for (const nodeInput of nodesInput.data) {
  //     const node = nodes.find((n: Node) => n.id === nodeInput.id);
  //     if (node) {
  //       node.data.input = nodeInput.data;
  //       node.data.output = nodeInput.data;
  //     }
  //   }

  //   // EXECUTE
  //   try {
  //     let processedOutputs = await ExecuteNodes(nodes, edges, false, nodeExecution);

  //     return NextResponse.json({
  //       type: "success",
  //       data: processedOutputs,
  //     });
  //   } catch (err: any) {
  //     console.log("ERROR EXECUTING", err);

  //     return NextResponse.json({
  //       type: "error",
  //       error: err.message,
  //     });
  //   }
  // } catch (error: any) {
  //   console.log("ERROR API ROUTE", error);

  //   return NextResponse.json({
  //     type: "error",
  //     error: error.message,
  //   });
  // }
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
