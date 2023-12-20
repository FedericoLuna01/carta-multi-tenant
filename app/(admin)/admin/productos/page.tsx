import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { columns } from "./components/columns"
import prismadb from "@/lib/prismadb"

const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      sizes: true,
      extras: true,
      subcategory: true
    }
  })
  return (
    <section>
      <div
        className="flex justify-between items-center"
      >
        <Heading
          title="Productos"
          description="Administra tus productos"
        />
        <Button
          asChild
        >
          <Link
            href='/admin/productos/nuevo'
          >
          Crear producto
          </Link>
        </Button>
      </div>
      <Separator />
      <DataTable
        data={products}
        columns={columns}
        visibility
      />
    </section>
  )
}

export default ProductsPage