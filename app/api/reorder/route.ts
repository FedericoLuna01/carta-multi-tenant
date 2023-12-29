import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { CategoryWithSubcategories } from "@/types/types"
import getAuth from "@/actions/getAuth"

export async function PATCH(req: Request) {
  const body: {
    categories: CategoryWithSubcategories[]
  } = await req.json()
  const { categories } = body

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    await Promise.all(categories.map(async(category: CategoryWithSubcategories) => {
      await prismadb.category.update({
        where: {
          id: category.id
        },
        data: {
          sort: category.sort
        },
      })

      await Promise.all(category.subcategories.map(async(subcategory) => {
        await prismadb.subcategory.update({
          where: {
            id: subcategory.id
          },
          data: {
            sort: subcategory.sort
          },
        })

        await Promise.all(subcategory.products.map(async(product) => {
          await prismadb.product.update({
            where: {
              id: product.id
            },
            data: {
              sort: product.sort
            },
          })
        }))

      }))

    }))

    return NextResponse.json('Updated', { status: 200 })

  } catch (error) {
    console.log("[REORDER_PATCH]", error)
    return new NextResponse("Something went wrong", { status: 500 })
  }

}