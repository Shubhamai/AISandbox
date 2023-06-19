import { NextRequest, NextResponse } from "next/server";
import { ExecuteReplicateLLM } from "./util";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await ExecuteReplicateLLM(data);

  return NextResponse.json(res);
}
