import TextInputNode from "../components/Inputs/Text/Node";
import ImageInputNode from "../components/Inputs/Image/Node";
import OpenAIChatGPTNode from "../components/Model/OpenAIChatGPT/Node";
import StableDiffusionNode from "../components/Model/StableDiffusion/Node";
import TextOutputNode from "../components/Output/Text/Node";
import ImageOutputNode from "../components/Output/Image/Node";

const inputNodes = { TextInputNode, ImageInputNode };
const outputNodes = { TextOutputNode, ImageOutputNode };
const modelNodes = { OpenAIChatGPTNode, StableDiffusionNode };

const allNodes = { ...inputNodes, ...outputNodes, ...modelNodes };

export default allNodes;
