import {
  Brush,
  FileAudioIcon,
  FileVolume2,
  MessagesSquareIcon,
  View,
} from "lucide-react";
import OpenAIChatGPTNode from "./OpenAIChatGPT/Node";
import StableDiffusionNode from "./StableDiffusion/Node";
import TortoiseTTSNode from "./TortoiseTTS/Node";
import WhisperNode from "./Whisper/Node";
import YoloXNode from "./YoloX/Node";

export const modelsNodesData = {
  OpenAIChatGPTNode: {
    name: "OpenAI ChatGPT",
    description: "OpenAI ChatGPT",
    icon: <MessagesSquareIcon />,
  },
  StableDiffusionNode: {
    name: "Stable Diffusion",
    description: "Stable Diffusion",
    icon: <Brush />,
  },
  TortoiseTTSNode: {
    name: "Tortoise TTS",
    description: "Tortoise TTS",
    icon: <FileVolume2 />,
  },
  WhisperNode: {
    name: "Whisper",
    description: "Whisper",
    icon: <FileAudioIcon />,
  },
  YoloXNode: {
    name: "YoloX",
    description: "YoloX",
    icon: <View />,
  },
};

export const modelNodes = {
  OpenAIChatGPTNode,
  StableDiffusionNode,
  WhisperNode,
  YoloXNode,
  TortoiseTTSNode,
};
