import { DataTable } from "@/components/ui/data-table"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { columns } from "./components/columns"

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({})
  console.log(orders)
  return (
    <section>
      <div
        className="flex justify-between items-center"
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
      />
    </section>
  )
}

export default OrdersPage