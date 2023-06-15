import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

export async function POST(request: NextRequest) {
  const res = await request.json();

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: res.text }],
  };

  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const completion = await result.json();

  return NextResponse.json({
    text: completion.choices[0].message?.content,
  });
}
