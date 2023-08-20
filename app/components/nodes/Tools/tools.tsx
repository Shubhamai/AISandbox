import { Type, Square } from "lucide-react";
import HeadingTool from "./Heading";
import RectangleTool from "./Rectangle";

export const ToolsNodesData = {
  HeadingTool: {
    name: "HeadingTool",
    description: "Heading Text",
    icon: <Type size={20} />,
  },
  RectangleTool: {
    name: "RectangleTool",
    description: "Rectangle",
    icon: <Square size={22} />,
  },
};
export const ToolsNodes = { HeadingTool, RectangleTool };
