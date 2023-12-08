import prismadb from "@/lib/prismadb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import ProductCard from "./ui/product-card"
import { Button } from "./ui/button"
import Link from "next/link"

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
                uppercase
                font-bold
                '
              >
                <div
                  className="grid grid-cols-[600px,1fr,1fr] gap-4 text-left"
                >
                  {category.name}
                  <div>
                    <Button
                      asChild
                      className="col-start-3"
                    >
                      <Link
                        href={`/admin/categorias/${category.id}`}
                      >
                        Editar
                      </Link>
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              {
                category.subcategories.map((subcategory) => (
                  <AccordionContent
                    key={subcategory.id}
                  >
                    <div
                      className="flex items-center justify-center mt-8"
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
                          Editar
                        </Link>
                      </Button>
                    </div>
                    <div>
                      {
                        subcategory.products.map((product) => (
                          <ProductCard
                            key={product.name}
                            product={product}
                          />
                        ))
                      }
                    </div>
                  </AccordionContent>
                ))
              }
            </AccordionItem>
          ))
        }
      </Accordion>
      <Button>
        <Link
          href="/admin/categorias/nueva"
        >
          Nueva Categoría
        </Link>
      </Button>
    </div>
  )
}

export default AdminAccordion