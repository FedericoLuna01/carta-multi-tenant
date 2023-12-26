import { Move } from "lucide-react"

import prismadb from "@/lib/prismadb"
import { Card, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import SortableGrid from "./components/sortable-tree"

const SortingPage = async () => {
  const data = await prismadb.category.findMany({
    include: {
      subcategories: {
        include: {
          products: true
        }
      },
    },
    orderBy: {
      sort: 'asc'
    }
  })

  return (
    <div>
      <Heading
        title="Reordenar"
        description="Reordena las categorías y subcategorías a tu gusto."
      />
      <Separator className="my-4" />
      <div>
        <SortableGrid
          data={data}
        />
      </div>
      {/* <div className="flex flex-col gap-y-4">
        {
          data.map((category) => (
            <Card
              key={category.id}
              className="p-4 grid grid-cols-[300px,1fr,100px] items-center"
            >
              <CardTitle>
                {category.name}
              </CardTitle>
              <div
                className="gap-y-4 flex flex-col"
              >
                {
                  category.subcategories.map((subcategory) => (
                    <Card
                      key={subcategory.id}
                      className="p-4 flex justify-between items-center "
                    >
                      <CardTitle>
                        {subcategory.name}
                      </CardTitle>
                      <div
                        className="flex flex-col gap-y-4 p-6"
                      >
                        {
                          subcategory.products.map((product) => (
                            <Card
                              key={product.id}
                              className="p-4 flex justify-between items-center"
                            >
                              <CardTitle>
                                {product.name}
                              </CardTitle>
                              <Move className="w-5 h-5 ml-10" />
                            </Card>
                          ))
                        }
                      </div>
                      <Move className="w-5 h-5" />
                    </Card>
                  ))
                }
              </div>
              <Move className="w-5 h-5 justify-self-center" />
            </Card>
          ))
        }
      </div> */}
    </div>
  )
}

export default SortingPage