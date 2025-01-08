import { FullProduct, UserNoPass } from "@/types/types";
import { create } from "zustand";

interface ProductModalStore {
  isOpen: boolean;
  data?: FullProduct;
  // eslint-disable-next-line no-unused-vars
  onOpen: (data: FullProduct, user?: UserNoPass) => void;
  onClose: () => void;
  user?: UserNoPass
}

const useProductModal = create<ProductModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: FullProduct, user?: UserNoPass) => set({ data, isOpen: true, user }),
  onClose: () => set({ isOpen: false }),
}));

export default useProductModal;
