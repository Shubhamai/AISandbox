import { Node, Panel, useOnSelectionChange } from "reactflow";
import nodeTypes, {
  inputNodes,
  outputNodes,
  modelNodes,
} from "@/app/types/nodeTypes";
import { DragEvent, useState } from "react";
import { Separator } from "@radix-ui/react-context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {

  // TODO : Incomplete work
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      console.log("changed selection", nodes, edges), setSelectedNode(nodes[0]);
    },
  });

  // TODO ends

  return (
    <Panel
      position="top-right"
      // !!selectedNode ? "translate-x-0" : "translate-x-full"
      className={`flex flex-col w-[320px] px-4 py-4 bg-white shadow-lg transition-transform`}
      style={{ margin: 0, top: 72, height: "calc(100vh - 72px)" }}
    >
      <h6 className="text-xl font-bold text-slate-900">GPT4 Node</h6>
      <p className="text-sm text-slate-500">GPT4 node</p>

      <div className="border-t-2 border-solid border-slate-100 mt-6" />

      <div className="flex flex-col mt-4">
        <h6 className="text-xs font-medium text-slate-400 uppercase">
          Settings
        </h6>
        <div className="flex flex-col mt-2">
          <div className="">
            <Label htmlFor="text-input-bar">Input Text</Label>
            <Input name="text-input-bar" type="text" placeholder="text" />
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Settings;
