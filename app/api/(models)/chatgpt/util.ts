import { Node } from "reactflow";

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

export const ExecuteChatGPT = async (req: any) => {
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.text }],
  };

  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const completion = await result.json();

  return {
    text: completion.choices[0].message?.content,
  };
};

export const executeOpenAIChatGPTNode = async (
  node: Node,
  previousNode: Node
) => {
  try {
    const data = await ExecuteChatGPT({ text: previousNode.data.output.text });

    node.data.output.text = data.text;
    node.data.hasComputed = true;

    return node;
  } catch (e) {
    console.log("OPENAI CHARGPT EXECUTE ERROR", e);

    return node;
  }
};
