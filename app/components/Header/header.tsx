import {
  Panel,
  getRectOfNodes,
  getTransformForBounds,
  useReactFlow,
} from "reactflow";
import { toPng } from "html-to-image";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AlignJustify,
  Download,
  Save,
  Image,
  HelpCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  WorkflowIcon,
} from "lucide-react";
import graphState from "@/app/state/graphState";
import useAppState from "@/app/state/appState";
import { Button } from "@/components/ui/button";

// TODO : Move this to a utils file or something...
function downloadImage(dataUrl: any) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const Header = () => {
  const updateGraph = graphState((s) => s.updateGraph);
  const { reactFlowInstance, nodes } = graphState.getState();

  const { showSidebar, setShowSidebar } = useAppState((s) => ({
    showSidebar: s.showSidebar,
    setShowSidebar: s.setShowSidebar,
  }));

  const resetCanvas = () => {
    updateGraph([], []);
  };

  // TODO : Save will be downlading a json file
  // The local storage will be used to save the canvas automatically
  const saveCanvas = () => {
    const flow = reactFlowInstance.toObject();
    localStorage.setItem("canvas", JSON.stringify(flow));
  };

  // TODO : Load will be loading a json file to the canvas
  const loadCanvas = () => {
    const flow = localStorage.getItem("canvas");
    if (flow) {
      console.log("Loading canvas from local storage");
      const parsedFlow = JSON.parse(flow);
      updateGraph(parsedFlow.nodes, parsedFlow.edges);
    } else {
      console.log("No canvas found in local storage");
    }
  };

  const exportImage = () => {
    const imageWidth = 1024;
    const imageHeight = 768;

    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    const viewport: HTMLElement | null = document.querySelector(
      ".react-flow__viewport"
    );
    if (viewport) {
      toPng(viewport, {
        backgroundColor: "#ffffff",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}`,
          height: `${imageHeight}`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then(downloadImage);
    } else {
      console.log("Viewport not found! Unable to Download");
    }
  };

  return (
    <Panel
      position="top-center"
      className="bg-white flex flax-row items-center justify-between w-screen px-6 py-4 shadow-sm"
      style={{ margin: 0 }}
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          <WorkflowIcon />
          <h1 className="text-md font-bold text-slate-900 italic underline decoration-1 underline-offset-4 decoration-wavy decoration-slate-500">
            AI Sandbox
          </h1>
        </div>

        <Button
          className="ml-16"
          variant="outline"
          size="sm"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {/* {showSidebar ? "Hide" : "Show"} Sidebar */}
        </Button>
      </div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="border-transparent w-10">
            <AlignJustify size={17} />
            {/* dadsa */}
          </MenubarTrigger>
          <MenubarContent align="end">
            <MenubarItem onClick={loadCanvas}>
              <Save className="mr-2 h-4 w-4" /> Open
              <MenubarShortcut>Ctrl+O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={saveCanvas}>
              <Download className="mr-2 h-4 w-4" /> Save
              <MenubarShortcut>Ctrl+S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={exportImage}>
              <Image className="mr-2 h-4 w-4" /> Export Image
              <MenubarShortcut>Ctrl+E</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <HelpCircle className="mr-2 h-4 w-4" /> Help
              <MenubarShortcut>?</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={resetCanvas}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset the canvas
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Panel>
  );
};

export default Header;
