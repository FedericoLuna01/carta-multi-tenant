import Link from "next/link"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./components/columns"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import prismadb from "@/lib/prismadb"

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany()
  return (
    <div>
      <div
        className="flex justify-between items-center"
      >
        <Heading
          title='Categorias'
          description="Acá podrás ver todas las categorías que tienes en tu tienda."
        />
        <Button
          asChild
        >
          <Link
            href='/admin/categorias/nuevo'
          >
            Crear categoría
          </Link>
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={categories}
      />
    </div>
  )
}

export default CategoriesPage