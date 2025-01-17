import { create } from 'zustand'
import { FullOrder } from '@/types/types'
import socket, { joinUserRoom } from '@/lib/socketio'
import { toast } from 'react-hot-toast'

interface OrdersStore {
  orders: FullOrder[]
  isLoading: boolean
  totalItems: number
  currentPage: number
  pageSize: number
  isSocketInitialized: boolean
  setOrders: (orders: FullOrder[]) => void
  setPagination: (page: number, size: number) => void
  fetchOrders: (slug: string, page?: number, pageSize?: number) => Promise<void>
  initialize: (userId: string) => void
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  isLoading: true,
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  isSocketInitialized: false,
  
  setOrders: (orders) => set({ orders }),
  
  setPagination: (page, size) => set({ currentPage: page, pageSize: size }),
  
  fetchOrders: async (slug, page = get().currentPage, pageSize = get().pageSize) => {
    if (!slug) {
      set({ isLoading: false })
      return
    }

    try {
      set({ isLoading: true })
      
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('pageSize', pageSize.toString())

      const response = await fetch(`/api/${slug}/orders?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        set({ 
          orders: data.items,
          totalItems: data.total,
          currentPage: page,
          pageSize: pageSize
        })
      }
    } catch (error) {
      console.error('Error al cargar órdenes:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  initialize: (userId) => {
    if (!userId || get().isSocketInitialized) return

    joinUserRoom(userId)

    const handleNewOrder = (newOrder: FullOrder) => {
      const { currentPage } = get()
      // Solo actualizar la lista si estamos en la primera página
      if (currentPage === 1) {
        set((state) => ({
          totalItems: state.totalItems + 1,
          orders: [{ ...newOrder, key: newOrder.id }, ...state.orders]
        }))

        toast.success('¡Nueva orden recibida!', {
          duration: 5000,
          position: 'top-right',
        })
      } else {
        // Si no estamos en la primera página, solo actualizamos el contador
        set((state) => ({
          totalItems: state.totalItems + 1
        }))
        
        toast.success('¡Nueva orden recibida!', {
          duration: 5000,
          position: 'top-right',
        })
      }
    }

    socket.on('receiveOrder', handleNewOrder)
    set({ isSocketInitialized: true })

    return () => {
      socket.off('receiveOrder', handleNewOrder)
      set({ isSocketInitialized: false })
    }
  }
})) 