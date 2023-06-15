import supabase from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const { data, error } = await supabase
    .from("feedback")
    .insert([{ feedback: reqData.feedback, email : reqData.email }]);

  if (error) {
    return NextResponse.json({
      type: "error",
      error: error.message,
    });
  } else {
    return NextResponse.json({
      type: "success",
    });
  }
}
