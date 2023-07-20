import { executeOpenAIChatGPTNode } from "@/app/api/(models)/chatgpt/util";
import { executeStableDiffusionNode } from "@/app/api/(models)/stablediffusion/util";
import { executeWhisperNode } from "@/app/api/(models)/whisper/util";
import { executeYoloXNode } from "@/app/api/(models)/yolox/util";
import { executeTortoiseTTSNode } from "@/app/api/(models)/tortoisetts/util";
import { executeVicuna13BNode } from "@/app/api/(models)/replicatellm/util";
import { executeDollyV2Node } from "@/app/api/(models)/replicatellm/util";
import { executeMpt7bNode } from "@/app/api/(models)/replicatellm/util";
import { executeOpenAssistantNode } from "@/app/api/(models)/replicatellm/util";
import { executeStableLMNode } from "@/app/api/(models)/replicatellm/util";
import { Node } from "reactflow";
import { executeCreatePromptNode } from "./others/utils";


const modelFuncMapping = {
  OpenAIChatGPTNode: executeOpenAIChatGPTNode,
  StableDiffusionNode: executeStableDiffusionNode,
  WhisperNode: executeWhisperNode,
  YoloXNode: executeYoloXNode,
  TortoiseTTSNode: executeTortoiseTTSNode,
  Vicuna13B: executeVicuna13BNode,
  DollyV2: executeDollyV2Node,
  Mpt7b: executeMpt7bNode,
  OpenAssistant: executeOpenAssistantNode,
  StableLM: executeStableLMNode,
};


export const nodeExecution = async (
  node: Node,
  previousNodes: Node[]
): Promise<Node> => {
  const type = node.type;
  const localExecution = true;

  // TODO : Improve this VERY bad logic

  if (type === undefined) {
    throw new Error("Invalid Node");
  }

  // TODO : Improve this VERY bad logic

  try {
    if (
      previousNodes.length === 1 &&
      modelFuncMapping[type as keyof typeof modelFuncMapping]
    ) {
      return await modelFuncMapping[type as keyof typeof modelFuncMapping](
        node,
        previousNodes[0],
        localExecution
      );
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
      throw new Error("Invalid Node");
    }
  } catch (err) {
    console.log("RUN ERROR EXECUTING NODE", err);
    return node;
  }
};
