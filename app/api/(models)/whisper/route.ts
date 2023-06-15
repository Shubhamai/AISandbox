import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const result = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  const transcript = await result.json();

  console.log(transcript);

  return NextResponse.json({ text: transcript.text });
}
