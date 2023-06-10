import { Panel } from "reactflow";
import useAppState from "@/app/state/appState";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { inputNodesData } from "../Nodes/Inputs/Inputs";
import SidebarSection from "./SidebarSection";
import { modelsNodesData } from "../Nodes/Models/models";
import { outputNodesData } from "../Nodes/Output/outputs";
import { utilsNodesData } from "../Nodes/Utils/Utils";

const SideBar = () => {
  const { showSidebar } = useAppState((s) => ({
    showSidebar: s.showSidebar,
  }));

  return (
    <Panel
      position="top-left"
      className={`flex flex-col items-center gap-2 w-[250px] px-4 py-4 bg-white shadow-lg transition overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ margin: 0, top: 72, height: "calc(100vh - 72px)" }}
    >
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Inputs</AccordionTrigger>
          <AccordionContent>
            <SidebarSection nodesData={inputNodesData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Models</AccordionTrigger>
          <AccordionContent>
            <SidebarSection nodesData={modelsNodesData} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Outputs</AccordionTrigger>
          <AccordionContent>
            <SidebarSection nodesData={outputNodesData} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Utils</AccordionTrigger>
          <AccordionContent>
            <SidebarSection nodesData={utilsNodesData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Panel>
  );
};

export default SideBar;
