import Logo from "@/components/logo"
import Link from "./link"
import NavbarMobile from "./navbar-mobile"
import { landingNavbarItems } from "@/data/data"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <header
      className="border-b border-border sticky top-0 z-50 bg-white"
    >
      <div
        className="flex justify-between items-center h-full container"
      >
        <Logo />
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-2">
            {
              landingNavbarItems.map((item) => (
                <li
                  key={item.id}
                >
                  <Link item={item.label} />
                </li>
              ))
            }
          </ul>
        </nav>
        <Button
          className="hidden md:flex"
        >
          Cupón de descuento
        </Button>
        <NavbarMobile />
      </div>
    </header>
  )
}

export default Navbar