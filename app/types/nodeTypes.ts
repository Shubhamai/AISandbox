import { inputNodes } from "../components/Nodes/Inputs/Inputs";
import { modelNodes } from "../components/Nodes/Models/models";
import { outputNodes } from "../components/Nodes/Output/outputs";
import { ToolsNodes } from "../components/Nodes/Tools/tools";
import { utilsNodes } from "../components/Nodes/Utils/Utils";

const allNodes = {
  ...inputNodes,
  ...outputNodes,
  ...modelNodes,
  ...utilsNodes,
  ...ToolsNodes,
};

export { inputNodes, outputNodes, modelNodes, utilsNodes, ToolsNodes };
export default allNodes;
