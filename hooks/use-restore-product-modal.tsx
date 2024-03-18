import { FullProduct } from "@/types/types";
import { Subcategory } from "@prisma/client";
import { create } from "zustand";

interface RestoreProductModalStore {
  isRestoreModalOpen: boolean;
  data?: FullProduct & {
    subcategory: Subcategory;
  };
  onOpen: (
    data: FullProduct & {
      subcategory: Subcategory;
    }
  ) => void;
  onClose: () => void;
}

const useRestoreProductModal = create<RestoreProductModalStore>((set) => ({
  isRestoreModalOpen: false,
  data: undefined,
  onOpen: (
    data: FullProduct & {
      subcategory: Subcategory;
    }
  ) => set({ data, isRestoreModalOpen: true }),
  onClose: () => set({ isRestoreModalOpen: false }),
}));

export default useRestoreProductModal;
