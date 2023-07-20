import { NextRequest, NextResponse } from "next/server";
import { fetchResult } from "./util";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = await fetchResult(formData);

  return NextResponse.json(res);
}
