import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./components/columns"
import prismadb from "@/lib/prismadb"

const SubcategoriesPage = async () => {
  const subcategories = await prismadb.subcategory.findMany({
    include: {
      category: true
    }
  })

  return (
    <div>
      <div
        className="flex justify-between items-center"
      >
        <Heading
          title='Subcategorias'
          description="Acá podrás ver todas las subcategorías que tienes en tu tienda."
        />
        <Button
          asChild
        >
          <Link
            href='/admin/subcategorias/nuevo'
          >
            Crear subcategoría
          </Link>
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={subcategories}
      />
    </div>
  )
}

export default SubcategoriesPage