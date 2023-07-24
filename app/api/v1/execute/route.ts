import { NextRequest, NextResponse } from "next/server";
import { Node } from "reactflow";
import { supabaseService } from "@/app/lib/supabase/server";
import { ExecuteNodes } from "@/app/lib/execute";
import { Response as ResponseFormat } from "@/app/utils/response";
import { nodeExecution } from "../models/execution";

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

    try {
      let processedOutputs = await ExecuteNodes(
        nodes,
        edges,
        false,
        nodeExecution
      );

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
