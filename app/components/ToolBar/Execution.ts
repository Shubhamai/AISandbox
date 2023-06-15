import { Node } from "reactflow";
import { executeOpenAIChatGPTNode } from "../Nodes/Models/OpenAIChatGPT/Node";
import { executeStableDiffusionNode } from "../Nodes/Models/StableDiffusion/Node";
import { executeWhisperNode } from "../Nodes/Models/Whisper/Node";
import { executeYoloXNode } from "../Nodes/Models/YoloX/Node";
import { executeTortoiseTTSNode } from "../Nodes/Models/TortoiseTTS/Node";
import { executeCreatePromptNode } from "../Nodes/Utils/CreatePrompt";
import { executeVicuna13BNode } from "../Nodes/Models/ReplicateLLMs/vicuna13b";
import { executeDollyV2Node } from "../Nodes/Models/ReplicateLLMs/dollyv2";
import { executeMpt7bNode } from "../Nodes/Models/ReplicateLLMs/mpt7b";
import { executeOpenAssistantNode } from "../Nodes/Models/ReplicateLLMs/oasst12b";
import { executeStableLMNode } from "../Nodes/Models/ReplicateLLMs/stablelm";

const nodeExecution = async (
  node: Node,
  previousNodes: Node[]
): Promise<Node> => {
  const type = node.type;

  console.log(node);

  // TODO : Improve this VERY bad logic

  if (type === "OpenAIChatGPTNode" && previousNodes.length === 1) {
    return await executeOpenAIChatGPTNode(node, previousNodes[0]);
  } else if (type === "StableDiffusionNode" && previousNodes.length === 2) {
    return executeStableDiffusionNode(node, previousNodes);
  } else if (type === "WhisperNode" && previousNodes.length === 1) {
    return executeWhisperNode(node, previousNodes[0]);
  } else if (type === "YoloXNode" && previousNodes.length === 1) {
    return executeYoloXNode(node, previousNodes[0]);
  } else if (type === "TortoiseTTSNode" && previousNodes.length === 1) {
    return executeTortoiseTTSNode(node, previousNodes[0]);
  } else if (type === "Vicuna13B" && previousNodes.length === 1) {
    return executeVicuna13BNode(node, previousNodes[0]);
  } else if (type === "DollyV2" && previousNodes.length === 1) {
    return executeDollyV2Node(node, previousNodes[0]);
  } else if (type === "Mpt7b" && previousNodes.length === 1) {
    return executeMpt7bNode(node, previousNodes[0]);
  } else if (type === "OpenAssistant" && previousNodes.length === 1) {
    return executeOpenAssistantNode(node, previousNodes[0]);
  } else if (type === "StableLM" && previousNodes.length === 1) {
    return executeStableLMNode(node, previousNodes[0]);
  } else if (previousNodes.length === 0) {
    node.data.hasComputed = true;
    return node;
  } else if (type === "CreatePromptNode") {
    return executeCreatePromptNode(node, previousNodes);
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
