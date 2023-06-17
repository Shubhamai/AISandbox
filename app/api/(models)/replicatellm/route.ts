import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { Node } from "reactflow";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export const ExecuteReplicateLLM = async (data: any) => {
  const output: any = await replicate.run(data.model_url, {
    input: {
      prompt: data.text,
    },
  });

  console.log(output, data.model_url);

  const outputText = output.join(" ");

  return {
    text: outputText,
  };
};

export const executeDollyV2Node = async (node: Node, previousNode: Node) => {
  const data = await ExecuteReplicateLLM({
    model_url:
      "replicate/dolly-v2-12b:ef0e1aefc61f8e096ebe4db6b2bacc297daf2ef6899f0f7e001ec445893500e5",
    text: previousNode.data.output.text,
  });

  node.data.output.text = data.text;
  node.data.hasComputed = true;
  return node;
};

export const executeMpt7bNode = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const data = await ExecuteReplicateLLM({
    model_url:
      "replicate/mpt-7b-storywriter:a38b8ba0d73d328040e40ecfbb2f63a938dec8695fe15dfbd4218fa0ac3e76bf",
    text: previousNode.data.output.text,
  });

  let endTime = performance.now();

  node.data.output.text = data.text;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true;
  return node;
};

export const executeOpenAssistantNode = async (
  node: Node,
  previousNode: Node
) => {
  let startTime = performance.now();

  const data = await ExecuteReplicateLLM({
    model_url:
      "replicate/oasst-sft-1-pythia-12b:28d1875590308642710f46489b97632c0df55adb5078d43064e1dc0bf68117c3",
    text: previousNode.data.output.text,
  });

  let endTime = performance.now();

  node.data.output.text = data.text;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true;
  return node;
};

export const executeStableLMNode = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const data = await ExecuteReplicateLLM({
    model_url:
      "stability-ai/stablelm-tuned-alpha-7b:c49dae362cbaecd2ceabb5bd34fdb68413c4ff775111fea065d259d577757beb",
    text: previousNode.data.output.text,
  });

  let endTime = performance.now();

  node.data.output.text = data.text;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true;
  return node;
};

export const executeVicuna13BNode = async (node: Node, previousNode: Node) => {
  let startTime = performance.now();

  const data = await ExecuteReplicateLLM({
    model_url:
      "replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b",
    text: previousNode.data.output.text,
  });

  let endTime = performance.now();

  node.data.output.text = data.text;
  node.data.output.executionTime = endTime - startTime;
  node.data.hasComputed = true;
  return node;
};

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const res = await ExecuteReplicateLLM(data);

  return NextResponse.json(res);
}
