import { NextRequest, NextResponse } from "next/server";
import { fetchResult } from "./util";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await fetchResult(data);

  return NextResponse.json(res);
}
