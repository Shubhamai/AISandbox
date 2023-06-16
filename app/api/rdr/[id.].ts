import supabase from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const { data, error } = await supabase
    .from("user_data")
    .select()
    .eq("id", reqData.id);

  console.log(data, error);

  if (error) {
    return NextResponse.json({
      type: "error",
      error: error.message,
    });
  }

  if (!data) {
    return NextResponse.json({
      type: "error",
      error: "No data found with given Id",
    });
  }

  const nodesData = data[0];

  return NextResponse.json({
    type: "success",
    data: nodesData,
  });
}
