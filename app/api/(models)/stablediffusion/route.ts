import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { Node } from "reactflow";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export const ExecuteStableDuffision = async (data: any) => {
  const output: any = await replicate.run(
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    {
      input: {
        prompt: data.text,
      },
    }
  );

  return {
    image: output[0],
  };
};

export const executeStableDiffusionNode = async (
  node: Node,
  previousNode: Node
) => {
  const data = await ExecuteStableDuffision({
    text: previousNode.data.output.text,
  });

  node.data.output.image = data.image;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await ExecuteStableDuffision(data);

  return NextResponse.json(res);
}
