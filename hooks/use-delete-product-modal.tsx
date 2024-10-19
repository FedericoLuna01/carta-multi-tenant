import { create } from "zustand";
import { SafeOrderItem } from "./use-cart";

interface DeleteProductModalStore {
  isOpen: boolean;
  data?: SafeOrderItem;
  // eslint-disable-next-line no-unused-vars
  onOpen: (data: SafeOrderItem) => void;
  onClose: () => void;
}

const useDeleteProductModal = create<DeleteProductModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: SafeOrderItem) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteProductModal;
