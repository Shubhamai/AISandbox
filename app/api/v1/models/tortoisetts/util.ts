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

  return node;
};
