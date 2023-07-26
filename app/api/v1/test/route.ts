import redis from "@/app/lib/redis/client";
import { NextRequest, NextResponse } from "next/server";
import type { KVNamespace } from '@cloudflare/workers-types'
export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { AISandbox } = (process.env as unknown as { AISandbox: KVNamespace });
  
  await AISandbox.put("Hi", "Hello");
  
  const value = await AISandbox.get("test");



  // Return 'Hello;
  return NextResponse.json({ data: value });
}
