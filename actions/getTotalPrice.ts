import { CartProduct } from "@/types/types"

export const getTotalProductPrice = (item: CartProduct) => {
  const extrasPrice = item.extras?.reduce((acc, item) => acc + item.price, 0) || 0
  const sizePrice = item.size?.price || 0
  const quantity = item.quantity || 0

  if(sizePrice === 0) {
    return (extrasPrice + item.price) * quantity
  }

  return (extrasPrice + sizePrice) * quantity
}