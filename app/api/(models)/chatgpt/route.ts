import { NextRequest, NextResponse } from "next/server";
import { ExecuteChatGPT } from "./util";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await ExecuteChatGPT(req);

  return NextResponse.json(res);
}
