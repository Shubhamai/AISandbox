import { NextRequest, NextResponse } from "next/server";
import { ExecuteYolox } from "./util";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await ExecuteYolox(data);

  // TODO : Need to get the audio from the output url

  return NextResponse.json(res);
}
