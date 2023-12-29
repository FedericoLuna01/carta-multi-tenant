import { unstable_noStore as noStore } from "next/cache"

import prismadb from "@/lib/prismadb"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import SortableGrid from "./components/sortable-grid"

const SortingPage = async () => {
  noStore()
  const data = await prismadb.category.findMany({
    include: {
      subcategories: {
        include: {
          products: {
            include: {
              sizes: true,
              extras: true
            },
            orderBy: {
              sort: 'asc'
            }
          }
        },
        orderBy: {
          sort: 'asc'
        }
      }
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
      <div
        className="flex flex-col gap-4"
      >
        <SortableGrid
          data={data}
        />
      </div>
    </div>
  )
}

export default SortingPage