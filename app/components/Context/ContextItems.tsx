import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const ContextItems = () => {
  return (
    <ContextMenuContent>
      <ContextMenuItem>Select all</ContextMenuItem>
      <ContextMenuItem>Show grid</ContextMenuItem>
      <ContextMenuItem>Zen mode</ContextMenuItem>
      <ContextMenuItem>View mode</ContextMenuItem>
      <ContextMenuItem>Stats for nerds</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ContextItems;
