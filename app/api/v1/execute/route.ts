// TODO : Weebhook might be a better option for this

import { NextRequest, NextResponse } from "next/server";
import { Node } from "reactflow";
import { supabaseService } from "@/app/lib/supabase/server";
import { ExecuteNodes } from "@/app/lib/execute";
import { Response as ResponseFormat } from "@/app/utils/response";
import { nodeExecution } from "../models/execution";
import { modelNodesDataKeys } from "@/app/components/Nodes/Models/modelKeys";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const Authorization = request.headers.get("Authorization");
  const ProjectId = request.headers.get("Project");

  if (!Authorization || !ProjectId) {
    return NextResponse.json(
      ResponseFormat.Error("API Key or Project ID not provided"),
      { status: 401 }
    );
  }

  // return NextResponse.json(ResponseFormat.Error("Sample output"));

  try {
    const { data, error } = await supabaseService
      .from("projects")
      .select("data")
      .eq("id", ProjectId)
      .single();

    if (error) {
      return NextResponse.json(ResponseFormat.Error(error.message));
    }

    const { nodes, edges } = data.data;

    for (const nodeInput of reqBody.data) {
      const node = nodes.find((n: Node) => n.id === nodeInput.id);
      if (node) {
        node.data.input = nodeInput.data;
        node.data.output = nodeInput.data;
      }
    }

    let totalCost = 0;

    // TODO : Unsure if this is the best way to calculate cost and it's safety
    for (const node of nodes) {
      if (modelNodesDataKeys.includes(node.type)) {
        totalCost += 0.02; // TODO : Per post should be in config
      }
    }

    try {
      // TODO : Might not be the best way to calculate execution time
      const startTime = Date.now();
      let processedOutputs = await ExecuteNodes(
        nodes,
        edges,
        false,
        nodeExecution
      );
      const endTime = Date.now();
      const responseTimeInMs = endTime - startTime;

      const { data: usageData, error: usageError } = await supabaseService
        .from("apiusage")
        .insert([
          {
            project_id: ProjectId,
            user_id: request.headers.get("UserId"),
            api_key: request.headers.get("APIKeyId"),
            cost: totalCost,
            execution_time: responseTimeInMs,
          },
        ])
        .select();

      if (usageError) {
        return NextResponse.json(ResponseFormat.Error(usageError.message));
      }

      return new Response(JSON.stringify(processedOutputs), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, Project",
        },
      });
    } catch (err: any) {
      return NextResponse.json(ResponseFormat.Error(err.message));
    }
  } catch (error: any) {
    return NextResponse.json(ResponseFormat.Error(error.message));
  }
}
