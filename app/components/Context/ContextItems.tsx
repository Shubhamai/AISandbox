import useAppState from "@/app/state/appState";
import {
  ContextMenu,
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
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { BackgroundVariant } from "reactflow";

const ContextItems = () => {
  const {
    theme,
    zenMode,
    background,
    showMiniMap,
    setTheme,
    setZenMode,
    setShowSidebar,
    setShowMiniMap,
    setBackground,
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
    <ContextMenuContent className="shadow-lg">
      <ContextMenuItem
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        {theme[0].toUpperCase() + theme.slice(1)} theme
      </ContextMenuItem>
      <ContextMenuItem onClick={handleShowMiniMap}>
        {showMiniMap ? <Check className="mr-2 h-4 w-4" /> : <></>}
        Show MiniMap
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger
          onClick={() => {
            setBackground({
              ...background,
              enable: !background.enable,
            });
          }}
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
      <ContextMenuItem onClick={handleZenMode}>
        {zenMode ? <Check className="mr-2 h-4 w-4" /> : <></>}
        Zen mode
      </ContextMenuItem>
      <ContextMenuItem>Stats for nerds</ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ContextItems;
