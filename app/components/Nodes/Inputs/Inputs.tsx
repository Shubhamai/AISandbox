import { Image, FileType2, Mic2 } from "lucide-react";
import AudioInputNode from "./Audio/Node";
import ImageInputNode from "./Image/Node";
import TextInputNode from "./Text/Node";

export const inputNodesData = {
  AudioInputNode: {
    name: "Audio",
    description: "Audio Input",
    icon: <Mic2 />,
  },
  ImageInputNode: {
    name: "Image",
    description: "Image Input",
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: <Image />,
  },
  TextInputNode: {
    name: "Text",
    description: "Text Input",
    icon: <FileType2 />,
  },
};

export const inputNodes = { TextInputNode, ImageInputNode, AudioInputNode };
