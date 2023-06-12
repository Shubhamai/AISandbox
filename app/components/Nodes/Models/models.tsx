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
    name: "ChatGPT",
    description: "OpenAI's ChatGPT model",
    icon: <MessagesSquareIcon />,
  },
  StableDiffusionNode: {
    name: "Stable Diffusion",
    description: "Image generation using Stable Diffusion",
    icon: <Brush />,
  },
  TortoiseTTSNode: {
    name: "Tortoise TTS",
    description: "Text to speech using Tortoise TTS",
    icon: <FileVolume2 />,
  },
  WhisperNode: {
    name: "Whisper",
    description: "Speech to text using OpenAI Whisper",
    icon: <FileAudioIcon />,
  },
  YoloXNode: {
    name: "YoloX",
    description: "Object detection using YoloX",
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
