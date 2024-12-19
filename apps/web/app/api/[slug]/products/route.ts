import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { checkUserAccess } from "@/utils/user";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body = await req.json();
  // TODO: Agregar zod para validar los campos
  // const validatedFields = ProductSchema.safeParse(body);
  // const { name, description } = validatedFields.data
  const {
    name,
    description,
    price,
    image,
    isArchived,
    isPromo,
    promoPrice,
    subcategoryId,
    sizes,
    extras,
  } = body;

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!name) {
    return new NextResponse("Missing product name", { status: 400 });
  }

  if (!price) {
    return new NextResponse("Missing product price", { status: 400 });
  }

  if (!subcategoryId) {
    return new NextResponse("Missing product subcategory", { status: 400 });
  }

  if (!image) {
    return new NextResponse("Missing product image", { status: 400 });
  }

  try {
    const products = await prismadb.product.findMany({
      where: {
        userId: user.user.id,
      }
    });

    if (products.length !== 0) {
      const sort = products.reduce(
        (max, current) => (current.sort > max.sort ? current : max),
        products[0]
      );

      const product = await prismadb.product.create({
        data: {
          name,
          description,
          price,
          image,
          isArchived,
          isPromo,
          promoPrice,
          subcategoryId,
          sort: sort.sort + 1,
          userId: user.user.id,
          sizes: {
            createMany: {
              data: sizes,
            },
          },
          extras: {
            createMany: {
              data: extras,
            },
          },
        },
      });

      return NextResponse.json(product);
    }

    const product = await prismadb.product.create({
      data: {
        name,
        description,
        price,
        image,
        isArchived,
        isPromo,
        promoPrice,
        subcategoryId,
        sort: 1,
        userId: user.user.id,
        sizes: {
          createMany: {
            data: sizes,
          },
        },
        extras: {
          createMany: {
            data: extras,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    // console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
