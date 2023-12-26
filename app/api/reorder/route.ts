import prismadb from "@/lib/prismadb"
import { Category } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const body = await req.json()
  const { categories } = body

  try {
    if (categories.find((category: Category) => category.sort > 1000)) {
      return new NextResponse("Mayor a mil", { status: 500 })
    }
    categories.map(async(category: Category) => {
      const categoryUpdated = await prismadb.category.update({
        where: {
          id: category.id
        },
        data: {
          sort: category.sort
        },
      })
      console.log(categoryUpdated)
    })
    return NextResponse.json('Updated', { status: 200 })

  } catch (error) {
    console.log("[REORDER_PATCH]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }

}