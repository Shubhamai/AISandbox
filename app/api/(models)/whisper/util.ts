import { Node } from "reactflow";

export const runtime = "edge";
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

export const ExecuteWhisper = async (req: any) => {
  const formData = await req.formData();

  const result = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  const transcript = await result.json();

  return { text: transcript.text };
};

export const executeWhisperNode = async (node: Node, previousNode: Node) => {
  const newForm = new FormData();
  newForm.append("model", "whisper-1");

  newForm.append("file", previousNode.data.output.audio, "audio.webm");

  const response = await ExecuteWhisper(newForm);

  node.data.output.text = response.text;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};
