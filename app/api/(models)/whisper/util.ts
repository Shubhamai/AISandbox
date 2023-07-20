import axios from "axios";
import { Node } from "reactflow";

export const runtime = "edge";
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

export const fetchResult = async (formData: any) => {
  // console.log("formData", formData);
  // const formData = await req.formData();

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

export const executeWhisperNode = async (node: Node, previousNode: Node, localExecution : boolean = false) => {
  let startTime = performance.now();

  const newForm = new FormData();
  newForm.append("model", "whisper-1");

  newForm.append("file", previousNode.data.output.audio, "audio.webm");

  let data;
  if (localExecution) {
    const out = await axios.post("/api/whisper", newForm);
    data = await out.data;
  } else {
    data = await fetchResult(newForm);
  }


  let endTime = performance.now();

  node.data.output.executionTime = endTime - startTime;
  node.data.output.text = data.text;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};
