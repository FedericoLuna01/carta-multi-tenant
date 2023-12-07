export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  sizes?: {
    name: string;
    price: number;
  }[];
  extras?: {
    name: string;
    price: number;
  }[];
}

export type CartProduct = {
  id: number;
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

export type Category = {
  name: string;
  id: number
}

export type User = {
  name: string;
  phone: string
  options: string
  address: string
}