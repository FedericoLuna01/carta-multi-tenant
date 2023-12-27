import { Category, Extra, OrderType, Product, Size, Subcategory } from "@prisma/client";

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

export type CartProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  options?: string;
  size?: {
    name: string;
    price: number;
  };
  extras?: {
    name: string;
    price: number;
  }[];
}

export type User = {
  name: string;
  phone: string
  comment: string
  type: OrderType
  place: string
}