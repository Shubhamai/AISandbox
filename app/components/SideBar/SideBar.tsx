import { Panel } from "reactflow";
import nodeTypes, {
  inputNodes,
  outputNodes,
  modelNodes,
} from "@/app/types/nodeTypes";
import { DragEvent } from "react";
import useAppState from "@/app/state/appState";
import { Separator } from "@/components/ui/separator";

const SideBar = () => {
  const { showSidebar } = useAppState((s) => ({
    showSidebar: s.showSidebar,
  }));

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel
      position="top-left"
      className={`flex flex-col items-center gap-2 w-[250px] px-4 py-4 bg-white shadow-lg transition overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ margin: 0, top: 72, height: "calc(100vh - 72px)" }}
    >
      {Object.keys(inputNodes).map((key) => (
        <div
          className={`dndnode input ${key} h-fit w-full rounded-md flex gap-2 p-3 border-[1px] border-solid border-slate-50 transition hover:border-slate-100 hover:cursor-pointer hover:shadow-md hover:-translate-y-1 focus:border-slate-700 active:shadow-sm active:translate-y-1`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          <div className="w-12 min-w-[3rem] h-12 rounded-md bg-emerald-600" />

          <div>
            <h6 className="text-sm font-semibold text-slate-800">{key}</h6>
            <p className="text-xs text-slate-500 leading-4 overflow-hidden line-clamp-2">
              SQL database, which can help make your node system wider and a
              variety.
            </p>
          </div>
        </div>
      ))}
      <Separator />
      {Object.keys(modelNodes).map((key) => (
        <div
          className={`dndnode input ${key} h-fit w-full rounded-md flex gap-2 p-3 border-[1px] border-solid border-slate-50 transition hover:border-slate-100 hover:cursor-pointer hover:shadow-md hover:-translate-y-1 focus:border-slate-700 active:shadow-sm active:translate-y-1`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          <div className="w-12 min-w-[3rem] h-12 rounded-md bg-emerald-600" />

          <div>
            <h6 className="text-sm font-semibold text-slate-800">{key}</h6>
            <p className="text-xs text-slate-500 leading-4 overflow-hidden line-clamp-2">
              SQL database, which can help make your node system wider and a
              variety.
            </p>
          </div>
        </div>
      ))}
      <Separator />
      {Object.keys(outputNodes).map((key) => (
        <div
          className={`dndnode input ${key} h-fit w-full rounded-md flex gap-2 p-3 border-[1px] border-solid border-slate-50 transition hover:border-slate-100 hover:cursor-pointer hover:shadow-md hover:-translate-y-1 focus:border-slate-700 active:shadow-sm active:translate-y-1`}
          key={key}
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          <div className="w-12 min-w-[3rem] h-12 rounded-md bg-emerald-600" />

          <div>
            <h6 className="text-sm font-semibold text-slate-800">{key}</h6>
            <p className="text-xs text-slate-500 leading-4 overflow-hidden line-clamp-2">
              SQL database, which can help make your node system wider and a
              variety.
            </p>
          </div>
        </div>
      ))}
    </Panel>
  );
};

export default SideBar;
