import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const output : any = await replicate.run(
    "daanelson/yolox:ae0d70cebf6afb2ac4f5e4375eb599c178238b312c8325a9a114827ba869e3e9",
    {
      input: {
        input_image: data.image,
        return_json: true,
      },
    }
  );

  // console.log(output);

  // TODO : Need to get the audio from the output url

  return NextResponse.json({
    text: output.json_str,
  });
}
