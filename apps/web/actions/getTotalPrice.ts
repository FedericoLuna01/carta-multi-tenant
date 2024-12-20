import { SafeOrderItem } from "@/hooks/use-cart";
import { FullOrder } from "@/types/types"

export const getTotalProductPrice = (item: SafeOrderItem) => {
  const productPrice = item.isPromo ? item.promoPrice : item.price;
  const extrasPrice = item.extras?.reduce((acc, extra) => acc + extra.price, 0) || 0;
  const sizePrice = item.size?.price || 0;
  const quantity = item.quantity || 0;

  if (sizePrice === 0 && item.price) {
    return (extrasPrice + productPrice) * quantity;
  }

  if (sizePrice === 0) {
    // @ts-ignore
    return (extrasPrice + item.product.price) * quantity;
  }

  return (extrasPrice + sizePrice) * quantity;
};

export const getTotalOrderPrice = (order: FullOrder) => {
  return order.products.map((item) => {
    const productPrice = item.product.isPromo ? item.product.promoPrice : item.product.price;
    const extrasPrice = item.extras?.reduce((acc, extra) => acc + extra.price, 0) || 0;
    const sizePrice = item.size?.price || 0;

    const quantity = item.quantity || 0;

    if (sizePrice === 0 && item.product.price) {
      return (extrasPrice + productPrice) * quantity;
    }

    if (sizePrice === 0) {
      return (extrasPrice + item.product.price) * quantity;
    }

    return (extrasPrice + sizePrice) * quantity;
  }).reduce((acc, price) => acc + price, 0);
}