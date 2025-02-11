import Logo from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { socialsItems } from "@/data/data"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Logo size='sm' />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Redes</h2>
              <ul className="text-gray-500 font-medium">
                {
                  socialsItems.map((item, index) => (
                    <li key={index} className="mb-4">
                      <a href={item.href} target="_blank" className="hover:underline ">
                        {item.title}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} {" "}
            <a href="https://platomenu.com/" className="hover:underline">Plato</a>. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer