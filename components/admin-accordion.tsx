import prismadb from "@/lib/prismadb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import ProductCard from "./ui/product-card"
import { Button } from "./ui/button"
import Link from "next/link"
import { Pencil, Plus, Trash } from "lucide-react"

const AdminAccordion = async () => {
  const data = await prismadb.category.findMany({
    include: {
      subcategories: {
        include: {
          products: {
            include: {
              sizes: true,
              extras: true
            }
          }
        }
      }
    }
  })

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28"
    >
      <Accordion type="single" collapsible >
        {
          data.map((category) => (
            <AccordionItem
              value={`item-${category.id}`}
              key={category.id}
              className='border-b-0 my-[2px]'
            >
              <AccordionTrigger
                className='bg-slate-100
                px-4
                rounded-md
                text-3xl
                font-bold
                '
              >
                <div
                  className="text-left flex items-center gap-4"
                >
                  <p
                    className="uppercase"
                  >
                    {category.name}
                  </p>
                  <Button
                    asChild
                  >
                    <Link
                      href={`/admin/categorias/${category.id}`}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                        Editar
                    </Link>
                  </Button>
                  <Button
                    variant='destructive'
                    className="hover:no-underline"
                    asChild
                  >
                    <span>
                      <Trash className="w-4 h-4 mr-2" />
                    Eliminar
                    </span>
                  </Button>
                </div>
              </AccordionTrigger>
              {
                category.subcategories.map((subcategory) => (
                  <AccordionContent
                    key={subcategory.id}
                  >
                    <div
                      className="flex items-center justify-center mt-8 gap-4"
                    >
                      <h3
                        className='text-2xl text-center font-bold uppercase'
                      >
                        {subcategory.name}
                      </h3>
                      <Button
                        asChild
                        className=""
                      >
                        <Link
                          href={`/admin/subcategorias/${subcategory.id}`}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant='destructive'
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                    <div>
                      {
                        subcategory.products.map((product) => (
                          <ProductCard
                            key={product.name}
                            product={product}
                            isAdmin
                          />
                        ))
                      }
                      <div
                        className="flex justify-center mt-8"
                      >
                        <Button
                          asChild
                        >
                          <Link
                            href="/admin/subcategorias/nueva"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Nueva Subcategoría
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                ))
              }
            </AccordionItem>
          ))
        }
      </Accordion>
      <div
        className="flex justify-center mt-8"
      >
        <Button
          asChild
        >
          <Link
            href="/admin/categorias/nueva"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Categoría
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default AdminAccordion