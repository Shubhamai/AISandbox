import { NextRequest, NextResponse } from "next/server";
import { fetchResult } from "./util";
import { postProcess, preProcess } from "../routeUtils";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const preOut = preProcess(request);

  const req = await request.json();
  const result = await fetchResult(req);

  const response = await postProcess(request, result, preOut);

  return NextResponse.json(response);
}
