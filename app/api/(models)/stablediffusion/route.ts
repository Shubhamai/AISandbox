import { NextRequest, NextResponse } from "next/server";
import { ExecuteStableDuffision } from "./util";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await ExecuteStableDuffision(data);

  return NextResponse.json(res);
}
