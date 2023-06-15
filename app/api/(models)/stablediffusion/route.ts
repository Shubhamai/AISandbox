import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const output: any = await replicate.run(
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    {
      input: {
        prompt: data.text,
      },
    }
  );

  console.log(output);
  return NextResponse.json({
    image: output[0],
  });
}
