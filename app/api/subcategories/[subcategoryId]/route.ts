import getAuth from "@/actions/getAuth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { subcategoryId: string } }
) {
  const { subcategoryId } = params;

  const user = await getAuth();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!subcategoryId) {
    return new NextResponse("Bad request", { status: 400 });
  }

  try {
    const subcategory = await prismadb.subcategory.delete({
      where: {
        id: subcategoryId,
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
  { params }: { params: { subcategoryId: string } }
) {
  const { subcategoryId } = params;
  const body = await req.json();
  const { name, categoryId } = body;

  const user = await getAuth();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!subcategoryId) {
    return new NextResponse("Missing subcategoryId", { status: 400 });
  }

  if (!name) {
    return new NextResponse("Missing name", { status: 400 });
  }

  if (!categoryId) {
    return new NextResponse("Missing categoryId", { status: 400 });
  }

  try {
    const subcategory = await prismadb.subcategory.update({
      where: {
        id: subcategoryId,
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
