import { Node } from "reactflow";

export const executeCreatePromptNode = (node: Node, previousNodes: Node[]) => {
  let outText = node.data.input.text;
  for (let previousNode of previousNodes) {
    const nodeId = previousNode.id;

    outText = outText.replace(`\${${nodeId}}`, previousNode.data.output.text);
  }

  node.data.output.text = outText;
  node.data.hasComputed = true;

  return node;
};
