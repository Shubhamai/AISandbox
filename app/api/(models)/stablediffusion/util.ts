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
  let startTime = performance.now();

  let data;

  if (localExecution) {
    const out = await fetch("/api/stablediffusion", {
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

  let endTime = performance.now();

  node.data.output.executionTime = endTime - startTime;
  node.data.output.image = data.image;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};
