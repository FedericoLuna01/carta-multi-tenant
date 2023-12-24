import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
  const body = await req.json()
  const { categories } = body

  try {
    const updatedCategories = await prismadb.category.update({
      where: { id: categories.id },
      data: {
      }
    })

    return NextResponse.json({ updatedCategories })

  } catch (error) {
    console.log("[REORDER_PATCH]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }

}