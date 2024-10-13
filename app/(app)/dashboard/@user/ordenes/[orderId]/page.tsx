import { unstable_noStore as noStore } from "next/cache"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { StatusSelect } from "../components/status-select"
import BadgeOrderType from "../components/badge-order-type"
import { getTotalProductPrice } from "@/actions/getTotalPrice"
import { formatter } from "@/lib/utils"
import Link from "next/link"
import { auth } from "@/auth"

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  noStore()

  const user = await auth()

  const order = await prismadb.order.findUnique({
    where: {
      id: Number(params.orderId),
      userId: user.user.id
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

  if (!order) return <div>No se encontró la orden</div>

  const getFullProductName = (item: any) => {
    const price = getTotalProductPrice(item)
    const extras = item.extras.map((extra: any) => extra.name).join(', ')
    let name: string
    name = `${item.quantity}x ${item.product.name}`
    if (item.size) {
      name += ` (${item.size.name})`
    }
    if (extras) {
      name += ` - ${extras}`
    }
    if (item.options) {
      name += ` - ${item.options}`
    }

    name += ` - $${price}`

    return name

  }

  const total = order.products.reduce((acc, item) => acc + getTotalProductPrice(item as any), 0)

  return (
    <div
      className="mb-4"
    >
      <div>
        <div
          className="flex flex-col items-start gap-2"
        >
          <Link
            href={`/dashboard/ordenes`}
            className="flex flex-row items-center gap-2 font-semibold text-gray-700 hover:underline"
          >
            ← Volver
          </Link>
          <div
            className="flex justify-between items-center w-full"
          >
            <Heading
              title='Orden'
              description={`Orden numero #${order.id}`}
            />
          </div>
        </div>
        <Separator />
      </div>
      <div
        className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent
            className="space-y-4"
          >
            <div>
              <p className="font-semibold">Nombre</p>
              <p>{order.name}</p>
            </div>
            <div>
              <p className="font-semibold">Teléfono</p>
              <p>{order.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Dirección / Mesa</p>
              <p>{order.place}</p>
            </div>
            <div>
              <p className="font-semibold">Tipo</p>
              <BadgeOrderType
                type={order.type}
              />
            </div>
            <div>
              <p className="font-semibold">Estado</p>
              <StatusSelect
                order={order}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent
            className="space-y-4"
          >
            <ul
              className="space-y-2"
            >
              {
                order.products.map((product) => (
                  <li key={product.id}>
                    {`● ${getFullProductName(product)}`}
                  </li>
                ))
              }
            </ul>
            <div>
              <p className="font-semibold">Total</p>
              <p>
                {
                  formatter.format(total)
                }
              </p>
            </div>
            <div>
              <p className="font-semibold">Comentario</p>
              <p>
                {
                  order.comment ? order.comment : 'Sin comentario'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderPage