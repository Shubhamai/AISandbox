import { Node } from "reactflow";

const executeOpenAIChatGPTNode = (node: Node, previousNode: Node) => {
  node.data.output.text =
    "Here is the output from the model : " + previousNode.data.output.text;

  return node;
};

export default executeOpenAIChatGPTNode;
