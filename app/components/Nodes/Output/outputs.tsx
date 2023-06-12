import { FileType2, Speaker, ImagePlus, ScrollText } from "lucide-react";
import AudioOutputNode from "./Audio/Note";
import ImageOutputNode from "./Image/Node";
import TextOutputNode from "./Text/Node";

export const outputNodesData = {
  AudioOutputNode: {
    name: "Audio",
    description: "Output audio",
    icon: <Speaker />,
  },
  ImageOutputNode: {
    name: "Image",
    description: "Output image",
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: <ImagePlus />,
  },
  TextOutputNode: {
    name: "Text",
    description: "Output text",
    icon: <ScrollText />,
  },
};

export const outputNodes = { TextOutputNode, ImageOutputNode, AudioOutputNode };
