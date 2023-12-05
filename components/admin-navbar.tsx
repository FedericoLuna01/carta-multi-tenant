import Link from "next/link"
import { Button } from "./ui/button"

const NavItems = [
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
    id: 4,
    label: 'Pedidos',
    href: '/admin/pedidos',
  },
  {
    id: 5,
    label: 'Reordenar',
    href: '/reordenar',
  },
]

const AdminNavbar = () => {
  return (
    <header
      className="h-16 z-50 fixed top-0 w-full border-b border-b-black backdrop-blur-sm flex items-center justify-between"
    >
      <div
        className="container flex flex-row items-center justify-between"
      >
        <h1 className="text-2xl font-bold">
          <Link
            href='/'
          >
              Logo
          </Link>
        </h1>
        <nav>
          <ul
            className="flex items-center justify-between flex-row gap-2"
          >
            {
              NavItems.map((item) => (
                <li
                  key={item.id}
                >
                  <Button
                    variant='link'
                    asChild
                  >
                    <Link
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </Button>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default AdminNavbar