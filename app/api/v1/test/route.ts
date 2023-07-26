import redis from "@/app/lib/redis/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const value = await redis.get("test");

  // Return 'Hello;
  return NextResponse.json({ data: value });
}
