import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST (req: Request) {
  const body = await req.json()
  const { name, phone, comment, type, place, products } = body

  try {
    const order = await prismadb.order.create({
      data: {
        name,
        phone,
        comment,
        type,
        place,
      }
    })

    // TODO: Refactor esto y arreglar tipado (puedo borrar todos schemas de orderitemsize y orderitemextra y usar el mismo schema que en product)

    products.map(async (product: any) => {
      const orderItem = await prismadb.orderItem.create({
        data: {
          productId: product.productId,
          quantity: product.quantity,
          options: product.options,
          orderId: order.id,
        }
      })
      if(product.size) {
        await prismadb.orderItemSize.create({
          data: {
            orderItemId: orderItem.id,
            name: product.size.name,
            price: product.size.price,
          }
        })
      }
      if(!product.extras) return
      product.extras.map(async (extra: any) => {
        await prismadb.orderItemExtra.create({
          data: {
            orderItemId: orderItem.id,
            name: extra.name,
            price: extra.price,
          }
        })
      })
    })

    revalidatePath("(admin)/admin/ordenes", 'page')

    return NextResponse.json({ message: "Order created" })
  } catch (error) {
    console.log("[ORDERS_POST]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function DELETE() {
  try {
    const orders = await prismadb.order.deleteMany({})
    return NextResponse.json(orders)
  } catch (error) {
    console.log("[ORDERS_DELETE]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}