export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

export type CartProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  options?: string;
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