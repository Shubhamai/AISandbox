import Replicate from "replicate";
import { Node } from "reactflow";

export const fetchResult = async (data: any) => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
  });

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
  previousNode: Node,
  localExecution: boolean = false
) => {
  let data;

  if (localExecution) {
    const out = await fetch("/api/v1/models/stablediffusion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: previousNode.data.output.text }),
    });

    data = await out.json();
  } else {
    data = await fetchResult({
      text: previousNode.data.output.text,
    });
  }

  node.data.output.image = data.image;
  return node;
};
