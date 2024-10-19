import Logo from "@/components/logo"
import Link from "./link"
import NavbarMobile from "./navbar-mobile"
import { landingNavbarItems } from "@/data/data"

const Navbar = () => {
  return (
    <header
      className="border-b border-border sticky top-0 bg-white z-50"
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
        <NavbarMobile />
      </div>
    </header>
  )
}

export default Navbar