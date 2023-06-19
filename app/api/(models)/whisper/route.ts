import { NextRequest, NextResponse } from "next/server";
import { ExecuteWhisper } from "./util";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = await ExecuteWhisper(formData);

  return NextResponse.json(res);
}
