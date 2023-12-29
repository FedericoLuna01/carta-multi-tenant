import {
  Category,
  Extra,
  OrderItem,
  OrderItemExtra,
  OrderItemSize,
  OrderType,
  Product,
  Size,
  Subcategory
} from "@prisma/client";

export type FullProduct = Product & {
  sizes: Size[] | null
  extras: Extra[] | null
}

export interface CategoryWithSubcategories extends Category {
  subcategories: SubcategoryWithProducts[]
}

export interface SubcategoryWithProducts extends Subcategory {
  products: Product[]
}

export interface FullOrderItem extends OrderItem {
  size: OrderItemSize | null
  extras: OrderItemExtra[] | null
}

export type User = {
  name: string;
  phone: string
  comment: string
  type: OrderType
  place: string
}