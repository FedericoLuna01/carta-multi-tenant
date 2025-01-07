import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { type FullOrderItem } from "@/types/types";
import { type OrderItemExtra } from "@prisma/client";
import { checkUserAccess, getUserBySlug } from "@/utils/user";
import { auth } from "@/auth";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const origin = req.headers.get('origin');
  const isAllowedOrigin = origin && (
    // TODO: Cambiar por el dominio original
    origin.includes("localhost") ||
    origin.endsWith('.platomenu.com') ||
    origin === "https://platomenu.com"

  );

  const { slug } = params;
  const body = await req.json();
  const { name, phone, comment, type, place, products, payment } = body;

  const user = await getUserBySlug(slug)

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  try {
    const order = await prismadb.order.create({
      data: {
        name,
        phone,
        comment,
        type,
        place,
        payment,
        userId: user.id,
      },
    });

    await Promise.all(products.map(async (product: FullOrderItem) => {
      const orderItem = await prismadb.orderItem.create({
        data: {
          productId: product.productId,
          quantity: product.quantity,
          options: product.options,
          orderId: order.id,
        },
      });
      if (product.size) {
        await prismadb.orderItemSize.create({
          data: {
            orderItemId: orderItem.id,
            name: product.size.name,
            price: product.size.price,
          },
        });
      }
      if (product.extras) {
        await Promise.all(product.extras.map(async (extra: OrderItemExtra) => {
          await prismadb.orderItemExtra.create({
            data: {
              orderItemId: orderItem.id,
              name: extra.name,
              price: extra.price,
            },
          });
        }));
      }
    }));

    const newOrderWithProducts = await prismadb.order.findUnique({
      where: { id: order.id },
      include: {
        products: {
          include: {
            product: true,
            size: true,
            extras: true
          }
        }
      }
    });

    return NextResponse.json({ order, newOrderWithProducts }, {
      headers: {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (error) {
    // console.log("[ORDERS_POST]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const user = await auth();

  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const orders = await prismadb.order.findMany({
    where: {
      user: {
        slug: user.user.slug,
      },
    },
    orderBy: {
      createdAt: "desc",
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

  return NextResponse.json(orders);
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin');
  // Verifica si el origen termina con tu dominio principal
  const isAllowedOrigin = origin && (
    // TODO: Cambiar por el dominio original
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
