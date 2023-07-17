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
import { toBlob, toPng, toSvg } from "html-to-image";
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

const DropDown = ({ projectName }: { projectName: string }) => {
  const router = useRouter();

  const updateGraph = graphState((s) => s.updateGraph);
  const { reactFlowInstance, nodes } = graphState.getState();
  const { showSidebar, setShowSidebar, zenMode } = useAppState();

  const resetCanvas = () => {
    updateGraph([], []);
  };

  const saveCanvas = () => {
    const flow = reactFlowInstance.toObject();

    const jsonDataBlob = new Blob([JSON.stringify(flow)], {
      type: "application/json",
    });

    localStorage.setItem("canvas", JSON.stringify(flow));
    let aElement = document.createElement("a");
    aElement.href = window.URL.createObjectURL(jsonDataBlob);
    aElement.download = `${projectName}.json`;
    aElement.style.display = "none";
    document.body.appendChild(aElement);
    aElement.click();
    aElement.remove();
  };

  // TODO : Load will be loading a json file to the canvas
  const loadCanvas = () => {
    // Open the dialog to upload a file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.click();
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (!text) {
          return;
        }

        const parsedFlow = JSON.parse(text.toString());

        // Disable animation on all edges
        for (let edgeId in parsedFlow.edges) {
          parsedFlow.edges[edgeId].animated = false;
        }
        updateGraph(parsedFlow.nodes, parsedFlow.edges);
      };
      reader.readAsText(file);
    };
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
      toBlob(viewport, {
        backgroundColor: "#ffffff",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: `${imageWidth}`,
          height: `${imageHeight}`,
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
      }).then(async (outImage) => {
        if (!outImage) {
          console.log("No outImage");
          return;
        }

        let aElement = document.createElement("a");
        aElement.href = window.URL.createObjectURL(outImage); // xhr.response is a blob
        aElement.download = `${projectName}.png`; // Set the file name.
        aElement.style.display = "none"; // set anchor as hidden
        document.body.appendChild(aElement);
        aElement.click();
        aElement.remove();
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
