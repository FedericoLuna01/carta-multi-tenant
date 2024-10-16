import Logo from "@/components/logo"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="container py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo size='sm' />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Seguinos</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
                </li>
                <li>
                  <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} {" "}
            {/* TODO: Poner dominio de carta */}
            <a href="https://flowbite.com/" className="hover:underline">Carta</a>. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer