"use client";

import { cn } from "@/app/utils";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  anOldHope,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const pythonCode = `from aisandbox import execute_project

project_id: str = "91392237-fc87-48b4-b83c-59c6ce0aad9d"
api_key: str = "ais-4ad62b20-74ab-4f55-a5df-856007db6261"

inputs = [{"id": "TextInputNode-dU-gccjt6igEbAVFnYs4x", 
           "data": {"text": "Hello!"}}]

output = execute_project(project_id, api_key, inputs)
print(output.json())


`;

// const javascriptCode = `import { executeProject } from "aisandbox";

// const projectId = "91392237-fc87-48b4-b83c-59c6ce0aad9d";
// apiKey = "ais-4ad62b20-74ab-4f55-a5df-856007db6261";

// const inputs = [
//     { id: "TextInputNode-dU-gccjt6igEbAVFnYs4x", 
//       data: { text: "Hello!" } },
// ];

// const output = await executeProject(projectId, apiKey, inputs);
// console.log(output);
// `;

// const rustCode = `use aisandbox::execute_project;

// let project_id: &str = "91392237-fc87-48b4-b83c-59c6ce0aad9d";
// let api_key: &str = "ais-4ad62b20-74ab-4f55-a5df-856007db6261";

// let inputs = vec![(
//     "TextInputNode-dU-gccjt6igEbAVFnYs4x",
//     json!({ "text": "Hello!" }),
// )];

// let output = execute_project(project_id, api_key, inputs)
//              .unwrap();
// println!("{}", output);`;

const ExampleCodes = () => {
  const [languageCode, setLanguageCode] = useState(pythonCode);
  const [language, setLanguage] = useState("python");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 mb-4">
        <span
          className={cn(
            `cursor-pointer border text-sm uppercase font-semibold border-slate-400 rounded-lg px-2 py-0.5 select-none`,
            language === "python" ? "bg-foreground/90 text-background" : ""
          )}
          onClick={() => {
            setLanguageCode(pythonCode);
            setLanguage("python");
          }}
        >
          Python 3
        </span>
        {/* <span
          className={cn(
            `cursor-pointer border text-sm uppercase font-semibold border-slate-400 rounded-lg px-2 py-0.5 select-none`,
            language === "javascript" ? "bg-foreground/90 text-background" : ""
          )}
          onClick={() => {
            setLanguageCode(javascriptCode);
            setLanguage("javascript");
          }}
        >
          Node.js
        </span>
        <span
          className={cn(
            `cursor-pointer border text-sm uppercase font-semibold border-slate-400 rounded-lg px-2 py-0.5 select-none`,
            language === "rust" ? "bg-foreground/90 text-background" : ""
          )}
          onClick={() => {
            setLanguageCode(rustCode);
            setLanguage("rust");
          }}
        >
          Rust
        </span> */}
      </div>

      <SyntaxHighlighter language={language} style={anOldHope} showLineNumbers>
        {languageCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default ExampleCodes;
