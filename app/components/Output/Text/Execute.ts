import { Node } from "reactflow";

const executeOutputTextNode = (node: Node, previousNode: Node) => {
  if (previousNode.type === "OpenAIChatGPTNode") {
    node.data.output.text = previousNode.data.output.text;
    console.log("node", node);
    return node;
  } else if (previousNode.type === "TextInputNode") {
    node.data.output.text = previousNode.data.output.text;
    return node;
  } else if (previousNode.type === "TextOutputNode") {
    node.data.output.text = previousNode.data.output.text;
    return node;
  } else {
    node.data.output.text = "No output from previous node";
    return node;
  }
};

export default executeOutputTextNode;
