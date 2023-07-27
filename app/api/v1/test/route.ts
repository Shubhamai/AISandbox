import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const value = "Hello!";

  // Return 'Hello;
  return NextResponse.json({ data: value });
}
