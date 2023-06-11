import {
  Panel,
  getRectOfNodes,
  getTransformForBounds,
  useOnSelectionChange,
  useReactFlow,
} from "reactflow";
import { toPng } from "html-to-image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const { showSidebar, setShowSidebar, zenMode } = useAppState();

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

      // Disable animation on all edges
      for (let edgeId in parsedFlow.edges) {
        parsedFlow.edges[edgeId].animated = false;
      }

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
      className={`flex flex-row items-center justify-between w-screen pr-10 pl-4 ${
        zenMode ? "hidden" : ""
      }`}
      style={{ top: 0 }}
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 bg-white pr-4 pl-2 py-2 items-center rounded-full shadow-lg">
          <WorkflowIcon />
          <h1 className="text-md font-bold text-slate-900 italic underline decoration-1 underline-offset-4 decoration-wavy decoration-slate-500">
            AI Sandbox
          </h1>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full shadow-lg bg-white p-3"
          >
            <AlignJustify size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={loadCanvas}>
              <Save className="mr-2 h-4 w-4" /> <span> Open</span>
              {/* <MenubarShortcut>Ctrl+O</MenubarShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={saveCanvas}>
              <Download className="mr-2 h-4 w-4" /> <span> Save</span>
              {/* <MenubarShortcut>Ctrl+S</MenubarShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportImage}>
              <Image className="mr-2 h-4 w-4" /> <span>Export Image</span>
              {/* <MenubarShortcut>Ctrl+E</MenubarShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" /> <span>Help</span>
              {/* <MenubarShortcut>?</MenubarShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={resetCanvas}>
              <Trash2 className="mr-2 h-4 w-4" /> <span>Reset the canvas</span>
            </DropdownMenuItem>
            {/* <MenubarSeparator /> */}
            {/* <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem> */}
            {/* </MenubarContent> */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Panel>
  );
};

export default Header;
