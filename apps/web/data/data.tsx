import { Instagram, WhatsApp } from "@/components/ui/icons";
import {
  Users,
  User,
  Package,
  List,
  ListOrdered,
  ShoppingBasket,
  MailIcon,
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
    label: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
  },
];

export const userNavItems = [
  {
    id: 1,
    label: "Mi cuenta",
    href: "/dashboard/cuenta",
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
    id: 4,
    label: "Subcategorías",
    href: "/dashboard/subcategorias",
    icon: List,
  },
  {
    id: 5,
    label: "Órdenes",
    href: "/dashboard/ordenes?page=1&pageSize=10",
    icon: ShoppingBasket,
  },
  {
    id: 6,
    label: "Reordenar",
    href: "/dashboard/reordenar",
    icon: ListOrdered,
  },
];

export const landingNavbarItems = [
  {
    label: "Inicio",
    id: "Inicio"
  },
  {
    label: "Caracteristicas",
    id: "Caracteristicas"
  },
  {
    label: "Precios",
    id: "Precios"
  },
  {
    label: "Preguntas",
    id: "Preguntas"
  },
  {
    label: "Contacto",
    id: "Contacto"
  }
]

export const socialsItems = [
  {
    title: "WhatsApp",
    label: "+54 341 312 5385",
    icon: WhatsApp,
    href: "https://wa.me/543413125385?text=Hola, quiero obtener el menú!",
    description: "Envianos un mensaje",
  },
  {
    title: "Instagram",
    label: "@cartadigital.arg",
    icon: Instagram,
    href: "https://www.instagram.com/cartadigital.arg/",
    description: "Mantenete al tanto de todas las actualizaciones"
  },
  {
    title: "Email",
    label: "carta@carta.com",
    icon: MailIcon,
    href: "mailto:carta",
    description: "Nuestro equipo está para ayudarte"
  }
]

export const accordionItems = [
  {
    question: "¿En cuanto tiempo estarán lista mi menú?",
    answer: "El tiempo de entrega de tu menú estará lista en una semana",
  },
  {
    question: "¿Cómo puedo pagar mi menú?",
    answer: "Puedes pagar tu menú con tarjeta de crédito o débito",
  },
  {
    question: "¿Puedo cancelar mi menú?",
    answer: "Sí, puedes cancelar tu menú en cualquier momento",
  },
  {
    question: "¿Cómo puedo contactarlos?",
    answer: "Puedes contactarnos a través de WhatsApp, Instagram o Email",
  }
]