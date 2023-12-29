import getAuth from "@/actions/getAuth"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, categoryId } = body

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  if (!name) {
    return new NextResponse('Missing name', { status: 400 })
  }

  if(!categoryId) {
    return new NextResponse('Missing categoryId', { status: 400 })
  }

  try {
    const subcategories = await prismadb.subcategory.findMany({})

    if (subcategories.length !== 0) {
      const sort = subcategories.reduce((max, current) => (current.sort > max.sort ? current : max), subcategories[0])

      const subcategory = await prismadb.subcategory.create({
        data: {
          name,
          categoryId,
          sort: sort.sort + 1,
        }
      })

      return NextResponse.json(subcategory)
    }

    const subcategory = await prismadb.subcategory.create({
      data: {
        name,
        categoryId,
        sort: 1
      }
    })

    return NextResponse.json(subcategory)

  } catch (error) {
    console.log('[SUBCATEGORY_POST]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }

}