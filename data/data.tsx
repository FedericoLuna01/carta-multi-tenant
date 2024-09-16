import {
  Home,
  Users,
  User,
  Package,
  List,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";

export const typeOptions = [
  {
    label: "Retiro",
    value: "TAKEAWAY",
  },
  {
    label: "Mesa",
    value: "TABLE",
  },
  {
    label: "Delivery",
    value: "DELIVERY",
  },
];

export const statusOptions = [
  { label: "Pendiente", value: "PENDING" },
  { label: "En progreso", value: "IN_PROGRESS" },
  { label: "En camino", value: "ON_THE_WAY" },
  { label: "Pagado", value: "PAID" },
  { label: "Listo", value: "READY" },
  { label: "Entregado", value: "DONE" },
  { label: "Cancelado", value: "CANCELED" },
];

export const adminNavItems = [
  {
    id: 1,
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    label: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
  },
];

export const userNavItems = [
  {
    id: 1,
    label: "Mi cuenta",
    href: "/dashboard",
    icon: User,
  },
  {
    id: 2,
    label: "Productos",
    href: "/dashboard/productos",
    icon: Package,
  },
  {
    id: 3,
    label: "Categorías",
    href: "/dashboard/categorias",
    icon: List,
  },
  {
    id: 6,
    label: "Subcategorías",
    href: "/dashboard/subcategorias",
    icon: List,
  },
  {
    id: 4,
    label: "Órdenes",
    href: "/dashboard/ordenes",
    icon: ShoppingBasket,
  },
  {
    id: 5,
    label: "Reordenar",
    href: "/dashboard/reordenar",
    icon: ListOrdered,
  },
];
