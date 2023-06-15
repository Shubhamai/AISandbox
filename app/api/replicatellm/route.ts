import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});


export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const output : any = await replicate.run(
    data.model_url,
    {
      input: {
        prompt: data.text,
      },
    }
  );

  console.log(output, data.model_url);

  const outputText = output.join(' ');

  return NextResponse.json({
    text: outputText,
  });
}
