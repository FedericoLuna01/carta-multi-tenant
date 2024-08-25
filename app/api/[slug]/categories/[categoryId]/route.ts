import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { CategorySchema } from "@/schemas";
import { checkUserAccess } from "@/utils/user";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, slug: string } }
) {
  const { categoryId, slug } = params;

  if (!categoryId) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const category = await prismadb.category.delete({
      where: {
        id: categoryId,
        userId: user.user.id,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string, slug: string } }
) {
  const { categoryId, slug } = params;
  const body = await req.json();

  const validatedFields = CategorySchema.safeParse(body);

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!categoryId) {
    return new NextResponse("Bad request", { status: 400 });
  }

  if (!validatedFields.success) {
    return new NextResponse("Error in input values", { status: 400 });
  }

  const { name } = validatedFields.data;

  try {
    const category = await prismadb.category.update({
      where: {
        id: categoryId,
        userId: user.user.id,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
