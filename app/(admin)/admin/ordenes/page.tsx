import { unstable_noStore as noStore } from "next/cache"

import { DataTable } from "@/components/ui/data-table"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { columns } from "./components/columns"

const OrdersPage = async () => {
  noStore()

  const orders = await prismadb.order.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      products: {
        include: {
          extras: true,
          size: true,
          product: true
        }
      }
    }
  })

  return (
    <section>
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <Heading
          title="Ordenes"
          description="Administra tus ordenes"
        />
      </div>
      <Separator />
      <DataTable
        data={orders}
        columns={columns}
        visibility
        order
      />
    </section>
  )
}

export default OrdersPage