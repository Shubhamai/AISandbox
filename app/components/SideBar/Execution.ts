import { Node } from "reactflow";
import executeInputTextNode from "../Nodes/Inputs/Text/Execute";
import executeOpenAIChatGPTNode from "../Nodes/Models/OpenAIChatGPT/Execute";
import executeOutputTextNode from "../Nodes/Output/Text/Execute";

const nodeExecution = (node: Node, previousNode: Node): Node => {
  const type = node.type;
  const data = node.data;

  if (type === "TextInputNode") {
    return executeInputTextNode(node, previousNode);
  } else if (type === "OpenAIChatGPTNode") {
    return executeOpenAIChatGPTNode(node, previousNode);
  } else if (type === "TextOutputNode") {
    return executeOutputTextNode(node, previousNode);
  } else {
    window.alert("Invalid Node...");
    return node;
  }
};

export default nodeExecution;
