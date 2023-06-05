import useAppState from "@/app/state/appState";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Check } from "lucide-react";

const ContextItems = () => {
  const { zenMode, setZenMode } = useAppState();

  const handleZenMode = () => {
    console.log("handleZenMode");
    useAppState.setState({ zenMode: true });
  };

  return (
    <ContextMenuContent>
      <ContextMenuItem>Select all </ContextMenuItem>
      <ContextMenuItem>Show grid</ContextMenuItem>
      <ContextMenuItem onClick={handleZenMode}>
        <Check className="mr-2 h-4 w-4" />
        Zen mode
      </ContextMenuItem>
      <ContextMenuItem>View mode</ContextMenuItem>
      <ContextMenuItem>Stats for nerds</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ContextItems;
