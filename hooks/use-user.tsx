import { User } from '@/types/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserStore {
  user: User
  setUser: (user: User) => void
}

const useUser = create(
  persist<UserStore>((set) => ({
    user: {
      name: "",
      phone: "",
      comment: "",
      delivery: false,
      table: false,
      place: "",
    },
    setUser: (user: User) => set({ user }),
  }),
  {
    name: 'user-storage',
    storage: createJSONStorage(() => localStorage),
  }
  )
)

export default useUser