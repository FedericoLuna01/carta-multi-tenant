import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { CategoryWithSubcategories } from "@/types/types";
import { checkUserAccess } from "@/utils/user";
import { auth } from "@/auth";

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body: {
    categories: CategoryWithSubcategories[];
  } = await req.json();
  const { categories } = body;

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const updateOperations = categories.flatMap((category) => [
      prismadb.category.update({
        where: { id: category.id, userId: user.user.id },
        data: { sort: category.sort },
      }),
      ...category.subcategories.flatMap((subcategory) => [
        prismadb.subcategory.update({
          where: { id: subcategory.id, userId: user.user.id },
          data: { sort: subcategory.sort },
        }),
        ...subcategory.products.map((product) =>
          prismadb.product.update({
            where: { id: product.id, userId: user.user.id },
            data: { sort: product.sort },
          })
        ),
      ]),
    ]);

    await prismadb.$transaction(updateOperations);

    return NextResponse.json("Updated", { status: 200 });
  } catch (error) {
    console.log("[REORDER_PATCH]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
