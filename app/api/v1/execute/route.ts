// TODO : Weebhook might be a better option for this

import { NextRequest, NextResponse } from "next/server";
import { Node } from "reactflow";
import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { ExecuteNodes } from "@/app/lib/execute";
import { Response as ResponseFormat } from "@/app/utils/response";
import { nodeExecution } from "../models/execution";
import { modelNodesDataKeys } from "@/app/components/Nodes/Models/modelKeys";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

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
    const { data, error } = await supabaseAdmin
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
    let includedModels = [];
    for (const node of nodes) {
      if (modelNodesDataKeys.includes(node.type)) {
        totalCost += 0.02; // TODO : Per post should be in config
        includedModels.push(node.type);
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

      const { data: usageData, error: usageError } =
        await // NOTE: No await set to avoid blocking the request
        supabaseAdmin
          .from("apiusage")
          .insert([
            {
              project_id: ProjectId,
              user_id: request.headers.get("UserId"),
              api_key: request.headers.get("APIKeyId"),
              cost: totalCost,
              execution_time: responseTimeInMs,
              source: "API",
              description: `Executed ${includedModels.join(", ")}`,
            },
          ])
          .select();

      if (usageError) {
        return NextResponse.json(ResponseFormat.Error(usageError.message));
      }

      // Stripe billing
      const { data: customerData, error: customerError } =
        await // NOTE: No await set to avoid blocking the request
        supabaseAdmin
          .from("users")
          .select("itemId")
          .eq("user_id", request.headers.get("UserId"))
          .single();

      if (customerError) {
        return NextResponse.json(ResponseFormat.Error(customerError.message));
      }

      const record = await stripe.subscriptionItems.createUsageRecord(
        customerData?.itemId,
        {
          quantity: includedModels.length,
          timestamp: "now",
          action: "increment",
        }
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
