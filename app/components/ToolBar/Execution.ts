import { Node } from "reactflow";
import executeInputTextNode from "../Inputs/Text/Execute";
import executeOpenAIChatGPTNode from "../Model/OpenAIChatGPT/Execute";
import executeOutputTextNode from "../Output/Text/Execute";

const nodeExecution = (node: Node, previousNode: Node) => {
  const type = node.type;
  const data = node.data;

  if (type === "TextInputNode") {
    // return node;
    executeInputTextNode(node, previousNode);
  } else if (type === "OpenAIChatGPTNode") {
    // const modelOutput = {
    //   ...data,
    //   output:
    //     "Here is the output from the model : " + previousNode.data.input_data,
    // };

    // return { ...node, data: modelOutput };
    executeOpenAIChatGPTNode(node, previousNode);
  } else if (type === "TextOutputNode") {
    // if (previousNode.type === "OpenAIChatGPTNode") {
    //   const output = {
    //     ...data,
    //     output: previousNode.data.output,
    //   };
    //   return { ...node, data: output };
    // } else if (previousNode.type === "TextInputNode") {
    //   const output = {
    //     ...data,
    //     output: previousNode.data.input_data,
    //   };
    //   return { ...node, data: output };
    // } else if (previousNode.type === "TextOutputNode") {
    //   const output = {
    //     ...data,
    //     output: previousNode.data.output,
    //   };
    //   return { ...node, data: output };
    // } else {
    //   const output = {
    //     ...data,
    //     output: "Invalid Input",
    //   };
    //   return { ...node, data: output };
    // }
    executeOutputTextNode(node, previousNode);
  } else {
    console.log("Invalid Node...");
  }
};

export default nodeExecution;
