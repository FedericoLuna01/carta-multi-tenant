import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { products } from "@/data/data"
import Link from "next/link"
import { columns } from "./components/columns"

const ProductsPage = () => {
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
      />
    </section>
  )
}

export default ProductsPage