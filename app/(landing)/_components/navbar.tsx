import Logo from "@/components/logo"
import Link from "./link"

const Navbar = () => {
  return (
    <header
      className="border-b border-border sticky top-0 bg-white z-50"
    >
      <div
        className="flex justify-between items-center h-full container"
      >
        <Logo />
        <nav>
          <ul className="flex items-center gap-2">
            <li>
              <Link item="Inicio" />
            </li>
            <li>
              <Link item="Caracteristicas" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar