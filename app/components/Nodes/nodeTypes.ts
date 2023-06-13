import { inputNodes, inputNodesData } from "./Inputs/Inputs";
import { modelNodes, modelsNodesData } from "./Models/models";
import { outputNodes, outputNodesData } from "./Output/outputs";
import { ToolsNodes } from "./Tools/tools";
import { utilsNodes, utilsNodesData } from "./Utils/Utils";

const allNodes = {
  ...inputNodes,
  ...outputNodes,
  ...modelNodes,
  ...utilsNodes,
  ...ToolsNodes,
};

const allNodesData = {
  ...inputNodesData,
  ...outputNodesData,
  ...modelsNodesData,
  ...utilsNodesData,
};

export { inputNodes, outputNodes, modelNodes, utilsNodes, ToolsNodes };
export default allNodes;
export { allNodesData };
