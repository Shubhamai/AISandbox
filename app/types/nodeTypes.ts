import { inputNodes } from "../components/Nodes/Inputs/Inputs";
import { modelNodes } from "../components/Nodes/Models/models";
import { outputNodes } from "../components/Nodes/Output/outputs";

const allNodes = { ...inputNodes, ...outputNodes, ...modelNodes };

export { inputNodes, outputNodes, modelNodes };
export default allNodes;
