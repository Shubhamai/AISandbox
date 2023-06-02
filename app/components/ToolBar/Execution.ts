import { Node } from "reactflow";
import { executeOpenAIChatGPTNode } from "../Nodes/Models/OpenAIChatGPT/Node";
import { executeStableDiffusionNode } from "../Nodes/Models/StableDiffusion/Node";

const nodeExecution = async (
  node: Node,
  previousNodes: Node[]
): Promise<Node> => {
  const type = node.type;

  if (type === "OpenAIChatGPTNode" && previousNodes.length === 1) {
    return await executeOpenAIChatGPTNode(node, previousNodes[0]);
  } else if (type === "StableDiffusionNode" && previousNodes.length === 2) {
    return executeStableDiffusionNode(node, previousNodes);
  } else if (previousNodes.length === 0) {
    node.data.hasComputed = true;
    return node;
  } else if (previousNodes.length === 1) {
    node.data = {
      ...node.data,
      hasComputed: true,
      input: previousNodes[0].data.output, // TODO: This is a hack, need to fix this
      output: previousNodes[0].data.output,
    };
    return node;
  } else {
    window.alert("Invalid Node...");
    return node;
  }
};

export default nodeExecution;
