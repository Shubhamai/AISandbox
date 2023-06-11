import { BackgroundVariant } from "reactflow";
import { create } from "zustand";

type Background = {
  enable: boolean;
  variant: BackgroundVariant;
  gap: number;
  size: number;
};

type appState = {
  theme: string;
  showSidebar: boolean;
  showMiniMap: boolean;
  zenMode: boolean;
  background: Background;
  setTheme: (value: string) => void;
  setShowSidebar: (value: boolean) => void;
  setShowMiniMap: (value: boolean) => void;
  setZenMode: (value: boolean) => void;
  setBackground: (value: Background) => void;
};

const useAppState = create<appState>()((set) => ({
  theme: "light",
  showSidebar: true,
  showMiniMap: false,
  zenMode: false,
  background: {
    enable: true,
    variant: BackgroundVariant.Dots,
    gap: 12,
    size: 1,
  },
  setTheme: (value: string) => set((state) => ({ theme: value })),
  setShowSidebar: (value: boolean) => set((state) => ({ showSidebar: value })),
  setShowMiniMap: (value: boolean) => set((state) => ({ showMiniMap: value })),
  setZenMode: (value: boolean) => set((state) => ({ zenMode: value })),
  setBackground: (value: Background) => set((state) => ({ background: value })),
}));

export default useAppState;

useAppState.subscribe((state) => {
  document.body.classList.replace(
    state.theme === "light" ? "dark" : "light",
    state.theme
  );
});
