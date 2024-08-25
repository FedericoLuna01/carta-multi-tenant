import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { type FullOrderItem } from "@/types/types";
import { type OrderItemExtra } from "@prisma/client";
import { getUserBySlug } from "@/utils/user";
import { OrderSchema } from "@/schemas";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body = await req.json();
  // const validatedFields = OrderSchema.safeParse(body);
  const { name, phone, comment, type, place, products } = body;
  // const { name, phone, comment, type, place, products } = validatedFields.;
  const user = await getUserBySlug(slug)

  try {
    const order = await prismadb.order.create({
      data: {
        name,
        phone,
        comment,
        type,
        place,
        userId: user.id,
      },
    });

    products.map(async (product: FullOrderItem) => {
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
      if (!product.extras) return;
      product.extras.map(async (extra: OrderItemExtra) => {
        await prismadb.orderItemExtra.create({
          data: {
            orderItemId: orderItem.id,
            name: extra.name,
            price: extra.price,
          },
        });
      });
    });

    revalidatePath("(admin)/admin/ordenes", "page");

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDERS_POST]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
