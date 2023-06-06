import TextInputNode from "../components/Nodes/Inputs/Text/Node";
import ImageInputNode from "../components/Nodes/Inputs/Image/Node";
import OpenAIChatGPTNode from "../components/Nodes/Models/OpenAIChatGPT/Node";
import StableDiffusionNode from "../components/Nodes/Models/StableDiffusion/Node";
import TextOutputNode from "../components/Nodes/Output/Text/Node";
import ImageOutputNode from "../components/Nodes/Output/Image/Node";
import AudioInputNode from "../components/Nodes/Inputs/Audio/Node";
import WhisperNode from "../components/Nodes/Models/Whisper/Node";

const inputNodes = { TextInputNode, ImageInputNode, AudioInputNode };
const outputNodes = { TextOutputNode, ImageOutputNode };
const modelNodes = { OpenAIChatGPTNode, StableDiffusionNode, WhisperNode };

const allNodes = { ...inputNodes, ...outputNodes, ...modelNodes };

export { inputNodes, outputNodes, modelNodes };
export default allNodes;
