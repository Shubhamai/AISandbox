import { create } from "zustand";

type appState = {
  showSidebar: boolean;
  zenMode: boolean;
  setShowSidebar: (value: boolean) => void;
  setZenMode: (value: boolean) => void;
};

const useAppState = create<appState>()((set) => ({
  showSidebar: true,
  zenMode: false,
  setShowSidebar: (value: boolean) => set((state) => ({ showSidebar: value })),
  setZenMode: (value: boolean) => set((state) => ({ zenMode: value })),
}));

export default useAppState;
