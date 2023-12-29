import CartModal from "./modals/cart-modal"
import { UserSettings } from "@prisma/client"
import CommandSearch from "./command-search"
import prismadb from "@/lib/prismadb"

const Navbar = async ({ userSettings }: { userSettings: UserSettings | null}) => {
  const products = await prismadb.product.findMany({
    include: {
      extras: true,
      sizes: true
    }
  })

  return (
    <header
      className="fixed top-0 left-0 w-full h-20 border-b backdrop-blur-md border-slate-300 z-50"
    >
      <nav
        className="max-w-5xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        <h1
          className="text-3xl md:text-5xl font-bold text-slate-900"
        >
          Carta
        </h1>
        <div
          className="flex items-center space-x-4"
        >
          <CommandSearch
            products={products}
          />
          <CartModal
            userSettings={userSettings}
          />
        </div>
      </nav>
    </header>
  )
}

export default Navbar