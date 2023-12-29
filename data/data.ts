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
  }
]

export const statusOptions = [
  { label: 'Pendiente', value: 'PENDING' },
  { label: 'En progreso', value: 'IN_PROGRESS' },
  { label: 'En camino', value: 'ON_THE_WAY' },
  { label: 'Pagado', value: 'PAID' },
  { label: 'Listo', value: 'READY' },
  { label: 'Entregado', value: 'DONE' },
  { label: 'Cancelado', value: 'CANCELED' }
]

export const NavItems = [
  {
    id: 1,
    label: 'Mi cuenta',
    href: '/admin',
  },
  {
    id: 2,
    label: 'Productos',
    href: '/admin/productos',
  },
  {
    id: 3,
    label: 'Categorías',
    href: '/admin/categorias',
  },
  {
    id: 6,
    label: 'Subcategorías',
    href: '/admin/subcategorias'
  },
  {
    id: 4,
    label: 'Ordenes',
    href: '/admin/ordenes',
  },
  {
    id: 5,
    label: 'Reordenar',
    href: '/admin/reordenar',
  },
]