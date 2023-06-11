import { BackgroundVariant } from "reactflow";
import { create } from "zustand";

type Background = {
  enable: boolean;
  variant: BackgroundVariant;
  gap: number;
  size: number;
};

type appState = {
  showSidebar: boolean;
  showMiniMap: boolean;
  zenMode: boolean;
  background: Background;
  setShowSidebar: (value: boolean) => void;
  setShowMiniMap: (value: boolean) => void;
  setZenMode: (value: boolean) => void;
  setBackground: (value: Background) => void;
};

const useAppState = create<appState>()((set) => ({
  showSidebar: true,
  showMiniMap: false,
  zenMode: false,
  background: { enable : true, variant: BackgroundVariant.Dots, gap: 12, size: 1 },
  setShowSidebar: (value: boolean) => set((state) => ({ showSidebar: value })),
  setShowMiniMap: (value: boolean) => set((state) => ({ showMiniMap: value })),
  setZenMode: (value: boolean) => set((state) => ({ zenMode: value })),
  setBackground: (value: Background) => set((state) => ({ background: value })),
}));

export default useAppState;
