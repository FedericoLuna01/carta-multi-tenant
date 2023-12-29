import getAuth from "@/actions/getAuth"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { name } = body

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  if(!name) {
    return new NextResponse('Missing name', { status: 400 })
  }

  try {
    const categories = await prismadb.category.findMany({})

    if (categories.length !== 0) {
      const sort = categories.reduce((max, current) => (current.sort > max.sort ? current : max), categories[0])

      const category = await prismadb.category.create({
        data: {
          name,
          sort: sort.sort + 1,
        }
      })

      return NextResponse.json(category)
    }

    const category = await prismadb.category.create({
      data: {
        name,
        sort: 1,
      }
    })

    return NextResponse.json(category)

  } catch (error: any) {
    console.log('[CATEGORY_POST]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }

}