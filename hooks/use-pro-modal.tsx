import { create } from "zustand";

interface useProJModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useProModal = create<useProJModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
