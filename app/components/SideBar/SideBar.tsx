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
import { Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SideBar = () => {
  const { showSidebar, setShowSidebar, zenMode } = useAppState();

  return (
    <Panel
      position="top-left"
      className={`flex flex-row items-start w-[270px] transition rounded-lg  ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } ${zenMode ? "hidden" : ""}`}
      style={{ top: 150 }}
    >
      <Accordion
        type="multiple"
        className="w-full bg-background px-2 max-h-[700px] shadow-xl rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-background"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Inputs</AccordionTrigger>
          <AccordionContent>
            <SidebarSection nodesData={inputNodesData} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="items-start">Models</AccordionTrigger>
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
      {zenMode ? (
        <></>
      ) : (
        <Button
          className={`${
            showSidebar ? "translate-x-2" : "translate-x-10"
          } bg-background shadow-lg rounded-full p-[10px]`}
          variant="outline"
          size="sm"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      )}
    </Panel>
  );
};

export default SideBar;
