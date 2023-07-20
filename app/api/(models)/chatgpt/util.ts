import { Node } from "reactflow";

export const fetchResult = async (req: any) => {
  const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

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
  previousNode: Node,
  localExecution: boolean = false
) => {
  try {
    let startTime = performance.now();

    let data;
    if (localExecution) {
      const out = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: previousNode.data.output.text }),
      });
      data = await out.json();
    } else {
      data = await fetchResult({
        text: previousNode.data.output.text,
      });
    }

    let endTime = performance.now();

    node.data.output.executionTime = endTime - startTime;
    node.data.output.text = data.text;
    node.data.hasComputed = true;

    return node;
  } catch (e) {
    console.log("ChatGPT Error : ", e);

    return node;
  }
};
