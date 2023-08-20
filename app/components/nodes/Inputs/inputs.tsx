import { Image, FileType2, Mic2 } from "lucide-react";
import AudioInputNode from "./Audio/Node";
import ImageInputNode from "./Image";
import TextInputNode from "./Text";

export const inputNodesData = {
  AudioInputNode: {
    name: "Audio",
    description: "Record or Upload Audio Input",
    icon: <Mic2 />,
  },
  ImageInputNode: {
    name: "Image",
    description: "Upload your Image",
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: <Image />,
  },
  TextInputNode: {
    name: "Text",
    description: "Text as input",
    icon: <FileType2 />,
  },
};

export const inputNodes = { TextInputNode, ImageInputNode, AudioInputNode };
