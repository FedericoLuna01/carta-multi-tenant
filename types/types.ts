import { Extra, OrderType, Product, Size } from "@prisma/client";

export type FullProduct = Product & {
  sizes: Size[] | null
  extras: Extra[] | null
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