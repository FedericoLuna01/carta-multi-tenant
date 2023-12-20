import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId
      },
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.log("[ORDER_GET]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
  const body = await req.json();
  const { status } = body

  try {
    const order = await prismadb.order.update({
      where: {
        id: params.orderId
      },
      data: {
        status
      }
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.log("[ORDER_PATCH]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const order = await prismadb.order.delete({
      where: {
        id: params.orderId
      },
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.log("[ORDER_DELETE]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}