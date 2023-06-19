import { NextRequest, NextResponse } from "next/server";
import { ExecuteWhisper } from "./util";

export async function POST(req: NextRequest) {
  const res = await ExecuteWhisper(req);
  return NextResponse.json(res);
}
