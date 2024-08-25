import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { SubcategorySchema } from "@/schemas";
import { checkUserAccess } from "@/utils/user";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body = await req.json();

  const validatedFields = SubcategorySchema.safeParse(body);

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!validatedFields.success) {
    return new NextResponse("Error in input values", { status: 400 });
  }

  const { name, categoryId } = validatedFields.data;

  try {
    const subcategories = await prismadb.subcategory.findMany({
      where: {
        userId: user.user.id,
      }
    });

    if (subcategories.length !== 0) {
      const sort = subcategories.reduce(
        (max, current) => (current.sort > max.sort ? current : max),
        subcategories[0]
      );

      const subcategory = await prismadb.subcategory.create({
        data: {
          name,
          categoryId,
          sort: sort.sort + 1,
          userId: user.user.id,
        },
      });

      return NextResponse.json(subcategory);
    }

    const subcategory = await prismadb.subcategory.create({
      data: {
        name,
        categoryId,
        sort: 1,
        userId: user.user.id,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
