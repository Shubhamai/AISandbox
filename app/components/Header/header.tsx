import { Panel } from "reactflow";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { AlignJustify } from "lucide-react";
const Header = () => {
  return (
    <Panel
      position="top-center"
      className="bg-white flex flax-row items-center justify-between w-screen px-6 py-4"
      style={{ margin: 0 }}
    >
      <div></div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="border-transparent">
            <AlignJustify size={16} />
            {/* dadsa */}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
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
