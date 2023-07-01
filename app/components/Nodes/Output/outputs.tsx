import { FileType2, Speaker, ImagePlus, ScrollText } from "lucide-react";
import AudioOutputNode from "./Audio";
import ImageOutputNode from "./Image";
import TextOutputNode from "./Text";

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
