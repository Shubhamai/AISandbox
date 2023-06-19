import Replicate from "replicate";

import { Node } from "reactflow";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export const ExecuteYolox = async (data: any) => {
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

export const executeYoloXNode = async (node: Node, previousNode: Node) => {
  const data = await ExecuteYolox({
    image: previousNode.data.output.image,
  });

  node.data.output.text = data.text;
  node.data.hasComputed = true; // TODO : Is hasC omputed needed?
  return node;
};
