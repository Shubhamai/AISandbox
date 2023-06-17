import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { Node } from "reactflow";

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN as string,
// });

export const executeTortoiseTTSNode = async (
  node: Node,
  previousNode: Node
) => {
  const data = {
    audio: "abcd",
  };

  node.data.output.audio = data.audio;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?

  return node;
};

export const runtime = "edge";

export async function POST(request: NextRequest) {
  // TODO : Complete this

  const data = await request.json();

  // const output = await replicate.run(
  //   "afiaka87/tortoise-tts:e9658de4b325863c4fcdc12d94bb7c9b54cbfe351b7ca1b36860008172b91c71",
  //   {
  //     input: {
  //       text: data.text,
  //     },
  //   }
  // );

  return NextResponse.json({
    audio: "abcd",
  });
}
