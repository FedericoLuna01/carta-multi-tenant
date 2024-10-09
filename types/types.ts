import {
  Category,
  Extra,
  OrderItem,
  OrderItemExtra,
  OrderItemSize,
  OrderType,
  Product,
  Size,
  Subcategory,
  User,
} from "@prisma/client";

export type FullProduct = Product & {
  sizes: Size[] | null;
  extras: Extra[] | null;
};

export interface CategoryWithSubcategories extends Category {
  subcategories: SubcategoryWithProducts[];
}

export interface SubcategoryWithProducts extends Subcategory {
  products: Product[];
}

export interface SubcategoryWithFullProducts extends Subcategory {
  products: FullProduct[];
}

export interface FullData extends Category {
  subcategories: SubcategoryWithFullProducts[];
}

export interface FullOrderItem extends OrderItem {
  size: OrderItemSize | null;
  extras: OrderItemExtra[] | null;
}

export type OrderUser = {
  name: string;
  phone: string;
  comment: string;
  type: OrderType;
  place: string;
};

export type UserNoPass = Omit<User, 'password' | 'emailVerified'>