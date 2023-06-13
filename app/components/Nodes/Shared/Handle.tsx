import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Handle, HandleType, Position } from "reactflow";
import { Badge } from "@/components/ui/badge";

type NodeHandleProps = {
  type: HandleType;
  position: Position;
  id: string;
  isConnectable: boolean;
  nodeId: string;
  style?: React.CSSProperties;
};

const NodeHandle = (props: NodeHandleProps) => {
  return (
    <div className="flex justify-between items-center gap-2 h-full">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Handle
              className="!bg-foreground/50 !border-none"
              type={props.type}
              position={props.position}
              id={props.id}
              isConnectable={props.isConnectable}
              style={props.style}
            />
          </TooltipTrigger>
          {props.type === "source" ? (
            <TooltipContent>
              <Badge variant="outline">Output : {props.id}</Badge>{" "}
              <Badge variant="outline">ID : {props.nodeId}</Badge>
            </TooltipContent>
          ) : (
            <></>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NodeHandle;
