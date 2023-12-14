import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toast from 'react-hot-toast'

type SafeOrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  options?: string
  size?: {
    name: string
    price: number
  }
  extras?: {
    name: string
    price: number
  }[]
}

interface CartStore {
  items: SafeOrderItem[]
  addItem: (data: SafeOrderItem) => void
  removeItem: (id: string) => void
  removeAll: () => void
  removeQuantity: (id: string, quantity: number) => void
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: SafeOrderItem) => {
      const currentItems = get().items
      const existingItems = currentItems.find((item) => item.id === data.id)

      if (existingItems) {
        // Creo un nuevo objeto con la cantidad actualizada
        const newData = {
          ...existingItems,
          quantity: data.quantity,
          options: data.options,
          size: data.size,
          extras: data.extras
        }

        // Remuevo el item anterior y agrego el nuevo
        const updatedData = currentItems.filter((item) => item.id !== data.id)
        set({ items: [...updatedData, newData] })
        return toast.success('Producto agregado al carrito')
      }

      set({ items: [...get().items, data] })
      toast.success('Producto agregado al carrito')
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] })
      toast.success('Producto eliminado correctamente')
    },
    removeQuantity: (id: string, quantity: number) => {
      const currentItems = get().items
      const existingItems = currentItems.find((item) => item.id === id)

      if (existingItems) {
        // Creo un nuevo objeto con la cantidad actualizada
        const newData = {
          ...existingItems,
          quantity: existingItems.quantity - quantity
        }

        // Si la cantidad es la justa para eliminar el item, lo elimino
        if (newData.quantity <= 0) {
          set({ items: [...get().items.filter((item) => item.id !== id)] })
          return toast.success('Producto eliminado correctamente')
        }

        // Remuevo el item anterior y agrego el nuevo con la cantidad actualizada
        const updatedData = currentItems.filter((item) => item.id !== id)
        set({ items: [...updatedData, newData] })
        return toast.success('Producto eliminado correctamente')
      }
    },
    removeAll: () => {
      set({ items: [] })
      toast.success('Carrito vaciado correctamente')
    }
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart