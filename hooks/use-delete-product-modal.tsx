import { type CartProduct } from '@/types/types'
import { create } from 'zustand'

interface DeleteProductModalStore {
  isOpen: boolean
  data?: CartProduct
  onOpen: (data: CartProduct) => void
  onClose: () => void
}

const useDeleteProductModal = create<DeleteProductModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: CartProduct) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useDeleteProductModal