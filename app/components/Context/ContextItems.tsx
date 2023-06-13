import useAppState from "@/app/state/appState";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { BackgroundVariant } from "reactflow";

const ContextItems = ({ children }: { children: React.ReactNode }) => {
  const {
    theme,
    zenMode,
    background,
    showMiniMap,
    showStats,
    setTheme,
    setZenMode,
    setShowSidebar,
    setShowMiniMap,
    setBackground,
    setShowStats,
  } = useAppState();

  const handleZenMode = () => {
    if (zenMode) {
      setZenMode(false);
    } else {
      setZenMode(true);
      setShowSidebar(false);
    }
  };

  const handleShowMiniMap = () => {
    if (showMiniMap) {
      setShowMiniMap(false);
    } else {
      setShowMiniMap(true);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
        <ContextMenuContent className="shadow-lg w-64">
          <ContextMenuCheckboxItem
            checked={theme === "dark"}
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          >
            Dark theme
          </ContextMenuCheckboxItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger
              // checked={background.enable}
              onClick={() => {
                setBackground({
                  ...background,
                  enable: !background.enable,
                });
              }}
              inset={!background.enable}
            >
              {background.enable ? <Check className="mr-2 h-4 w-4" /> : <></>}
              Background
            </ContextMenuSubTrigger>
            {background.enable ? (
              <ContextMenuSubContent className="w-48">
                <ContextMenuRadioGroup
                  value={background.variant}
                  onValueChange={(e) => {
                    switch (e) {
                      case "dots":
                        setBackground({
                          ...background,
                          variant: BackgroundVariant.Dots,
                        });
                        break;
                      case "cross":
                        setBackground({
                          ...background,
                          variant: BackgroundVariant.Cross,
                        });
                        break;
                      case "lines":
                        setBackground({
                          ...background,
                          variant: BackgroundVariant.Lines,
                        });
                        break;
                    }
                  }}
                >
                  <ContextMenuLabel>Variant</ContextMenuLabel>
                  <ContextMenuRadioItem value={BackgroundVariant.Dots}>
                    Dots
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value={BackgroundVariant.Cross}>
                    Cross
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value={BackgroundVariant.Lines}>
                    Lines
                  </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuLabel>Gap</ContextMenuLabel>
                <ContextMenuItem>
                  <Slider
                    onValueChange={(e) => {
                      setBackground({ ...background, gap: e[0] });
                    }}
                    defaultValue={[12]}
                    max={50}
                    step={1}
                  />
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuLabel>Size</ContextMenuLabel>
                <ContextMenuItem>
                  <Slider
                    onValueChange={(e) => {
                      setBackground({ ...background, size: e[0] });
                    }}
                    defaultValue={[1]}
                    max={50}
                    step={1}
                  />
                </ContextMenuItem>
              </ContextMenuSubContent>
            ) : (
              <></>
            )}
          </ContextMenuSub>
          <Separator />
          <ContextMenuCheckboxItem
            onClick={() => {
              if (zenMode) {
                setZenMode(false);
              } else {
                setZenMode(true);
                setShowSidebar(false);
              }
            }}
            checked={zenMode}
          >
            Zen mode
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            onClick={() => {
              setShowMiniMap(!showMiniMap);
            }}
            checked={showMiniMap}
          >
            Show MiniMap
          </ContextMenuCheckboxItem>
          <Separator />
          <ContextMenuCheckboxItem
            onClick={() => {
              setShowStats(!showStats);
            }}
            checked={showStats}
          >
            Stats for nerds
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};

export default ContextItems;
