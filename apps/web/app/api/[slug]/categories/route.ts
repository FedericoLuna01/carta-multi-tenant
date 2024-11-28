import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { CategorySchema } from "@/schemas";
import { checkUserAccess } from "@/utils/user";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const body = await req.json();
  const validatedFields = CategorySchema.safeParse(body);

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!validatedFields.success) {
    return new NextResponse("Error in input values", { status: 400 });
  }

  const { name } = validatedFields.data

  try {
    const categories = await prismadb.category.findMany({
      where: {
        userId: user.user.id,
      }
    });

    if (categories.length > 0) {
      const sort = categories.reduce(
        (max, current) => (current.sort > max.sort ? current : max),
        categories[0]
      );

      const category = await prismadb.category.create({
        data: {
          name,
          sort: sort.sort + 1,
          userId: user.user.id,
        },
      });

      return NextResponse.json(category);
    }

    const category = await prismadb.category.create({
      data: {
        name,
        sort: 1,
        userId: user.user.id,
      },
    });

    revalidatePath("/admin", "layout");

    return NextResponse.json(category);
  } catch (error: any) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
