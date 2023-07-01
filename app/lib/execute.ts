import { Connection, Edge, Node } from "reactflow";

export const ExecuteNodes = async (
  nodes: Node[],
  edges: Edge[],
  isFrontEnd: boolean = false,
  nodeExecution: (node: Node, previousNodes: Node[]) => Promise<Node>,
  resetNodesIsComputed: () => void = () => {},
  updateNodeData: (id: string, data: any) => void = () => {},
  updateEdgeData: (id: string, data: any) => void = () => {}
): Promise<
  Array<{
    id: string | number;
    data: any;
    type: any;
  }>
> => {
  if (isFrontEnd) {
    resetNodesIsComputed();
  }
  // for (const nodeInput of nodesInput.data) {
  //     const node = nodes.find((n: Node) => n.id === nodeInput.id);
  //     if (node) {
  //       node.data.input = nodeInput.data;
  //       node.data.output = nodeInput.data;
  //     }
  //   }

  // EXECUTE
  //   try {
  // Create a queue to manage nodes to process and a set to keep track of visited nodes
  let queue = getStartingInputNodes(nodes, edges);
  let visited = new Set();

  // FINAL OUTPUT NODES DATA
  const outputs: Node[] = [];

  while (queue.length > 0) {
    let node = queue.shift(); // Remove node from the front of the queue

    // If we've already visited this node, skip it
    if (node === undefined || visited.has(node.id)) {
      continue;
    }

    // Get incoming and outgoing nodes
    const incomingNodes = getIncomers(node, nodes, edges);
    const outgoingNodes = getOutgoers(node, nodes, edges);

    const allInputsComputed = incomingNodes.every((n) => n.data.hasComputed);

    if (allInputsComputed) {
      visited.add(node.id);

      const updatedNode = await nodeExecution(node, incomingNodes || []);
      // console.log(updatedNode.id, updatedNode.data.output);
      node = updatedNode;
      if (isFrontEnd) {
        updateNodeData(updatedNode.id, { ...updatedNode.data });
      }
      //   updateNodeData(updatedNode.id, { ...updatedNode.data });
      queue.push(...outgoingNodes.filter((n) => !visited.has(n.id)));

      // is this node an output node?
      if (
        !!getIncomers(updatedNode, nodes, edges).length &&
        !getOutgoers(updatedNode, nodes, edges).length
      ) {
        outputs.push(updatedNode);
      }

      if (isFrontEnd) {
        for (const edge of getConnectedEdges(queue, edges)) {
          // if (edge.source === node.id) {
          // const updatedEdge = await nodeExecution(edge, incomingNodes);
          updateEdgeData(edge.id, { animated: true });
          // }
        }
      }
      // Update edges
      //   for (const edge of getConnectedEdges(queue, edges)) {
      // if (edge.source === node.id) {
      // const updatedEdge = await nodeExecution(edge, incomingNodes);
      // updateEdgeData(edge.id, { animated: true });
      // }
      //   }
    }

    queue.push(...incomingNodes.filter((n) => !visited.has(n.id)));
  }

  if (isFrontEnd) {
    for (const edge of edges) {
      updateEdgeData(edge.id, { animated: false });
    }
  }

  // return OutputData
  let processedOutputs = [];
  for (let output of outputs) {
    // console.log("OUTPUT", output.id, output.data.output);
    processedOutputs.push({
      id: output.id,
      data: output.data.output,
      type: output.type,
    });
  }

  return processedOutputs;
};

const getOutgoers = <T = any, U extends T = T>(
  node: Node<U>,
  nodes: Node<T>[],
  edges: Edge[]
): Node<T>[] => {
  if (!isNode(node)) {
    return [];
  }

  const outgoerIds = edges
    .filter((e) => e.source === node.id)
    .map((e) => e.target);
  return nodes.filter((n) => outgoerIds.includes(n.id));
};

const getIncomers = <T = any, U extends T = T>(
  node: Node<U>,
  nodes: Node<T>[],
  edges: Edge[]
): Node<T>[] => {
  if (!isNode(node)) {
    return [];
  }

  const incomersIds = edges
    .filter((e) => e.target === node.id)
    .map((e) => e.source);
  return nodes.filter((n) => incomersIds.includes(n.id));
};

const isNode = (element: Node | Connection | Edge): element is Node =>
  "id" in element && !("source" in element) && !("target" in element);

const getConnectedEdges = (nodes: Node[], edges: Edge[]): Edge[] => {
  const nodeIds = nodes.map((node) => node.id);

  return edges.filter(
    (edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target)
  );
};

export const getStartingInputNodes = (nodes: Node[], edges: Edge[]) => {
  const inputNodes = [];
  for (const node of nodes) {
    const incomingNodes = getIncomers(node, nodes, edges);

    if (incomingNodes.length === 0) {
      inputNodes.push(node);
    }
  }

  return inputNodes;
};
