import { NextRequest, NextResponse } from "next/server";
import { fetchResult } from "./util";
import { postProcess, preProcess } from "../routeUtils";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const preOut = preProcess(request);

  const data = await request.json();
  const result = await fetchResult(data);

  const response = await postProcess(request, result, preOut);

  return NextResponse.json(response);
}
