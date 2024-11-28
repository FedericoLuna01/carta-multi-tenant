import { SafeOrderItem } from "@/hooks/use-cart";

export const getTotalProductPrice = (item: SafeOrderItem) => {
  const productPrice = item.isPromo ? item.promoPrice : item.price;
  const extrasPrice =
    item.extras?.reduce((acc, extra) => acc + extra.price, 0) || 0;
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
