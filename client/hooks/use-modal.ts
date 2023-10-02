import { create } from "zustand";

export type ModalType = "createServer";

interface IUseModal {
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  type: ModalType | null;
}

export const useModal = create<IUseModal>((set) => ({
  isOpen: false,
  type: null,
  onClose: () => set({ type: null, isOpen: false }),
  onOpen: (type) => set({ isOpen: true, type }),
}))
