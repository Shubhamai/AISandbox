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
} from "lucide-react";
import graphState from "@/app/state/graphState";

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
      className="bg-white flex flax-row items-center justify-between w-screen px-6 py-4"
      style={{ margin: 0 }}
    >
      <div></div>
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
