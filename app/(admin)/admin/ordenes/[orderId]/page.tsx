import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
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
    const extras = item.extras.map((extra: any) => extra.name).join(', ')
    const quantity = item.quantity
    const size = item.size ? item.size.name : ''
    if (!size) return `${quantity}x ${item.product.name} - ${extras}`
    return `${quantity}x ${item.product.name} (${size}) - ${extras}`
  }

  return (
    <div>
      <div>
        <Heading
          title='Orden'
          description={`Orden numero #${order.id}`}
        />
        <Separator />
      </div>
      <div
        className="mt-4 grid grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {
                order.products.map((product) => (
                  <li key={product.id}>
                    {`● ${getFullProductName(product)}`}
                  </li>
                ))
              }
            </ul>
          </CardContent>
        </Card>
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
              <p className="font-semibold">Direción / Mesa</p>
              <p>{order.place}</p>
            </div>
            <div>
              <p className="font-semibold">Tipo</p>
              <p>{order.type}</p>
            </div>
            <div>
              <p className="font-semibold">Estado</p>
              <p>{order.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderPage