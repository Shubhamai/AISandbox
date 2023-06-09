import { FileType2, Speaker, ImagePlus, ScrollText } from "lucide-react";
import AudioOutputNode from "./Audio/Note";
import ImageOutputNode from "./Image/Node";
import TextOutputNode from "./Text/Node";

export const outputNodesData = {
  AudioOutputNode: {
    name: "Audio",
    description: "Audio Output",
    icon: <Speaker />,
  },
  ImageOutputNode: {
    name: "Image",
    description: "Image Output",
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: <ImagePlus />,
  },
  TextOutputNode: {
    name: "Text",
    description: "Text Output",
    icon: <ScrollText />,
  },
};

export const outputNodes = { TextOutputNode, ImageOutputNode, AudioOutputNode };
