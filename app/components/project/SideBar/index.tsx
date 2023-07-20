import { Panel } from "reactflow";
import useAppState from "@/app/state/appState";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { inputNodesData } from "../../Nodes/Inputs/Inputs";
import SidebarSection from "./SidebarSection";
import { modelsNodesData } from "../../Nodes/Models/models";
import { outputNodesData } from "../../Nodes/Output/outputs";
import { utilsNodesData } from "../../Nodes/Others/Utils";
import { Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import SideBarSearch from "./Search";
import { useState } from "react";

const SideBar = () => {
  const { showSidebar, setShowSidebar, zenMode } = useAppState();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Panel
      position="top-left"
      className={`flex flex-row items-start w-[270px] transition rounded-lg  ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } ${zenMode ? "hidden" : ""}`}
      style={{ top: 150 }}
    >
      <div className="flex flex-col items-center gap-2">
        <SideBarSearch isFocused={isFocused} setIsFocused={setIsFocused} />

        {!isFocused ? (
          <Accordion
            type="multiple"
            className="w-full bg-background px-4 max-h-[700px] shadow-xl rounded-lg overflow-y-scroll scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-background border-[1px] border-solid border-foreground/10"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="items-start select-none">
                Inputs
              </AccordionTrigger>
              <AccordionContent>
                <SidebarSection nodesData={inputNodesData} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="items-start select-none">
                Models
              </AccordionTrigger>
              <AccordionContent>
                <SidebarSection nodesData={modelsNodesData} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="items-start select-none">
                Outputs
              </AccordionTrigger>
              <AccordionContent>
                <SidebarSection nodesData={outputNodesData} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="items-start select-none">
                Utils
              </AccordionTrigger>
              <AccordionContent>
                <SidebarSection nodesData={utilsNodesData} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <></>
        )}
      </div>
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
