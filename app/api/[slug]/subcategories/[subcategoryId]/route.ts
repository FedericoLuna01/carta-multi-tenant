import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { SubcategorySchema } from "@/schemas";
import { checkUserAccess } from "@/utils/user";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { subcategoryId: string, slug: string } }
) {
  const { subcategoryId, slug } = params;

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!subcategoryId) {
    return new NextResponse("Bad request", { status: 400 });
  }

  try {
    const subcategory = await prismadb.subcategory.delete({
      where: {
        id: subcategoryId,
        userId: user.user.id,
      },
    });
    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { subcategoryId: string, slug: string } }
) {
  const { subcategoryId, slug } = params;
  const body = await req.json();

  const validatedFields = SubcategorySchema.safeParse(body);

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!subcategoryId) {
    return new NextResponse("Missing subcategoryId", { status: 400 });
  }

  if (!validatedFields.success) {
    return new NextResponse("Error in input values", { status: 400 });
  }

  const { name, categoryId } = validatedFields.data;

  try {
    const subcategory = await prismadb.subcategory.update({
      where: {
        id: subcategoryId,
        userId: user.user.id,
      },
      data: {
        name,
        categoryId,
      },
    });
    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
