import { NextResponse } from "next/server";
import { setTimeout as sleep } from "timers/promises";

export async function POST(request: Request) {
  const res = await request.json();
  console.log("GPT", res);

  await sleep(5000);

  return NextResponse.json({
    data: "This is GPT4 prompt output " + res.text,
  });
}
