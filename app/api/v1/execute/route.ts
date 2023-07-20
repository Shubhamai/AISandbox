import { NextRequest, NextResponse } from "next/server";
import { Node } from "reactflow";
import { supabaseService } from "@/app/lib/supabase/server";
import { ExecuteNodes } from "@/app/lib/execute";
import { Response } from "@/app/utils/response";
import { nodeExecution } from "../../(models)/execution";

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

