import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST (req: Request) {
  const body = await req.json()
  const { name, phone, comment, delivery, table, place, products } = body

  try {
    const order = await prismadb.order.create({
      data: {
        name,
        phone,
        comment,
        delivery,
        table,
        place,
      }
    })

    const orderItems = await prismadb.orderItem.createMany({
      data: products.map((product: any) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
          options: product.options,
          orderId: order.id,
        }
      })
    })

    //TODO: crear extras y sizes

    // const assingExtras = await prismadb.orderItemExtra.createMany({
    //   data: products.map((product: any) => {
    //     return product.extras.map((extra: any) => {
    //       return {
    //         orderItemId: "a0b92603-aeda-4523-9ea1-2c196cc31835",
    //         name: extra.name,
    //         price: extra.price,
    //       }
    //     })
    //   }).flat()
    // })

    return NextResponse.json({ order, orderItems })

  } catch (error) {
    console.log("[ORDERS_POST]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}