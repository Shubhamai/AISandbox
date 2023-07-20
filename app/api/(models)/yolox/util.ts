import Replicate from "replicate";

import { Node } from "reactflow";

export const fetchResult = async (data: any) => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
  });

  const output: any = await replicate.run(
    "daanelson/yolox:ae0d70cebf6afb2ac4f5e4375eb599c178238b312c8325a9a114827ba869e3e9",
    {
      input: {
        input_image: data.image,
        return_json: true,
      },
    }
  );

  return {
    text: output.json_str,
  };
};

export const executeYoloXNode = async (
  node: Node,
  previousNode: Node,
  localExecution: boolean = false
) => {
  let startTime = performance.now();

  let data;
  if (localExecution) {
    const out = await fetch("/api/yolox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: previousNode.data.output.image }),
    });

    data = await out.json();
  } else {
    data = await fetchResult({
      image: previousNode.data.output.image,
    });
  }

  let endTime = performance.now();

  node.data.output.executionTime = endTime - startTime;
  node.data.output.text = data.text;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};
