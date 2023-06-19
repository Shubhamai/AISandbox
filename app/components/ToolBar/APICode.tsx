"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon, Webhook } from "lucide-react";
import { useUuid } from "@/app/hooks/useUuid";

export const APICodeDialog = () => {
  const { toast } = useToast();
  const { uuid } = useUuid();

  if (typeof window === "undefined") return null;

  let url = `${window.location.protocol}${window.location.hostname}/api/rdr/${uuid}`;

  const pythonCode = `
  import requests
  
  url = "${url}"
  payload = "{
      "name": "John Doe",
      "age": 30,
      "city": "New York"
  }"
  headers = {
      'Content-Type': 'application/json'
  }
  
  response = requests.request("POST", url, headers=headers, data=payload)
  
  print(response.text)
  `;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="gap-2 bg-background shadow-lg shadow-foreground/5 border bottom-border rounded-full"
          variant="secondary"
        >
          <Webhook /> API Code
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>API Code</DialogTitle>
        <DialogDescription>Python API Code</DialogDescription>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-foreground/70">Endpoint</p>

          <div className="relative border border-border rounded-md px-2 py-2">
            <p className="font-mono font-medium text-foreground/60 whitespace-pre max-w-md overflow-x-scroll scrollbar-none">
              {url}
            </p>

            <Button
              variant="secondary"
              className="absolute gap-2 top-1 right-2 p-3 h-8 transition-all z-20 active:scale-90"
              onClick={() => {
                console.log("click");

                navigator.clipboard.writeText(url);

                toast({ title: "Copied to clipboard :)" });
              }}
            >
              <CopyIcon className="w-3 h-3" />
              Copy url
            </Button>
          </div>

          <div className="flex flex-col gap-1 mt-3">
            <p className="text-sm text-foreground/70">Python Code</p>
          </div>

          <div className="relative border border-border rounded-md px-2 py-2">
            <Button
              variant="secondary"
              className="absolute gap-2 top-4 bg-background right-4 p-3 h-8 transition-all z-20 active:scale-90"
              onClick={() => {
                console.log("click");

                navigator.clipboard.writeText(pythonCode);

                toast({ title: "Copied to clipboard :)" });
              }}
            >
              <CopyIcon className="w-3 h-3" />
              Copy Code
            </Button>

            <div className="max-w-md">
              <SyntaxHighlighter language="python" style={docco}>
                {pythonCode}
              </SyntaxHighlighter>
            </div>

            {/* <div className="font-mono text-foreground/60">{pythonCode}</div> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
