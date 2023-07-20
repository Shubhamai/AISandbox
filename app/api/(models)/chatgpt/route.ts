import { NextRequest, NextResponse } from "next/server";
import { fetchResult } from "./util";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await fetchResult(req);

  return NextResponse.json(res);
}
