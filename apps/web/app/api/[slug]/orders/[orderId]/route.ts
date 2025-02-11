import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { checkUserAccess, getUserBySlug } from "@/utils/user";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string, slug: string } }
) {
  const origin = req.headers.get('origin');
  const isAllowedOrigin = origin && (
    origin.endsWith('.platomenu.com') ||
    origin.includes("localhost") ||
    origin === "https://platomenu.com"
  );
  const { slug, orderId } = params;
  if (!slug) {
    return new NextResponse("Missing slug", { status: 400 });
  }
  if (!orderId) {
    return new NextResponse("Missing order id", { status: 400 });
  }

  const user = await getUserBySlug(slug)

  try {
    const order = await prismadb.order.findUnique({
      where: {
        id: Number(orderId),
        userId: user.id,
      },
      include: {
        products: {
          include: {
            extras: true,
            size: true,
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order, {
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (error: any) {
    // console.log("[ORDER_GET]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string, slug: string } }
) {
  const { slug, orderId } = params;
  const body = await req.json();
  const { status, paymentStatus } = body;

  if (!orderId) {
    return new NextResponse("Missing order id", { status: 400 });
  }

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const updatedOrder = await prismadb.order.update({
      where: {
        id: Number(orderId),
        userId: user.user.id,
      },
      data: {
        status,
        paymentStatus
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    // console.log("[ORDER_PATCH]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string, slug: string } }
) {
  const { slug, orderId } = params

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!slug) {
    return new NextResponse("Missing slug", { status: 400 });
  }

  if (!orderId) {
    return new NextResponse("Missing order id", { status: 400 });
  }

  try {
    const order = await prismadb.order.delete({
      where: {
        id: Number(orderId),
        userId: user.user.id
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    // console.log("[ORDER_DELETE]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin');
  // Verifica si el origen termina con tu dominio principal
  const isAllowedOrigin = origin && (
    origin.endsWith('.platomenu.com') ||
    origin === "https://platomenu.com" ||
    origin.includes("localhost")
  );

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}