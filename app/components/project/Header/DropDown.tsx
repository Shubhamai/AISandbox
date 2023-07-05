"use client";

import useAppState from "@/app/state/appState";
import graphState from "@/app/state/graphState";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { MenubarSeparator } from "@/app/components/ui/menubar";
import { Separator } from "@/app/components/ui/separator";
import { toPng, toSvg } from "html-to-image";
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
  Github,
  Mail,
} from "lucide-react";
import { getRectOfNodes, getTransformForBounds } from "reactflow";
import { useRouter } from "next/navigation";

// TODO : Move this to a utils file or something...
function downloadImage(dataUrl: any) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const DropDown = () => {
  const router = useRouter();

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
    const viewport: HTMLElement | null = document.querySelector(".dndflow");
    if (viewport) {
      toSvg(viewport, {
        backgroundColor: "#ffffff",
        // width: imageWidth,
        // height: imageHeight,
        // style: {
        // width: `${imageWidth}`,
        // height: `${imageHeight}`,
        // transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        // },
      }).then(async (outImage) => {
        if (!outImage) {
          console.log("No outImage");
          return;
        }
        console.log(outImage);
      });
    } else {
      console.log("Viewport not found! Unable to Download");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full shadow-lg bg-background p-3"
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
          <MenubarSeparator />
          <DropdownMenuItem
            onClick={() =>
              router.push("https://github.com/Shubhamai/AISandbox")
            }
          >
            <Github className="mr-2 h-4 w-4" /> <span>GitHub</span>
          </DropdownMenuItem>
          {/* TODO : Add router router.push("mailto:hello@aisandbox.app?subject=Hello%20there!") */}
          <DropdownMenuItem onClick={() => {}}>
            <Mail className="mr-2 h-4 w-4" /> <span>Email</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
