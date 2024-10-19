import { OrderUser } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: OrderUser;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: OrderUser) => void;
}

const useOrderUser = create(
  persist<UserStore>(
    (set) => ({
      user: {
        name: "",
        phone: "",
        comment: "",
        type: "DELIVERY",
        place: "",
      },
      setUser: (user: OrderUser) => set({ user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderUser;
