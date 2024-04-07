import getAuth from "@/actions/getAuth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  if (!params.orderId) {
    return new NextResponse("Missing order id", { status: 400 });
  }

  try {
    const order = await prismadb.order.findUnique({
      where: {
        id: Number(params.orderId),
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const body = await req.json();
  const { status } = body;

  if (!status) {
    return new NextResponse("Missing status", { status: 400 });
  }

  if (!params.orderId) {
    return new NextResponse("Missing order id", { status: 400 });
  }

  const user = getAuth();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const order = await prismadb.order.update({
      where: {
        id: Number(params.orderId),
      },
      data: {
        status,
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  if (!params.orderId) {
    return new NextResponse("Missing order id", { status: 400 });
  }

  try {
    const order = await prismadb.order.delete({
      where: {
        id: Number(params.orderId),
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
