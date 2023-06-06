import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const res = await request.json();

  return NextResponse.json({
    data: "This is whisper output ",
  });
}
